const patterns = {
  box: {
    label: 'Box (4•4•4•4)',
    steps: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    times: [4, 4, 4, 4],
    className: ['inhale', 'hold', 'exhale', 'hold'],
  },
  relax: {
    label: 'Relax (4•7•8)',
    steps: ['Inhale', 'Hold', 'Exhale'],
    times: [4, 7, 8],
    className: ['inhale', 'hold', 'exhale'],
  },
  focus: {
    label: 'Focus (6•2•6•2)',
    steps: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    times: [6, 2, 6, 2],
    className: ['inhale', 'hold', 'exhale', 'hold'],
  },
};

const state = {
  patternKey: 'box',
  stepIndex: 0,
  remaining: patterns.box.times[0],
  intervalId: null,
  running: false,
};

const elements = {
  startPause: document.getElementById('startPause'),
  reset: document.getElementById('reset'),
  status: document.getElementById('status'),
  counter: document.getElementById('counter'),
  pattern: document.getElementById('pattern'),
  patternLabel: document.getElementById('patternLabel'),
  visual: document.querySelector('.visual'),
  nextStep: document.getElementById('nextStep'),
  progressBar: document.getElementById('progressBar'),
  customGrid: document.getElementById('customGrid'),
};

const customInputs = {
  inhale: document.getElementById('inhale'),
  hold: document.getElementById('hold'),
  exhale: document.getElementById('exhale'),
  hold2: document.getElementById('hold2'),
};

const formatLabel = (times) => times.filter(Boolean).join('•');

const buildCustomPattern = () => {
  const inhale = Math.max(1, Number(customInputs.inhale.value) || 0);
  const hold = Math.max(0, Number(customInputs.hold.value) || 0);
  const exhale = Math.max(1, Number(customInputs.exhale.value) || 0);
  const hold2 = Math.max(0, Number(customInputs.hold2.value) || 0);
  const steps = ['Inhale', 'Hold', 'Exhale', 'Hold'];
  const times = [inhale, hold, exhale, hold2].filter((time, idx) => time > 0 || idx === 0 || idx === 2);
  const className = steps.slice(0, times.length).map((step) => step.toLowerCase());

  return {
    label: `Custom (${formatLabel(times)})`,
    steps: steps.slice(0, times.length),
    times,
    className,
  };
};

function getActivePattern() {
  if (state.patternKey === 'custom') {
    return buildCustomPattern();
  }
  return patterns[state.patternKey];
}

function updateVisual(stepClass) {
  const classes = ['inhale', 'exhale', 'hold'];
  classes.forEach((cls) => elements.visual.classList.remove(cls));
  if (stepClass) {
    elements.visual.classList.add(stepClass);
  }
}

function updateUI() {
  const pattern = getActivePattern();
  const { steps, times, className } = pattern;
  state.remaining = times[state.stepIndex] ?? times[0];
  elements.status.textContent = steps[state.stepIndex];
  elements.counter.textContent = state.remaining;
  elements.patternLabel.textContent = pattern.label;
  elements.nextStep.textContent = steps[(state.stepIndex + 1) % steps.length] || 'Ready to begin';
  updateVisual(className[state.stepIndex]);
}

function updateProgress() {
  const pattern = getActivePattern();
  const currentTime = pattern.times[state.stepIndex];
  if (!currentTime) return;
  const percent = Math.max(0, Math.min(100, ((currentTime - state.remaining) / currentTime) * 100));
  elements.progressBar.style.width = `${percent}%`;
}

function tick() {
  if (!state.running) return;
  if (state.remaining <= 0) {
    const pattern = getActivePattern();
    state.stepIndex = (state.stepIndex + 1) % pattern.steps.length;
    state.remaining = pattern.times[state.stepIndex];
    updateUI();
    updateProgress();
    return;
  }

  state.remaining -= 1;
  elements.counter.textContent = state.remaining;
  updateProgress();
}

function startSession() {
  if (state.running) return;
  state.running = true;
  elements.startPause.textContent = 'Pause';
  elements.startPause.classList.add('active');
  updateUI();
  updateProgress();
  tick();
  state.intervalId = setInterval(tick, 1000);
}

function pauseSession() {
  state.running = false;
  elements.startPause.textContent = 'Resume';
  elements.startPause.classList.remove('active');
  clearInterval(state.intervalId);
}

function resetSession() {
  pauseSession();
  state.stepIndex = 0;
  state.remaining = getActivePattern().times[0];
  elements.startPause.textContent = 'Start session';
  updateUI();
  updateProgress();
}

function handlePatternChange(value) {
  state.patternKey = value;
  elements.customGrid.style.display = value === 'custom' ? 'grid' : 'none';
  state.stepIndex = 0;
  state.remaining = getActivePattern().times[0];
  updateUI();
  updateProgress();
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(() => {
      /* noop */
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  elements.pattern.addEventListener('change', (e) => handlePatternChange(e.target.value));
  Object.values(customInputs).forEach((input) => {
    input.addEventListener('input', () => {
      if (state.patternKey === 'custom') {
        updateUI();
      }
    });
  });

  elements.startPause.addEventListener('click', () => {
    if (state.running) {
      pauseSession();
    } else {
      startSession();
    }
  });

  elements.reset.addEventListener('click', resetSession);

  updateUI();
  updateProgress();
  registerServiceWorker();
});
