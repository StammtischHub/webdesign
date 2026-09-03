const counters = [...document.querySelectorAll(".counter span")];
const container = document.querySelector("#specs");

const TRIGGER_OFFSET = 200;
const ANIMATION_DURATION = 2500;

let activated = false;

function animateCounter(counter, target, duration) {
    const startTime = performance.now();

    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);

        counter.innerText = value;

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            counter.innerText = target;
        }
    }

    requestAnimationFrame(step);
}

function startAllCounters() {
    counters.forEach(counter => {
        const target = parseFloat(counter.dataset.count);
        animateCounter(counter, target, ANIMATION_DURATION);
    });
}

function shouldActivate() {
    const triggerPoint =
        container.offsetTop - window.innerHeight + TRIGGER_OFFSET;

    return window.pageYOffset > triggerPoint;
}

function handleScroll() {
    if (!shouldActivate()) {
        activated = false;
        resetAllCounters();
        return;
    }

    if (!activated) {
        startAllCounters();
        activated = true;
    }
}

function resetAllCounters() {
    counters.forEach(counter => {
        counter.innerText = "0";
    });
}

window.addEventListener("scroll", handleScroll);
