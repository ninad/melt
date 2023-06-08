window.onload = function() {
    const techniques = {
        box: {
            steps: ["Breathe In", "Hold", "Breathe Out", "Hold"],
            times: [4, 4, 4, 4], // in seconds
            color: '#6B8697', // blue color for box breathing
        },
        "478": {
            steps: ["Breathe In", "Hold", "Breathe Out"],
            times: [4, 7, 8], // in seconds
            color: '#4B5E3F', // green color for 4-7-8 breathing
        },
    };

    let selectedTechnique = techniques.box;

    const body = document.body;
    const circle = document.getElementById('animatedCircle');
    const counter = document.getElementById('counter');
    const status = document.getElementById('status');

    let currentStep = 0;
    let currentTime = selectedTechnique.times[currentStep];
    status.textContent = selectedTechnique.steps[currentStep];
    counter.textContent = currentTime;

    // Listen for changes in the selected technique
    document.getElementsByName('technique').forEach(radio => {
        radio.addEventListener('change', function() {
            selectedTechnique = techniques[this.value];
            currentStep = 0;
            currentTime = selectedTechnique.times[currentStep];
            status.textContent = selectedTechnique.steps[currentStep];
            counter.textContent = currentTime;
            updateCircle();
        });
    });

    function updateCircle() {
        circle.style.backgroundColor = selectedTechnique.color;
        switch(selectedTechnique.steps[currentStep]) {
            case "Breathe In":
                circle.style.transform = "scale(1)";
                body.style.backgroundColor = '#eee';
                break;
            case "Hold":
                break;
            case "Breathe Out":
                circle.style.transform = "scale(0)";
                body.style.backgroundColor = '#fff';
                break;
        }
        circle.style.transition = `transform ${selectedTechnique.times[currentStep]}s, background-color ${selectedTechnique.times[currentStep]}s`;
        body.style.transition = `background-color ${selectedTechnique.times[currentStep]}s`;
    }

    function step() {
        if (currentTime == 0) {
            currentStep = (currentStep + 1) % selectedTechnique.steps.length;
            currentTime = selectedTechnique.times[currentStep];
            status.textContent = selectedTechnique.steps[currentStep];
            updateCircle();
        }
        currentTime -= 1;
        counter.textContent = currentTime;
    }

    // Initial animation
    updateCircle();

    setInterval(step, 1000);

}


