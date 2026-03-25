// static/js/quiz.js

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('quiz-form');
  const resultsContainer = document.getElementById('results-container');
  const questionAnswers = JSON.parse(document.getElementById('quiz-data').textContent);

  // Make sure all questions are visible
  document.querySelectorAll('.question-container').forEach(container => {
    container.style.display = 'block';
  });

  // Setup muscle click handlers
  document.querySelectorAll('.clickable-muscle').forEach((m) => {
    m.addEventListener('click', function () {
      const q = m.closest('.question-container');
      q.querySelectorAll('.clickable-muscle').forEach((x) =>
        x.classList.remove('selected')
      );
      m.classList.add('selected');
    });
  });

  // Setup dropdown change handlers
  document.querySelectorAll('.quiz-select').forEach(select => {
    select.addEventListener('change', function() {
      const feedback = this.closest('.question-container').querySelector('.answer-feedback');
      if (this.value) {
        feedback.style.display = 'block';
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    let score = 0;
    const totalQuestions = Object.keys(questionAnswers).length;
    const feedbackContainer = document.getElementById('feedback-container');
    feedbackContainer.innerHTML = '';

    // Check muscle click questions (1-3)
    for (let i = 1; i <= 3; i++) {
      const selected = document.querySelector(
        `.question-container:nth-child(${i}) .clickable-muscle.selected`
      );
      const isCorrect = selected && selected.dataset.muscle === questionAnswers[i].muscle;
      
      if (isCorrect) score++;
      
      const feedback = document.createElement('div');
      feedback.className = `feedback-item ${isCorrect ? 'correct' : 'incorrect'}`;
      feedback.innerHTML = `
        <strong>Question ${i}:</strong> 
        ${isCorrect ? '✓ Correct!' : '✗ Incorrect. The correct answer was: ' + questionAnswers[i].muscle}
      `;
      feedbackContainer.appendChild(feedback);
    }

    // Check dropdown questions
    document.querySelectorAll('.quiz-select').forEach((select) => {
      const questionNum = parseInt(select.id.replace('q', ''));
      const isCorrect = select.value === questionAnswers[questionNum].muscle;
      
      if (isCorrect) score++;
      
      const feedback = document.createElement('div');
      feedback.className = `feedback-item ${isCorrect ? 'correct' : 'incorrect'}`;
      feedback.innerHTML = `
        <strong>Question ${questionNum}:</strong> 
        ${isCorrect ? '✓ Correct!' : '✗ Incorrect. The correct answer was: ' + questionAnswers[questionNum].muscle}
      `;
      feedbackContainer.appendChild(feedback);
    });

    // Calculate and display final score
    const percentage = Math.round((score / totalQuestions) * 100);
    document.getElementById('final-score').textContent = percentage;
    
    // Show results
    form.style.display = 'none';
    resultsContainer.style.display = 'block';
  });
});