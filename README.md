# Mind & Muscle

An interactive anatomy learning app built with Flask. Click on muscle groups on a 3D body map to learn their anatomy, actions, and exercises — then test your knowledge with a quiz.

---

## Features

- **Interactive Muscle Map** — clickable SVG body (front & back view) with hover highlights
- **Muscle Detail Pages** — anatomy overview, key actions carousel, exercises, and fun facts for 11 muscle groups
- **Progress Tracking** — localStorage tracks which muscles you've visited; unlocks the quiz once all are explored
- **Quiz Mode** — multiple-choice quiz with dropdown questions across all muscle groups
- **Quiz Game** — timed game mode with scoring and streaks

---

## Tech Stack

- Python / Flask
- Jinja2 templating
- Bootstrap 5
- jQuery
- Vanilla JS

---

## Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/nicorox247/MuscleMap.git
cd MuscleMap
```

### 2. Create and activate a virtual environment

```bash
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the app

```bash
python server.py
```

Open [http://localhost:5000](http://localhost:5000) in your browser.

---

## Project Structure

```
MuscleMap/
├── server.py              # Flask routes
├── muscle_data.py         # Muscle anatomy data
├── quiz_questions.py      # Quiz question data
├── requirements.txt
├── static/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   ├── script.js      # Muscle map interactions & session tracking
│   │   ├── progress-tracker.js
│   │   ├── muscle.js
│   │   ├── quiz.js
│   │   └── quizgame.js
│   ├── images/            # Muscle anatomy images
│   └── gifs/              # Exercise & action GIFs
└── templates/
    ├── base.html
    ├── index.html
    ├── muscle.html
    ├── muscle_page_1–4.html
    ├── quiz.html
    ├── quizgame.html
    └── about.html
```

---

## Deployment

Deployed on Vercel. See `vercel.json` for configuration.
