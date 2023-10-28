$(window).load(function() {
    $(".carousel .item").each(function() {
        var i = $(this).next();
        i.length || (i = $(this).siblings(":first")),
        i.children(":first-child").clone().appendTo($(this));
        for (var n = 0; n < 4; n++)(i = i.next()).length ||
        (i = $(this).siblings(":first")),
        i.children(":first-child").clone().appendTo($(this))
    })
});



const controls = document.querySelectorAll('.control');

let botaoAtivo = 0;
const botaoFiltro = document.querySelectorAll('.botao-filtro');
const maxBotoes = botaoFiltro.length;


const controls = document.querySelectorAll(".control");
let currentItem = 0;
const items = document.querySelectorAll(".item");
const maxItems = items.length;

controls.forEach((control) => {
    control.addEventListener("click", (e) => {
        isLeft = e.target.classList.contains("arrow-left");

        if (isLeft) {
            currentItem -= 1;
        } else {
            currentItem += 1;
        }

        if (currentItem >= maxItems) {
            currentItem = 0;
        }

        if (currentItem < 0) {
            currentItem = maxItems - 1;
        }

        items.forEach((item) => item.classList.remove("current-item"));

        items[currentItem].scrollIntoView({
            behavior: "smooth",
            inline: "center"
        });

        items[currentItem].classList.add("current-item");
    });
});