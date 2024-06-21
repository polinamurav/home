$(document).ready(function () {
    new WOW({
        animateClass: 'animate__animated',
    }).init();

    $('.carousel-slide').slick({
        centerMode: true,
        slidesToScroll: 1,
        centerPadding: '0px',
        slidesToShow: 3,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '0',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 481,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '0',
                    slidesToShow: 1 // Отображение 1 слайда для экранов до 480px
                }
            }
        ]
    });


    let nameInput = $('#inputName');
    let phoneInput = $('#inputPhone');


//КНОПКА МЕНЮ
    let burger = document.getElementById('burger');
    burger.onclick = function () {
        document.getElementById('menu').style.display = 'flex';
    }
    document.getElementById('close-menu').onclick = function () {
        document.getElementById('menu').style.display = 'none';
    };


//КНОПКА ЗАПИСАТЬСЯ ЭКСКУРСИЯ
    document.getElementById('buttonExcursion').onclick = function () {
        document.getElementById('popup').style.display = 'flex';
    }
    document.getElementsByClassName('popup-close')[0].onclick = function () {
        document.getElementById('popup').style.display = 'none';
    };


//КНОПКА ПОСМОТРЕТЬ ЕЩЕ 3 ПРОЕКТА
    let watchMore = document.getElementById('watch-more');
    watchMore.onclick = function () {
        let projectMore = document.getElementsByClassName('project-more-open');
        for (let i = 0; i < projectMore.length; i++) {
            projectMore[i].style.display = 'flex';
        }
        watchMore.style.display = 'none';
    }


//МАСКА ТЕЛЕФОН-------------
    let phoneInputs = $('.inputPhone');
    phoneInputs.inputmask({"mask": "+ 375 (99) 999-99-99"});


//КАРТИНКИ ПРИБЛИЖЕНИЕ
    $('.project-images').magnificPopup({
        delegate: 'a', // Выбор делегата изображения
        type: 'image',
        gallery: {
            enabled: true // Включить галерею
        }
        // другие опции
    });

//Нажатие кнопок и к консультации все
    let call = document.getElementsByClassName('call')[0];
    let buttonLearnMore = document.getElementById('ButtonLearnMore');
    let buttonConsultation = document.getElementsByClassName('buttonConsultation');
    let consultationBlock = document.getElementsByClassName('consultation')[0];

    function scrollToConsultation() {
        consultationBlock.scrollIntoView({behavior: 'smooth'});
    }

    call.onclick = scrollToConsultation;
    for (let i = 0; i < buttonConsultation.length; i++) {
        buttonConsultation[i].onclick = scrollToConsultation;
    }
    buttonLearnMore.onclick = scrollToConsultation;


//При изменении значения чекбокса
    let checkboxes = document.getElementsByClassName('input-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].onclick = (e) => {
            let svg = checkboxes[i].nextElementSibling.querySelector('svg');
            if (checkboxes[i].checked) {
                svg.style.display = 'flex';
            } else {
                svg.style.display = 'none';
            }
        }
    }

//Запрет на ввод цифр в ИМЕНИ
    let inputNameAll = $('.inputName');
    for (let i = 0; i < inputNameAll.length; i++) {
        inputNameAll.eq(i).on('keydown', function (e) {
            let number = parseInt(e.key);
            if (!isNaN(number)) {
                return false; // Отменяем ввод цифр
            }
        });
    }


//ФОРМА--------
    let loader = $('.loader-main').eq(0);
    let buttonNeedConsultation = $('#buttonNeedConsultation');
    let checkboxInput = $('#checkboxInput');
    buttonNeedConsultation.click(function () {
        // let hasError = false;
        loader.css('display', 'flex');

        $('.error-input').hide();

        let hasError = errorValidation(nameInput, phoneInput, checkboxInput);


        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {name: nameInput.val(), phone: phoneInput.val()}
            })
                .done(function (message) {
                    loader.hide();
                    if (message.success) {
                        nameInput.css('display', 'none');
                        phoneInput.css('display', 'none');
                        buttonNeedConsultation.css('display', 'none');
                        $('.agree').eq(0).css('display', 'none');
                        $('.form-success').eq(0).css('display', 'block');
                    } else {
                        alert("Произошла ошибка, позвоните нам самостоятельно");
                        nameInput.val('');
                        phoneInput.val('');
                    }
                });
        } else {
            loader.hide();
        }

    });


    function errorValidation(nameInput, phoneInput, checkbox) {
        let hasError = false;
        if (!nameInput.val()) {
            nameInput.next().show();
            nameInput.css('border-color', 'red');
            hasError = true;
        } else {
            nameInput.css('border-color', 'white');
        }

        if (!phoneInput.val()) {
            phoneInput.next().show();
            phoneInput.css('border-color', 'red');
            hasError = true;
        } else {
            phoneInput.css('border-color', 'white');
        }
        if (!checkbox.is(':checked')) {
            checkbox.next().css('border-color', 'red');
            checkbox.next().next().css('color', 'red');
            hasError = true;
        } else {
            checkbox.next().css('border-color', 'white');
            checkbox.next().next().css('color', 'white');
        }

        return hasError;
    }

//сброс формы попап
    $('#buttonExcursion').click(function () {
        let checkbox = $('#checkboxInputPopUp');
        $('#popup-form')[0].reset();
        $('.error-input').hide();
        $('#nameInputPopUp').css('display', 'block').css('border-color', 'white');
        $('#phoneInputPopUp').css('display', 'block').css('border-color', 'white');
        $('#buttonPopUp').css('display', 'block');
        $('.agree').eq(1).css('display', 'block');
        $('.popup-text').eq(0).css('display', 'block');
        checkbox.prop('checked', false); //сбросить чекбокс
        checkbox.next().css('border-color', 'white');
        checkbox.next().next().css('color', 'white');
        $('#checkboxPopup svg').css('display', 'none'); // Скрываем SVG галочек
        $('.popup-success').eq(0).css('display', 'none');
    });

    let inputNamePopUp = $('#nameInputPopUp');
    let inputPhonePopUp = $('#phoneInputPopUp');
    let buttonPopUp = $('#buttonPopUp');
    let checkboxPopUp = $('#checkboxInputPopUp');
    buttonPopUp.click(function () {
        loader.css('display', 'flex');
        $('.error-input').hide();

        inputNamePopUp.css('display', 'block');
        inputPhonePopUp.css('display', 'block');
        buttonPopUp.css('display', 'block');
        $('.agree').eq(1).css('display', 'block');
        $('.popup-text').eq(0).css('display', 'block');
        let hasError = errorValidation(inputNamePopUp, inputPhonePopUp, checkboxPopUp);

        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {name: inputNamePopUp.val(), phone: inputPhonePopUp.val()}
            })
                .done(function (message) {
                    loader.hide();
                    if (message.success) {
                        inputNamePopUp.css('display', 'none');
                        inputPhonePopUp.css('display', 'none');
                        buttonPopUp.css('display', 'none');
                        $('.agree').eq(1).css('display', 'none');
                        $('.popup-text').eq(0).css('display', 'none');
                        $('.popup-success').eq(0).css('display', 'block');
                    } else {
                        alert("Произошла ошибка, попробуйте еще раз позже");
                        inputNamePopUp.val('');
                        inputPhonePopUp.val('');
                    }
                });
        } else {
            loader.hide();
        }

    });

    let circle = $('.technologies-info-circle');
    circle.click(function () {
        $('.technologies-info-adaptive').removeClass('show'); //скрыть все блоки

        $(this).parent().next('.technologies-info-adaptive').addClass('show'); //добавить класс
    })

});