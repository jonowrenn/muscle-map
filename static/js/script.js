$(document).ready(function(){
    const $container = $('.image-map-container');

    // Hover‐in: draw highlight
    $container.on('mouseenter', 'area.muscle-area', function(){
      // parse all x,y pairs
      const pts = this.coords.split(',').map(Number);
      const xs = pts.filter((_,i) => i % 2 === 0);
      const ys = pts.filter((_,i) => i % 2 === 1);

      // compute bounding box
      const x1 = Math.min(...xs),
            x2 = Math.max(...xs),
            y1 = Math.min(...ys),
            y2 = Math.max(...ys);

       // add highlight div
      const $hl = $('<div class="muscle-highlight"></div>').css({
        top:    y1,
        left:   x1,
        width:  x2 - x1,
        height: y2 - y1
      });
      $container.append($hl);
    });

    // Hover‐out: remove highlight
    $container.on('mouseleave', 'area.muscle-area', function(){
      $container.find('.muscle-highlight').remove();
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    // Only run session/muscle-map logic on pages that have the session-id element
    const sessionIdEl = document.getElementById('session-id');
    if (sessionIdEl) {
        const currentSessionId = sessionIdEl.textContent;

        // Check if we need to clear localStorage (different session)
        const storedSessionId = localStorage.getItem('sessionId');
        if (storedSessionId !== currentSessionId) {
            localStorage.clear();
            localStorage.setItem('sessionId', currentSessionId);
        }
    }

    // Map individual muscle IDs to their groups
    const muscleGroupMap = {
        // Front view muscles
        'chest-left': 'chest',
        'chest-right': 'chest',
        'deltoid-left': 'shoulders',
        'deltoid-right': 'shoulders',
        'bicep-left': 'biceps',
        'bicep-right': 'biceps',
        'abs': 'abdominals',
        'quad-left': 'quadriceps',
        'quad-right': 'quadriceps',
        // Back view muscles
        'triceps-left': 'triceps',
        'triceps-right': 'triceps',
        'trapezius-left': 'trapezius',
        'trapezius-right': 'trapezius',
        'latissimus-left': 'latissimus',
        'latissimus-right': 'latissimus',
        'glutes-left': 'glutes',
        'glutes-right': 'glutes',
        'hamstrings-left': 'hamstrings',
        'hamstrings-right': 'hamstrings',
        'calf-back-left': 'calves',
        'calf-back-right': 'calves'
    };

    // Load and display visited muscles
    const visitedMuscles = JSON.parse(localStorage.getItem('visitedMuscles') || '[]');
    visitedMuscles.forEach(muscleId => {
        const groupId = muscleGroupMap[muscleId];
        const el = groupId && document.getElementById(`${groupId}-group`);
        if (el) el.classList.add('visited');
    });

    // Check if all muscle groups are visited
    function checkAllMusclesVisited() {
        const uniqueGroups = new Set(Object.values(muscleGroupMap));
        const visitedGroups = new Set(visitedMuscles.map(id => muscleGroupMap[id]));
        const quizButton = document.getElementById('quiz-button');
        if (quizButton && uniqueGroups.size === visitedGroups.size) {
            quizButton.style.display = 'inline-block';
        }
    }

    // Add click handlers to all muscle paths
    document.querySelectorAll('#muscle-links path, #muscle-links-back path').forEach(path => {
        path.addEventListener('click', function() {
            const muscleId = this.id;
            if (!visitedMuscles.includes(muscleId)) {
                visitedMuscles.push(muscleId);
                localStorage.setItem('visitedMuscles', JSON.stringify(visitedMuscles));
                const groupId = muscleGroupMap[muscleId];
                const el = groupId && document.getElementById(`${groupId}-group`);
                if (el) el.classList.add('visited');
                checkAllMusclesVisited();
            }
        });
    });

    // Check on initial load
    checkAllMusclesVisited();

    // Toggle front/back view
    const toggleBtn = document.getElementById('toggleViewBtn');
    const muscleMapImage = document.getElementById('muscleMapImage');
    const muscleLinksFront = document.getElementById('muscle-links');
    const muscleLinksBack = document.getElementById('muscle-links-back');
    let showingFront = localStorage.getItem('showingFront') !== 'false';

    if (toggleBtn && muscleMapImage && muscleLinksFront && muscleLinksBack) {
        // Set initial state
        if (!showingFront) {
            muscleMapImage.setAttribute('href', muscleMapImage.getAttribute('data-back-image'));
            toggleBtn.textContent = 'Show Front View';
            muscleLinksFront.style.display = 'none';
            muscleLinksBack.style.display = 'block';
        }

        toggleBtn.addEventListener('click', function() {
            if (showingFront) {
                muscleMapImage.setAttribute('href', muscleMapImage.getAttribute('data-back-image'));
                toggleBtn.textContent = 'Show Front View';
                showingFront = false;
                muscleLinksFront.style.display = 'none';
                muscleLinksBack.style.display = 'block';
            } else {
                muscleMapImage.setAttribute('href', muscleMapImage.getAttribute('data-front-image'));
                toggleBtn.textContent = 'Show Back View';
                showingFront = true;
                muscleLinksFront.style.display = 'block';
                muscleLinksBack.style.display = 'none';
            }
            localStorage.setItem('showingFront', showingFront);
        });
    }
});
