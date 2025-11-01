# 🧠 Quizzy

**Quizzy** is a real-time quiz platform built using **pure WebSockets** — no database, no authentication, just instant communication between teachers and students.  
It’s inspired by *KBC (Kaun Banega Crorepati)* style interaction where speed and accuracy matter most.

---

## 🎯 Overview

- 👨‍🏫 **Teacher** creates a live quiz session and shares a session ID.
- 👩‍🎓 **Students** join that session using the session ID.
- 🕐 Teacher sends questions in real-time to all connected students.
- ⚡ Students select and submit their answers within the time limit.
- 🏁 When the teacher ends the round, the **Leaderboard** instantly shows the top 3 fastest correct responders.

Everything happens in memory — ultra-fast, zero-latency.

---

---

## ⚙️ Core Logic Summary

- All quiz data is stored in memory in a `sessions` object.
- Each session tracks:
  - `teacherSocket`
  - `students[]`
  - `correctOption`
  - `responses[]` with `{ id, name, option, time }`
- Students’ responses are filtered by correctness and sorted by time.
- The top 3 fastest correct answers are broadcasted back to the teacher.

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + Tailwind |
| Backend | Node.js + WebSocket (`ws`) |
| Storage | In-memory (no DB) |
| Communication | Real-time WebSocket Events |

---

## 💡 Key Highlights

- ⚡ Ultra-fast (no DB calls)
- 💬 Fully real-time interaction
- 🔐 No login or signup — session-based participation
- 📊 Instant leaderboard after each question
- 💻 Works locally or over LAN/Wi-Fi
- 🧠 Perfect for classrooms, quizzes, and small events

---

## 🧠 Example Flow

```
Teacher joins → Students join → Teacher sends question → Students answer
→ Teacher clicks "Show Result" → Leaderboard displayed instantly
```

---

## 🧑‍💻 Developer Notes

- Each quiz session runs in memory and resets per new session.
- WebSocket server can handle multiple active sessions.
- You can easily extend this to:
  - Add Redis for persistence
  - Add REST endpoints for analytics
  - Store past leaderboards

---

## 👨‍🏫 Author

**Om Sharma**  
Full-Stack Engineer | React • Node • WebRTC • WebSockets  
📍 India  
🌐 [cv.omsharma.info](https://cv.omsharma.info)

---

> ⚡ *“Quizzy — Real-time quizzes made ridiculously simple.”*
