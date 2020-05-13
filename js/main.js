window.addEventListener('DOMContentLoaded', function(e) {
    var presentation = document.querySelector('hp-presentation');

    presentation.onclick = handlePresentationClick;
    presentation.addEventListener('animationend', handleAnimationEnd, false);
});

var shapes = ['circle', 'diamond', 'square', 'triangle'];

function handlePresentationClick(e) {
    var current = document.querySelector('hp-slide.active'),
        next = current.nextElementSibling,
        aa, osa;

    if (next) {
        current.classList.remove('active');
        next.classList.add('active');

        next.querySelectorAll('.match').forEach(function (el) {
            setTimeout(function () {
                el.classList.remove('match');
            }, 0);
        });

        aa = parseInt(next.getAttribute('data-autoadvance'));

        if (!isNaN(aa)) {
            setTimeout(function (e) {
                handlePresentationClick(e);
            }, aa);
        }

        osa = next.getAttribute('data-onshow');
        if (osa) {
            window[osa]();
        }
    }
}

function handleAnimationEnd(e) {
    var slide = e.target.closest('hp-slide'),
        aa = slide.getAttribute('data-autoadvance');

    if (aa == 'animationend' && slide.classList.contains('active')) {
        handlePresentationClick(e);
    }
}

function setLearnImage(imageName) {
    var img = document.querySelector('hp-slide.active hp-learn img');

    if (img) {
        img.src = 'images/' + imageName + '.svg';
    }
}

function showLearning() {
    var ii = Math.floor(Math.random() * shapes.length),
        slide;

    setLearnImage(shapes[ii]);

    slide = document.querySelector('hp-slide.active');

    slide.classList.remove('learn-yes');
    slide.classList.remove('learn-no');
    slide.classList.add(ii ? 'learn-no' : 'learn-yes');
}

function startLearning(learningDelay) {
    showLearning();

    setTimeout(function () {
        if (learningDelay > 1.1) {
            showLearning();

            learningDelay = Math.pow(learningDelay, 1 / 1.05);
            startLearning(learningDelay);
        }
    }, learningDelay);
}

function runLearningSequence() {
    startLearning(1500);
}

function animateSVGStep() {
    var slide = document.querySelector('hp-slide.active'),
        svgs = slide.querySelectorAll('svg'),
        el;

    if (svgs[0].children.length > 0) {
        el = svgs[0].children[0];

        if (el) {
            svgs[1].appendChild(el.parentNode.removeChild(el));
        }

        return true;
    }

    return false;
}

function animateSVG() {
    if (animateSVGStep()) {
        setTimeout(animateSVG, 30);
    }
}
