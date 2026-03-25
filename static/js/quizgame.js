// Questions
const questions = [
  {question: "What is the primary function of the pectoralis major?", options: ["Hip flexion", "Shoulder adduction", "Knee extension"], correct: 1, category: "upper"},
  {question: "Which exercise best isolates the chest?", options: ["Push-Up", "Chest Fly", "Barbell Curl"], correct: 1, category: "upper"},
  {question: "Which movement engages the upper part of the chest?", options: ["Shoulder Flexion", "Scapular Retraction", "Hip Extension"], correct: 0, category: "upper"},
  {question: "Which part of the deltoid is primarily targeted by lateral raises?", options: ["Anterior", "Posterior", "Lateral"], correct: 2, category: "upper"},
  {question: "What is the shape origin of the deltoid muscle's name?", options: ["Circle", "Delta (Triangle)", "Square"], correct: 1, category: "upper"},
  {question: "What is the primary function of the biceps brachii?", options: ["Elbow extension", "Elbow flexion", "Shoulder abduction"], correct: 1, category: "upper"},
  {question: "How many heads does the biceps brachii have?", options: ["One", "Two", "Three"], correct: 1, category: "upper"},
  {question: "Which exercise primarily targets the lower abdominals?", options: ["Crunches", "Leg Raises", "Planks"], correct: 1, category: "upper"},
  {question: "What gives the 'six-pack' look in the abs?", options: ["Fat Layers", "Tendinous Intersections", "Rectus Sheath"], correct: 1, category: "upper"},
  {question: "Which of the following is NOT part of the quadriceps group?", options: ["Rectus Femoris", "Biceps Femoris", "Vastus Medialis"], correct: 1, category: "lower"},
  {question: "Which motion are the quadriceps primarily responsible for?", options: ["Hip Abduction", "Knee Extension", "Ankle Dorsiflexion"], correct: 1, category: "lower"},
  {question: "Which calf muscle is more active during seated calf raises?", options: ["Gastrocnemius", "Soleus", "Tibialis Anterior"], correct: 1, category: "lower"},
  {question: "What is the main action of the calf muscles?", options: ["Knee Extension", "Ankle Plantar Flexion", "Hip Extension"], correct: 1, category: "lower"},
  {question: "How many heads does the triceps brachii have?", options: ["Two", "Three", "Four"], correct: 1, category: "upper"},
  {question: "What is the primary function of the triceps?", options: ["Elbow Extension", "Wrist Flexion", "Shoulder Abduction"], correct: 0, category: "upper"},
  {question: "What movement is performed when the scapula is pulled toward the spine?", options: ["Scapular Elevation", "Scapular Depression", "Scapular Retraction"], correct: 2, category: "upper"},
  {question: "Which exercise targets the upper trapezius?", options: ["Barbell Shrug", "Leg Curl", "Chest Press"], correct: 0, category: "upper"},
  {question: "What is the primary function of the latissimus dorsi?", options: ["Arm abduction", "Arm adduction", "Shoulder flexion"], correct: 1, category: "upper"},
  {question: "What is a common nickname for the latissimus dorsi?", options: ["Lats", "Traps", "Delts"], correct: 0, category: "upper"},
  {question: "Which exercise primarily targets the gluteus maximus?", options: ["Hip Thrusts", "Leg Extensions", "Calf Raises"], correct: 0, category: "lower"},
  {question: "What is the gluteus maximus mainly responsible for?", options: ["Knee Flexion", "Hip Extension", "Ankle Plantar Flexion"], correct: 1, category: "lower"},
  {question: "How many muscles make up the hamstring group?", options: ["Two", "Three", "Four"], correct: 1, category: "lower"},
  {question: "Where are the hamstrings located?", options: ["Back of the thigh", "Front of the thigh", "Lower leg"], correct: 0, category: "lower"},
  {question: "Which exercise isolates the biceps the most?", options: ["Bicep Curl", "Push-Up", "Tricep Dip"], correct: 0, category: "upper"},
  {question: "What muscle is known as the 'six-pack'?", options: ["Rectus Abdominis", "Obliques", "Transverse Abdominis"], correct: 0, category: "upper"},
  {question: "Which exercise is best for building quad strength?", options: ["Barbell Squat", "Hamstring Curl", "Calf Raise"], correct: 0, category: "lower"},
  {question: "Which muscle lies beneath the gastrocnemius?", options: ["Soleus", "Rectus Femoris", "Vastus Lateralis"], correct: 0, category: "lower"},
  {question: "Which exercise works the triceps using cables?", options: ["Pushdown", "Pull-Up", "Lateral Raise"], correct: 0, category: "upper"}
];
  
  // State
  let currentQuestion=0, score=0, streak=0, timeLeft=60, timer, startTime, responseTimes=[], selectedCategory='all';
  
  // Shuffle util
  function shuffleArray(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }}
  
  // Start
  function startGame(){ 
    shuffleArray(questions); 
    currentQuestion=0; 
    score=0; 
    streak=0; 
    timeLeft=60; 
    responseTimes=[]; 
    document.getElementById('questionContainer').classList.add('active');
    document.getElementById('startGame').style.display='none'; 
    document.getElementById('tryAgain').style.display='none'; 
    document.getElementById('resultsContainer').style.display='none'; 
    updateDisplay(); showQuestion(); startTimer(); 
  }
  
  // Timer
  function startTimer(){ 
    document.getElementById('timer').textContent=timeLeft; 
    document.getElementById('timerBarFill').style.width=(timeLeft/60*100)+'%'; timer=setInterval(()=>{ timeLeft--; 
    document.getElementById('timer').textContent=timeLeft; document.getElementById('timerBarFill').style.width=(timeLeft/60*100)+'%'; 
    if(timeLeft<=0) endGame(); },1000); 
  }
  
  // Show question + shuffle answers
  function showQuestion(){ 
    document.getElementById('questionContainer').classList.add('active');
    const bucket=questions.filter(q=>selectedCategory==='all'||q.category===selectedCategory); 
    if(currentQuestion>=bucket.length) return endGame(); 
    const q=bucket[currentQuestion]; 
    document.getElementById('questionText').textContent=q.question; 
    const optsArr=q.options.map((opt,i)=>( {text:opt,isCorrect:i===q.correct} )); 
    shuffleArray(optsArr); 
    const container=document.getElementById('answerOptions'); 
    container.innerHTML=''; 
    optsArr.forEach(optObj=>{ const btn=document.createElement('button'); 
    btn.className='answer-option'; 
    btn.textContent=optObj.text; btn.dataset.correct=optObj.isCorrect; 
    btn.onclick=()=>checkAnswer(btn); container.appendChild(btn); }); 
    startTime=Date.now(); 
  }
  
  // Check answer
  function checkAnswer(btn){  
    const opts=document.querySelectorAll('.answer-option'); 
    opts.forEach(b=>b.disabled=true); 
    const isCorrect=btn.dataset.correct==='true'; 
    const rt=(Date.now()-startTime)/1000; 
    responseTimes.push(rt); 
  
    if(isCorrect){ 
      btn.classList.add('correct-flash'); score+=10 + (rt<3?5:0); 
      streak++; 
      if(streak>1) showCombo(); 
    } 
    else { 
      btn.classList.add('shake'); const correctBtn=document.querySelector('.answer-option[data-correct="true"]'); 
      correctBtn.classList.add('correct-flash'); 
      score=Math.max(0,score-5); 
      streak=0; 
    } 
    updateDisplay(); 
    setTimeout(() => { currentQuestion++; showQuestion(); }, 800); 
  }
  
  // Update display
  function updateDisplay(){ 
    document.getElementById('score').textContent=score; 
    document.getElementById('streak').textContent=streak; 
  }
  
  // Combo
  function showCombo(){ 
    const combo=document.getElementById('comboBar'); 
    combo.textContent=`🔥 Streak x${streak}!`; 
    combo.style.display='block'; 
    setTimeout(()=>combo.style.display='none',800); 
  }
  
  // End game
  function endGame(){ 
    clearInterval(timer); 
    document.getElementById('finalScore').textContent=score; 
    document.getElementById('correctAnswers').textContent=responseTimes.filter(t=>t<3).length; 
    document.getElementById('avgResponseTime').textContent=((responseTimes.reduce((a,b)=>a+b,0)/responseTimes.length)||0).toFixed(2); 
    document.getElementById('bestStreak').textContent=streak; document.getElementById('resultsContainer').style.display='block'; 
    document.getElementById('tryAgain').style.display='inline-block'; 
    updateLeaderboard(); 
  }
  
  // Leaderboard
  function updateLeaderboard(){ 
    let lb=JSON.parse(localStorage.getItem('leaderboard')||'[]'); 
    lb.push({score,date:new Date().toLocaleDateString()}); 
    lb.sort((a,b)=>b.score-a.score); lb=lb.slice(0,5); 
    localStorage.setItem('leaderboard',JSON.stringify(lb)); 
    document.getElementById('leaderboard').innerHTML=lb.map((e,i)=>`<div class="leaderboard-item">${i+1}. ${e.score}pts (${e.date})</div>`).join(''); 
  }
  
  // Listeners
  document.getElementById('startGame').onclick=startGame; 
  document.getElementById('tryAgain').onclick=startGame; 
  document.querySelectorAll('.category-filter button').forEach(btn=>btn.onclick=e=>{ selectedCategory=e.target.dataset.category; 
  document.querySelectorAll('.category-filter button').forEach(b=>b.classList.remove('active')); 
  e.target.classList.add('active'); });