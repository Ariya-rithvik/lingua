🎉 SignLingua – AI-Powered Sign Language → Speech → Multilingual Translation
Built for LingoHack25 – The Multilingual Hackathon

SignLingua is an AI-powered accessibility tool that converts hand gestures → sentences → speech → multilingual translations in real time.
The goal is to help users with speech/hearing disabilities communicate instantly using computer vision + AI translation.

🚀 About the Project

SignLingua bridges communication gaps by providing a real-time Sign-to-Speech and Speech-to-Multilingual translation system.

What it does:

🖐 Detects hand gestures using MediaPipe Hands

🤖 Classifies gestures into words (Hello, Yes, No, Help, Good, You, OK)

🧠 Auto-combines gestures into smart sentences

🔊 Speaks the sentence aloud

🌍 Translates sentences into 6+ languages (Hindi, Tamil, Telugu, Spanish, French, English)

📘 Lingo compiler integration (ready) — all text is marked with lingo="" attributes

This gives users a natural, automatic conversation flow without typing or speaking.

🧩 Features
🖐 Gesture Recognition (MediaPipe)

Detects and tracks hand landmarks

Classifies 7 gestures:

Hello ✋

Yes 👍

No ✊

Help 🤙

You 👉

Good ✌️

OK 👌

🧠 Smart Sentence Builder

Automatically generates sentences from gesture sequences:

Gestures	Auto Sentence
Hello + You	“Hello, how are you?”
You + Help	“Do you need help?”
Help + You	“Can I help you?”
Good + OK	“Everything is good.”
Yes + Help	“Yes, I need help.”
🌍 Multilingual Translation

Supports:
English, Hindi, Tamil, Telugu, French, Spanish

Uses a fallback translation API:

MyMemory (simple, free for testing)

Lingo compiler ready for integration

🔊 Text-to-Speech (TTS)

The browser speaks the generated sentence using native SpeechSynthesis API.

🎨 Clean UI

Camera feed

Gesture label

Status

Sentence builder

Translation box

Speech + Clear buttons

All styled with modern UI.

🛠 Tech Stack & Architecture
Frontend

HTML5 + CSS3 + JavaScript

MediaPipe Hands (real-time hand tracking)

Canvas for landmark drawing

SpeechSynthesis API

MyMemory translation API

Lingo.dev compiler (static translation-ready keys)

Architecture Flow
Camera Input →
MediaPipe Hand Detection →
Custom Gesture Classifier →
Sentence Builder →
UI Updates →
(Translate Button) →
Translation Engine →
Display Output →
(Optional) Speak sentence


Simple, efficient architecture — runs in the browser, no backend needed.

🎬 Demo
Live Demo (Local)

You can run locally by opening:

index.html


Allow camera permissions and start showing gestures.

Screenshots / GIFs

(Add screenshots if you have them — judges love visuals)

📚 Learning & Growth (Important for Judges)

This hackathon taught us:

🧠 Technical Learning

How MediaPipe detects 21 hand landmarks

Normalizing gesture patterns

Designing our own gesture-recognition logic

Async translation calls

Integration-ready i18n structure

Preparing a frontend to support runtime translations

🎨 Team / Personal Growth

Understood challenges faced by people with disabilities

Learned how important accessibility engineering is

Improved coding speed & debugging skills

Practiced integrating AI tools into real applications

📦 Project Structure
lingua/
│
├── index.html
├── style.css
├── script.js
├── i18n/
│    ├── en.json
│    ├── hi.json (to be auto-generated)
│    ├── ta.json
│    ├── te.json
│    ├── es.json
│    ├── fr.json
└── README.md

🔧 Installation & Running
1️⃣ Clone the repo
git clone https://github.com/YOUR_USERNAME/lingua.git
cd lingua

2️⃣ Open index.html

Just open in your browser.

No installation required.

🚧 Future Enhancements
High Priority

True Lingo.dev API translation (CI/CD integrated)

More gesture words

Full ASL/ISL alphabet recognition

Mobile-friendly UI

Medium Priority

Speech-to-sign

AI-based gesture correction

Personal dictionary for users

🏁 Conclusion

SignLingua empowers users with speech and hearing disabilities to communicate instantly and confidently, in multiple languages, using only hand gestures.

This aligns perfectly with LingoHack25’s mission:
“Build anything. Translate everything.”
