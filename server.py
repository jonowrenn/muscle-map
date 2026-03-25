from flask import Flask, render_template, abort
from muscle_data import muscles
from quiz_questions import dropdown_questions
import uuid

app = Flask(__name__)

# Generate a unique session ID that changes on server reload
SESSION_ID = str(uuid.uuid4())

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/muscle')
def muscle_map():
    return render_template('muscle.html', session_id=SESSION_ID)  # Pass session ID to template

@app.route('/muscle/<muscle_name>/page/<int:page>')
def muscle_page(muscle_name, page):
    muscle = muscles.get(muscle_name)
    if not muscle:
        abort(404)

    # Render the correct template based on the step/page
    try:
        return render_template(f'muscle_page_{page}.html', muscle=muscle, muscle_name=muscle_name)
    except Exception:
        abort(404)

@app.route('/quiz')
def quiz():
    static_answers = {
        1: {"muscle": "biceps", "exercise": "bicep curls"},
        2: {"muscle": "pectorals", "exercise": "bench press"},
        3: {"muscle": "deltoid", "exercise": "lateral raises"},
    }

    # Populate answers for Q4-Q15 dynamically
    for i, q in enumerate(dropdown_questions, start=4):
        static_answers[i] = {"muscle": q["answer"], "exercise": q["question"]}

    return render_template("quiz.html", dropdown_questions=dropdown_questions, question_answers=static_answers)


@app.route('/quizgame')
def quizgame():
    return render_template('quizgame.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)