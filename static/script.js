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
    // Get current session ID
    const currentSessionId = document.getElementById('session-id').textContent;
    
    // Check if we need to clear localStorage (different session)
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId !== currentSessionId) {
        localStorage.clear();
        localStorage.setItem('sessionId', currentSessionId);
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
        if (groupId) {
            document.getElementById(`${groupId}-group`).classList.add('visited');
        }
    });

    // Check if all muscle groups are visited
    function checkAllMusclesVisited() {
        const uniqueGroups = new Set(Object.values(muscleGroupMap));
        const visitedGroups = new Set(visitedMuscles.map(id => muscleGroupMap[id]));
        const quizButton = document.getElementById('quiz-button');
        if (uniqueGroups.size === visitedGroups.size) {
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
                if (groupId) {
                    document.getElementById(`${groupId}-group`).classList.add('visited');
                }
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
/**
    // Design mode toggle
    const designModeToggle = document.getElementById('designModeToggle');
    let designMode = false;
    if (designModeToggle && muscleLinksFront && muscleLinksBack) {
        designModeToggle.addEventListener('click', function() {
            designMode = !designMode;
            if (designMode) {
                muscleLinksFront.style.pointerEvents = 'none';
                muscleLinksBack.style.pointerEvents = 'none';
                designModeToggle.textContent = 'Disable Design Mode';
                designModeToggle.style.backgroundColor = 'var(--fitness-accent)';
            } else {
                muscleLinksFront.style.pointerEvents = 'auto';
                muscleLinksBack.style.pointerEvents = 'auto';
                designModeToggle.textContent = 'Enable Design Mode';
                designModeToggle.style.backgroundColor = 'var(--fitness-dark)';
            }
        });
    }

    // === Coordinate Tracing Helper (for localhost only) ===
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const svg = document.getElementById('muscleSVG');
        if (!svg) return;

        // UI panel
        const uiContainer = document.createElement('div');
        uiContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 15px;
            border-radius: 5px;
            font-family: monospace;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(uiContainer);

        // Display
        const coordDisplay = document.createElement('div');
        uiContainer.appendChild(coordDisplay);

        // Controls
        const controlsContainer = document.createElement('div');
        controlsContainer.style.cssText = 'display: flex; gap: 10px; flex-wrap: wrap;';
        uiContainer.appendChild(controlsContainer);

        // Point type selector
        const pointTypes = { 'L': 'Line', 'Q': 'Quadratic', 'C': 'Cubic' };
        let currentPointType = 'L';
        let points = [];
        let controlPoints = [];

        Object.entries(pointTypes).forEach(([type, label]) => {
            const btn = document.createElement('button');
            btn.textContent = label;
            btn.style.cssText = `padding: 5px 10px; background: ${type === currentPointType ? '#007bff' : '#6c757d'}; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 12px;`;
            btn.addEventListener('click', () => {
                currentPointType = type;
                controlsContainer.querySelectorAll('button').forEach(b => {
                    b.style.background = b === btn ? '#007bff' : '#6c757d';
                });
            });
            controlsContainer.appendChild(btn);
        });

        // Reset/Undo
        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Reset';
        resetBtn.style.cssText = 'padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 12px;';
        resetBtn.addEventListener('click', () => { points = []; controlPoints = []; updateDisplay(); });
        controlsContainer.appendChild(resetBtn);
        const undoBtn = document.createElement('button');
        undoBtn.textContent = 'Undo';
        undoBtn.style.cssText = 'padding: 5px 10px; background: #ffc107; color: black; border: none; border-radius: 5px; cursor: pointer; font-size: 12px;';
        undoBtn.addEventListener('click', () => {
            if (controlPoints.length > 0) controlPoints.pop();
            else if (points.length > 0) points.pop();
            updateDisplay();
        });
        controlsContainer.appendChild(undoBtn);

        function updateDisplay() {
            if (points.length === 0) {
                coordDisplay.textContent = 'Click to start mapping points';
                return;
            }
            let output = `Last Click: ${points[points.length - 1].join(',')}\n\n`;
            if (points.length > 0) {
                output += 'Path Data:\nM ' + points[0].join(',');
                let controlPointIndex = 0;
                for (let i = 1; i < points.length; i++) {
                    if (points[i].type === 'Q') {
                        output += ' Q ' + controlPoints[controlPointIndex].join(',') + ' ' + points[i].join(',');
                        controlPointIndex++;
                    } else if (points[i].type === 'C') {
                        output += ' C ' + controlPoints[controlPointIndex].join(',') + ' ' + controlPoints[controlPointIndex + 1].join(',') + ' ' + points[i].join(',');
                        controlPointIndex += 2;
                    } else {
                        output += ' L ' + points[i].join(',');
                    }
                }
                output += ' Z';
            }
            coordDisplay.textContent = output;
        }

        svg.addEventListener('click', function(e) {
            const pt = svg.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
            const x = Math.round(svgP.x);
            const y = Math.round(svgP.y);
            const point = [x, y];
            point.type = currentPointType;
            if (points.length > 0 && currentPointType === 'Q') {
                if (controlPoints.length === points.length - 1) {
                    points.push(point);
                } else {
                    controlPoints.push(point);
                }
            } else if (points.length > 0 && currentPointType === 'C') {
                if (controlPoints.length === (points.length - 1) * 2) {
                    points.push(point);
                } else {
                    controlPoints.push(point);
                }
            } else {
                points.push(point);
            }
            updateDisplay();
            console.log(`Added point: ${x},${y} (${currentPointType})`);
        });
    }
        */
});