/* ========================================
   PRODUCT GALLERY
======================================== */

const mainProductImage =
    document.getElementById("mainProductImage");

const thumbnails =
    document.querySelectorAll(".thumbnail");

const imageCounter =
    document.querySelector(".image-counter");


thumbnails.forEach((thumbnail, index) => {

    thumbnail.addEventListener("click", () => {

        const image =
            thumbnail.dataset.image;

        mainProductImage.style.opacity = "0";

        setTimeout(() => {

            mainProductImage.src = image;

            mainProductImage.style.opacity = "1";

        }, 150);


        thumbnails.forEach(item => {
            item.classList.remove("active");
        });

        thumbnail.classList.add("active");


        if (imageCounter) {

            const number =
                String(index + 1).padStart(2, "0");

            imageCounter.textContent =
                `${number} / 04`;

        }

    });

});


/* ========================================
   COLOR SELECTOR
======================================== */

const colorOptions =
    document.querySelectorAll(".color-option");

const selectedColor =
    document.getElementById("selectedColor");


colorOptions.forEach(option => {

    option.addEventListener("click", () => {

        colorOptions.forEach(item => {
            item.classList.remove("active");
        });

        option.classList.add("active");

        selectedColor.textContent =
            option.dataset.color;

    });

});


/* ========================================
   QUANTITY
======================================== */

const quantityMinus =
    document.getElementById("quantityMinus");

const quantityPlus =
    document.getElementById("quantityPlus");

const quantityValue =
    document.getElementById("quantityValue");


let quantity = 1;


if (quantityMinus && quantityPlus) {

    quantityMinus.addEventListener("click", () => {

        if (quantity > 1) {

            quantity--;

            quantityValue.textContent =
                quantity;

        }

    });


    quantityPlus.addEventListener("click", () => {

        if (quantity < 10) {

            quantity++;

            quantityValue.textContent =
                quantity;

        }

    });

}

/* ========================================
   REVIEWS SLIDER
======================================== */

const reviewsSlider =
    document.getElementById("reviewsSlider");

const reviewPrev =
    document.getElementById("reviewPrev");

const reviewNext =
    document.getElementById("reviewNext");

const reviewDots =
    document.querySelectorAll(".review-dot");

const reviewCards =
    document.querySelectorAll(".review-card");


let currentReview = 0;


function showReview(index) {

    if (!reviewsSlider || !reviewCards.length) {
        return;
    }


    if (index < 0) {
        index = reviewCards.length - 1;
    }


    if (index >= reviewCards.length) {
        index = 0;
    }


    currentReview = index;


    const cardWidth =
        reviewsSlider.clientWidth;


    reviewsSlider.scrollTo({
        left: cardWidth * currentReview,
        behavior: "smooth"
    });


    reviewDots.forEach((dot, dotIndex) => {

        dot.classList.toggle(
            "active",
            dotIndex === currentReview
        );

    });

}


if (reviewNext) {

    reviewNext.addEventListener("click", () => {

        showReview(currentReview + 1);

    });

}


if (reviewPrev) {

    reviewPrev.addEventListener("click", () => {

        showReview(currentReview - 1);

    });

}


reviewDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showReview(index);

    });

});

/* ========================================
   FAQ ACCORDION
======================================== */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");


    question.addEventListener("click", () => {

        const isActive =
            item.classList.contains("active");


        /* CLOSE ALL */

        faqItems.forEach(otherItem => {

            otherItem.classList.remove("active");

        });


        /* OPEN SELECTED */

        if (!isActive) {

            item.classList.add("active");

        }

    });

});

/* ========================================
   ORDER SUMMARY
======================================== */

const summaryQuantity =
    document.getElementById("summaryQuantity");

const summaryTotal =
    document.getElementById("summaryTotal");

const summaryColor =
    document.getElementById("summaryColor");

const summaryProductPrice =
    document.getElementById("summaryProductPrice");


const productPrice = 129;


function updateOrderSummary() {

    if (!summaryQuantity) {
        return;
    }


    summaryQuantity.textContent =
        quantity;


    summaryColor.textContent =
        selectedColor.textContent;


    const total =
        productPrice * quantity;


    summaryTotal.textContent =
        `$${total}`;


    summaryProductPrice.textContent =
        `$${total}`;

}


if (quantityPlus) {

    quantityPlus.addEventListener(
        "click",
        updateOrderSummary
    );

}


if (quantityMinus) {

    quantityMinus.addEventListener(
        "click",
        updateOrderSummary
    );

}


colorOptions.forEach(option => {

    option.addEventListener(
        "click",
        updateOrderSummary
    );

});


updateOrderSummary();


/* ========================================
   PAYMENT OPTIONS
======================================== */

const paymentOptions =
    document.querySelectorAll(".payment-option");


paymentOptions.forEach(option => {

    option.addEventListener("click", () => {

        paymentOptions.forEach(item => {

            item.classList.remove("active");

        });


        option.classList.add("active");


        const radio =
            option.querySelector("input");

        if (radio) {
            radio.checked = true;
        }

    });

});


/* ========================================
   ORDER SUBMIT
======================================== */

const submitOrder =
    document.getElementById("submitOrder");


if (submitOrder) {

    submitOrder.addEventListener("click", () => {

        const name =
            document.getElementById("customerName");

        const phone =
            document.getElementById("customerPhone");

        const email =
            document.getElementById("customerEmail");

        const city =
            document.getElementById("customerCity");

        const address =
            document.getElementById("customerAddress");


        if (
            !name.value.trim() ||
            !phone.value.trim() ||
            !email.value.trim() ||
            !city.value.trim() ||
            !address.value.trim()
        ) {

            alert(
                "Пожалуйста, заполните все обязательные поля."
            );

            return;

        }


        submitOrder.textContent =
            "ЗАКАЗ ОФОРМЛЕН ✓";


        submitOrder.disabled = true;


        setTimeout(() => {

            alert(
                `Спасибо, ${name.value}! Ваш заказ NOVA X1 принят.`
            );

        }, 300);

    });

}

/* ========================================
   ACTIVE NAVIGATION
======================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );

                });


                const activeLink =
                    document.querySelector(
                        `.nav-link[href="#${entry.target.id}"]`
                    );


                if (activeLink) {

                    activeLink.classList.add(
                        "active"
                    );

                }

            });

        },
        {
            threshold: 0.35
        }
    );


sections.forEach(section => {

    observer.observe(section);

});

/* ========================================
   LANGUAGE SYSTEM
======================================== */

const languageButtons =
    document.querySelectorAll(".language-btn");


function getTranslation(
    language,
    path
) {

    const keys = path.split(".");

    let value =
        translations[language];


    for (const key of keys) {

        if (
            value === undefined ||
            value === null
        ) {

            return null;

        }

        value = value[key];

    }


    return value;
}


function setLanguage(language) {

    if (!translations[language]) {
        return;
    }


    const elements =
        document.querySelectorAll(
            "[data-i18n]"
        );


    elements.forEach(element => {

        const key =
            element.dataset.i18n;


        const translation =
            getTranslation(
                language,
                key
            );


        if (
            translation === null ||
            translation === undefined
        ) {

            return;

        }


        element.textContent =
            translation;

    });


    languageButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.language === language
        );

    });


    document.documentElement.lang =
        language;


    localStorage.setItem(
        "novaLanguage",
        language
    );

}


/* ========================================
   LANGUAGE BUTTONS
======================================== */

languageButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const language =
                button.dataset.language;


            setLanguage(language);

        }
    );

});


/* ========================================
   LOAD SAVED LANGUAGE
======================================== */

const savedLanguage =
    localStorage.getItem(
        "novaLanguage"
    );


setLanguage(
    savedLanguage || "ru"
);

document.addEventListener("DOMContentLoaded", () => {

    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav");

    if (!burger || !nav) {
        console.warn("Burger menu elements not found");
        return;
    }

    burger.addEventListener("click", () => {

        burger.classList.toggle("active");
        nav.classList.toggle("active");

    });

    // Закрываем меню после нажатия на ссылку
    const navLinks = nav.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            burger.classList.remove("active");
            nav.classList.remove("active");

        });

    });

});