$(document).ready(function () {
    // add steps from jobs
    {
        const el = $('#step-to-step');

        const jobs = [
            {
                icon: 'bi bi-rulers',
                title: 'Planejamento sob medida.',
                description:
                    'Avaliamos seu espaço e indicamos o melhor tipo de pintura e cores, garantindo estética moderna e funcionalidade.'
            },
            {
                icon: 'bi bi-brush',
                title: 'Preparação do ambiente.',
                description:
                    'Organizamos tudo para uma aplicação limpa e prática, sem bagunça e sem comprometer o uso do local.'
            },
            {
                icon: 'bi bi-shield-check',
                title: 'Pintura rápida e segura.',
                description:
                    'Nosso time especializado realiza a aplicação com precisão, assegurando resistência, durabilidade e acabamento impecável.'
            },
            {
                icon: 'bi bi-stars',
                title: 'Toque final e satisfação garantida.',
                description:
                    'Conferimos cada detalhe e entregamos seu espaço renovado, pronto para uso imediato — com garantia de qualidade.'
            }
        ];


        for (const [index, job] of jobs.entries()) {
            const card = `
        <div class="card border-0 shadow-none anim">
            <div class="card-body bg-light">
                <div class="mb-3 d-flex text-center justify-content-center align-items-center rounded-circle bg-primary text-dark" style="width: 50px; height: 50px;">
                    <i class="${job.icon} text-light fs-2 w-100 h-100 d-flex text-center justify-content-center align-items-center"></i>
                </div>
                <h5 class="card-title fw-bolder">PASSO 0${index + 1} - ${job.title}</h5>
                <p class="card-text text-muted">${job.description}</p>
            </div>
        </div>
          `;
            el.append(card);
        }


    }
});


// Função pra checar se tá visível na tela
function isInViewport(el) {
    let elementTop = $(el).offset().top;
    let elementBottom = elementTop + $(el).outerHeight();

    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
}

// Função de animação
function animateOnScroll() {
    $(".anim").each(function () {
        if (isInViewport(this) && !$(this).hasClass("animated")) {
            $(this).addClass("animated"); // só anima uma vez
            $(this).animate({
                opacity: 1,
                top: 0
            }, 800);
        }
    });
}

function initComparisons() {
    var x, i;
    /* Find all elements with an "overlay" class: */
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
        /* Once for each "overlay" element:
        pass the "overlay" element as a parameter when executing the compareImages function: */
        compareImages(x[i]);
    }
    function compareImages(img) {
        var slider, img, clicked = 0, w, h;
        /* Get the width and height of the img element */
        w = img.offsetWidth;
        h = img.offsetHeight;
        /* Set the width of the img element to 50%: */
        img.style.width = (w / 2) + "px";
        /* Create slider: */
        slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        /* Insert slider */
        img.parentElement.insertBefore(slider, img);
        /* Position the slider in the middle: */
        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
        /* Execute a function when the mouse button is pressed: */
        slider.addEventListener("mousedown", slideReady);
        /* And another function when the mouse button is released: */
        window.addEventListener("mouseup", slideFinish);
        /* Or touched (for touch screens: */
        slider.addEventListener("touchstart", slideReady);
        /* And released (for touch screens: */
        window.addEventListener("touchend", slideFinish);
        function slideReady(e) {
            /* Prevent any other actions that may occur when moving over the image: */
            e.preventDefault();
            /* The slider is now clicked and ready to move: */
            clicked = 1;
            /* Execute a function when the slider is moved: */
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }
        function slideFinish() {
            /* The slider is no longer clicked: */
            clicked = 0;
        }
        function slideMove(e) {
            var pos;
            /* If the slider is no longer clicked, exit this function: */
            if (clicked == 0) return false;
            /* Get the cursor's x position: */
            pos = getCursorPos(e)
            /* Prevent the slider from being positioned outside the image: */
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            /* Execute a function that will resize the overlay image according to the cursor: */
            slide(pos);
        }
        function getCursorPos(e) {
            var a, x = 0;
            e = (e.changedTouches) ? e.changedTouches[0] : e;
            /* Get the x positions of the image: */
            a = img.getBoundingClientRect();
            /* Calculate the cursor's x coordinate, relative to the image: */
            x = e.pageX - a.left;
            /* Consider any page scrolling: */
            x = x - window.pageXOffset;
            return x;
        }
        function slide(x) {
            /* Resize the image: */
            img.style.width = x + "px";
            /* Position the slider: */
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        }
    }
}


$(document).ready(function () {
    initComparisons();
});

// dispara no load e no scroll
$(window).on("load scroll", function () {
    animateOnScroll();
});