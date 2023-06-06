window.onload = function() {
    const boxBreathing = {
        steps: ["Breathe In", "Hold", "Breathe Out", "Hold"],
        times: [4, 4, 4, 4], // in seconds
    };

    const body = document.body;
    const circle = document.getElementById('animatedCircle');
    const counter = document.getElementById('counter');
    const status = document.getElementById('status');

    let currentStep = 0;
    let currentTime = boxBreathing.times[currentStep];
    status.textContent = boxBreathing.steps[currentStep];
    counter.textContent = currentTime;

    function updateCircle() {
        switch(boxBreathing.steps[currentStep]) {
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
        circle.style.transition = `transform ${boxBreathing.times[currentStep]}s`;
        body.style.transition = `background-color ${boxBreathing.times[currentStep]}s`;
    }

    function step() {
        if (currentTime == 0) {
            currentStep = (currentStep + 1) % boxBreathing.steps.length;
            currentTime = boxBreathing.times[currentStep];
            status.textContent = boxBreathing.steps[currentStep];
            updateCircle();
        }
        currentTime -= 1;
        counter.textContent = currentTime;
    }

    // Initial animation
    updateCircle();

    setInterval(step, 1000);
}
