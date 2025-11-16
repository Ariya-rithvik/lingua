// ---------------- BASIC SETUP ----------------
const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
const canvasCtx = canvasElement.getContext('2d');
const statusDiv = document.getElementById('status');
const gestureDiv = document.getElementById("output");

let sentence = "";
let lastGesture = "—";
let lastTime = 0;
const COOLDOWN = 900;

const templates = [
  { pattern: ["Hello", "You"], sentence: "Hello, how are you?" },
  { pattern: ["You", "Help"], sentence: "Do you need help?" },
  { pattern: ["Help", "You"], sentence: "Can I help you?" },
  { pattern: ["Good", "OK"], sentence: "Everything is good." },
  { pattern: ["No", "Help"], sentence: "I don't need help." },
  { pattern: ["Yes", "Help"], sentence: "Yes, I need help." },
  { pattern: ["You", "Good"], sentence: "You are good." }
];

let gestureHistory = [];


// ---------------- UTILS ----------------
function distance(a, b) {
  return Math.sqrt(
    (a.x - b.x)**2 +
    (a.y - b.y)**2 +
    (a.z - b.z)**2
  );
}

function classifyGesture(landmarks) {
  function fingerOpen(tip, base) {
    return landmarks[tip].y < landmarks[base].y;
  }

  const indexOpen = fingerOpen(8, 5);
  const middleOpen = fingerOpen(12, 9);
  const ringOpen = fingerOpen(16, 13);
  const pinkyOpen = fingerOpen(20, 17);
  const thumbOpen = Math.abs(landmarks[4].x - landmarks[3].x) > 0.03;

  const okDist = Math.hypot(
    landmarks[8].x - landmarks[4].x,
    landmarks[8].y - landmarks[4].y
  );

  const handOpen = indexOpen && middleOpen && ringOpen && pinkyOpen;

  if (okDist < 0.05 && middleOpen && ringOpen && pinkyOpen) return "OK";
  if (!indexOpen && !middleOpen && !ringOpen && pinkyOpen) return "Help";
  if (indexOpen && middleOpen && !ringOpen && !pinkyOpen) return "Good";
  if (indexOpen && !middleOpen && !ringOpen && !pinkyOpen) return "You";
  if (!indexOpen && !middleOpen && !ringOpen && !pinkyOpen) return "No";
  if (thumbOpen && !indexOpen && !middleOpen && !ringOpen && !pinkyOpen) return "Yes";
  if (handOpen) return "Hello";

  return "—";
}


// ---------------- MEDIAPIPE SETUP ----------------
const hands = new Hands({
  locateFile: (file) =>
    `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
  selfieMode: true,
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.6,
  minTrackingConfidence: 0.6
});


hands.onResults((results) => {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  if (results.image)
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

  let gestureOutput = "—";

  if (results.multiHandLandmarks?.length > 0) {
    const landmarks = results.multiHandLandmarks[0];

    drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00' });
    drawLandmarks(canvasCtx, landmarks, { color: '#FF0000' });

    gestureOutput = classifyGesture(landmarks);
    statusDiv.innerText = "Status: Hand detected";
  } else {
    statusDiv.innerText = "Status: No hand detected";
  }

  gestureDiv.innerText = "Gesture: " + gestureOutput;

  const now = Date.now();

  if (
    gestureOutput !== "—" &&
    gestureOutput !== lastGesture &&
    now - lastTime > COOLDOWN
  ) {
    gestureHistory.push(gestureOutput);

    let englishSentence = gestureOutput;

    if (gestureHistory.length >= 2) {
      const lastTwo = gestureHistory.slice(-2);
      const template = templates.find(t =>
        t.pattern[0] === lastTwo[0] && t.pattern[1] === lastTwo[1]
      );

      if (template) englishSentence = template.sentence;
    }

    sentence = englishSentence;
    document.getElementById("sentenceText").innerText =
      "Sentence: " + sentence;

    lastGesture = gestureOutput;
    lastTime = now;
  }

  canvasCtx.restore();
});


// ---------------- CAMERA ----------------
const camera = new Camera(videoElement, {
  onFrame: async () => await hands.send({ image: videoElement }),
  width: 640,
  height: 480
});
camera.start().then(() =>
  statusDiv.innerText = "Status: Camera started"
);


// ---------------- CLEAR + SPEAK ----------------
document.getElementById("clearSentence").onclick = () => {
  sentence = "";
  lastGesture = "—";
  document.getElementById("sentenceText").innerText = "Sentence:";
};

document.getElementById("speakSentence").onclick = () => {
  let msg = new SpeechSynthesisUtterance(sentence);
  window.speechSynthesis.speak(msg);
};


// ---------------- WORKING TRANSLATION (SAFE API) ----------------
async function translateSentence() {
    const text = sentence.trim();
    const target = document.getElementById("languageSelect").value;

    if (!text) {
        alert("No sentence to translate!");
        return;
    }

    document.getElementById("translatedText").innerText =
        "Translated: Translating...";

    try {
        const res = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${target}`
        );

        const data = await res.json();

        document.getElementById("translatedText").innerText =
            "Translated: " + data.responseData.translatedText;

    } catch (err) {
        document.getElementById("translatedText").innerText =
            "Translated: ERROR";
        console.error(err);
    }
}

document.getElementById("translateBtn").onclick = translateSentence;
