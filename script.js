// --- ДАННЫЕ ДЛЯ ВИКТОРИНЫ ---
// Раньше у нас был один большой сложный список,
// а теперь три простых массива. Так гораздо понятнее!

// 1. Массив с текстами вопросов
const voprosy = [
    "Что едят панды?",
    "Какой герой живёт в ананасе под водой?",
    "Сколько лап у паука?",
    "На какой планете мы живём?"
];

// 2. Массив с вариантами ответов.
// Это массив, внутри которого лежат другие массивы.
const variantyOtvetov = [
    ["Мясо", "Бамбук", "Рыбу", "Конфеты"], // Ответы на 1-й вопрос
    ["Патрик", "Сквидвард", "Губка Боб", "Лунтик"], // Ответы на 2-й вопрос
    ["6", "8", "4", "10"], // Ответы на 3-й вопрос
    ["Марс", "Венера", "Земля"] // Ответы на 4-й вопрос (тут 3 варианта)
];

// 3. Массив с правильными ответами.
// Порядок должен совпадать с порядком вопросов.
const pravilnyeOtvety = [
    "Бамбук",
    "Губка Боб",
    "8",
    "Земля"
];

// --- ПЕРЕМЕННЫЕ ДЛЯ РАБОТЫ ИГРЫ ---

// Номер вопроса, который мы показываем сейчас. Начинаем с 0.
let nomerTekushegoVoprosa = 0;
// Счёт правильных ответов. В начале игры он равен 0.
let schet = 0;

// --- НАХОДИМ ЭЛЕМЕНТЫ НА СТРАНИЦЕ ---
// "Запоминаем" в переменных все нужные нам части HTML-страницы.

// Элементы для отображения вопроса
const poleSNomeromVoprosa = document.getElementById("question-number");
const poleSTekstomVoprosa = document.getElementById("question-text");

// Наши 4 кнопки для ответов
const knopka0 = document.getElementById("btn0");
const knopka1 = document.getElementById("btn1");
const knopka2 = document.getElementById("btn2");
const knopka3 = document.getElementById("btn3");
// Сложим все кнопки в один массив, чтобы с ними было удобно работать
const vseKnopki = [knopka0, knopka1, knopka2, knopka3];

// Элемент для надписи "Правильно" или "Неправильно"
const poleDlyaOtzyva = document.getElementById("feedback-text");

// Элементы для экрана с результатами
const ekranQuiz = document.getElementById("quiz-area");
const ekranRezultatov = document.getElementById("results-area");
const poleSoSchetom = document.getElementById("score-text");
const knopkaRestart = document.getElementById("restart-button");

// --- ФУНКЦИИ (КОМАНДЫ) ---

// Эта команда запускает викторину
function nachatVictorinu() {
    nomerTekushegoVoprosa = 0;
    schet = 0;
    ekranRezultatov.classList.add("hidden"); // Прячем экран с результатами
    ekranQuiz.classList.remove("hidden"); // Показываем экран с викториной
    pokazatVopros();
}

// Эта команда показывает на экране новый вопрос и ответы
function pokazatVopros() {
    // Показываем номер и текст вопроса
    poleSNomeromVoprosa.textContent = `Вопрос ${nomerTekushegoVoprosa + 1}`;
    poleSTekstomVoprosa.textContent = voprosy[nomerTekushegoVoprosa];
    
    // Берём варианты ответов для текущего вопроса
    const tekushieVarianty = variantyOtvetov[nomerTekushegoVoprosa];

    // Проходим по каждой из 4-х кнопок
    for (let i = 0; i < vseKnopki.length; i++) {
        const knopka = vseKnopki[i];
        const variantOtveta = tekushieVarianty[i];

        if (variantOtveta) {
            // Если вариант ответа для этой кнопки есть...
            knopka.textContent = variantOtveta; // ...пишем его на кнопке
            knopka.classList.remove("hidden"); // ...показываем кнопку
            knopka.disabled = false; // ...делаем её нажимаемой
            knopka.className = ""; // ...убираем зелёный/красный цвет
            
            // Говорим кнопке, что делать при нажатии
            knopka.onclick = function() {
                proveritOtvet(variantOtveta, knopka);
            };
        } else {
            // Если варианта ответа нет (как в последнем вопросе), прячем кнопку
            knopka.classList.add("hidden");
        }
    }
}

// Эта команда проверяет, правильный ли ответ нажал игрок
function proveritOtvet(vybrannyiOtvet, nazhatayaKnopka) {
    // Узнаём, какой ответ должен быть правильным для этого вопроса
    const pravilnyi = pravilnyeOtvety[nomerTekushegoVoprosa];
    
    // Делаем все кнопки неактивными, чтобы нельзя было нажать дважды
    for (let i = 0; i < vseKnopki.length; i++) {
        vseKnopki[i].disabled = true;
    }

    if (vybrannyiOtvet === pravilnyi) {
        // Если ответ правильный
        schet = schet + 1; // Увеличиваем счёт
        nazhatayaKnopka.classList.add("correct"); // Красим кнопку в зелёный
        poleDlyaOtzyva.textContent = "Правильно! :)";
    } else {
        // Если ответ неправильный
        nazhatayaKnopka.classList.add("incorrect"); // Красим кнопку в красный
        poleDlyaOtzyva.textContent = "Неправильно :(";
    }

    // Ждём 1.5 секунды, а потом переходим к следующему вопросу
    setTimeout(function() {
        nomerTekushegoVoprosa = nomerTekushegoVoprosa + 1; // Переходим к следующему вопросу

        if (nomerTekushegoVoprosa < voprosy.length) {
            // Если вопросы ещё есть, показываем следующий
            pokazatVopros();
        } else {
            // Если вопросы закончились, показываем результат
            pokazatRezultat();
        }
    }, 1500); // 1500 миллисекунд = 1.5 секунды
}

// Эта команда показывает финальный результат
function pokazatRezultat() {
    ekranQuiz.classList.add("hidden"); // Прячем викторину
    ekranRezultatov.classList.remove("hidden"); // Показываем экран с результатами
    poleSoSchetom.textContent = `Твой результат: ${schet} из ${voprosy.length}`;
}

// Назначаем команду для кнопки "Попробовать снова"
knopkaRestart.onclick = nachatVictorinu;


// --- ЗАПУСК ИГРЫ ---
// Вызываем самую первую команду, чтобы всё началось!
nachatVictorinu();
