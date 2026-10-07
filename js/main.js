"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Jeanette Söderman
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {

    errors = [];

    // Kontrollera formulärets obligatoriska fält
    if (fullnameInput.value === "") {
        
        errors.push("Ett namn måste anges"); 
    }

    if (emailInput.value === "") {

        errors.push("En emailadress måste anges");
    }

    if (phoneInput.value === "") {

        errors.push("Ett telefonnummer måste anges");
    }

    // Visa eventuella felmeddelanden

    displayErrors();

    // Returnera resultatet (true eller false) av valideringen

    return errors.length === 0;
}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.innerHTML = "";

    // Skriv ut aktuella felmeddelanden till DOM
    errors.forEach(error => {
        const liEl = document.createElement("li");
        const textNode = document.createTextNode(error);

        liEl.appendChild(textNode);
        errorList.appendChild(liEl);

    });
}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret

    const fullname = fullnameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const font = fontSelect.value;

    // Uppdatera studentkortet

    previewFullname.textContent = fullname;
    previewEmail.textContent = email;
    previewPhone.textContent = phone;
    previewFullname.style.fontFamily = font;
    previewEmail.style.fontFamily = font;
    previewPhone.style.fontFamily = font;

    // Lägg till studentkortet i historiken

    const studentCard = {
        name: fullname,
        email: email,
        phone: phone,
        font: font
    };

    history.push(studentCard);


    // Spara och uppdatera historiken

    saveHistory();
    renderHistory();
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage

    localStorage.setItem("history", JSON.stringify(history));
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    const savedHistory = localStorage.getItem("history");

    // Uppdatera history

    if (savedHistory) {
        history = JSON.parse(savedHistory);
    }
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik

    historySection.innerHTML = "";

    // Skriv ut innehållet i history till DOM

    for (let i = history.length - 1; i >= 0; i--) {
        const studentCard = history[i];
        const historyItem = document.createElement("div");

        historyItem.style.fontFamily = studentCard.font;

        const nameElement = document.createElement("p");
        nameElement.textContent = studentCard.name;
        historyItem.appendChild(nameElement);

        const emailElement = document.createElement("p");
        emailElement.textContent = studentCard.email;
        historyItem.appendChild(emailElement);

        const phoneElement = document.createElement("p");
        phoneElement.textContent = studentCard.phone;
        historyItem.appendChild(phoneElement);

        historySection.appendChild(historyItem);
    }
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort
    form.reset();

    previewFullname.textContent = "Namn";
    previewEmail.textContent = "E-post";
    previewPhone.textContent = "Telefon";

    previewFullname.style.fontFamily = "";
    previewEmail.style.fontFamily = "";
    previewPhone.style.fontFamily = "";

    // Rensa eventuella felmeddelanden

    errors = [];
    displayErrors();
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik
    localStorage.removeItem("history");

    // Uppdatera history och visningen på sidan
    history = [];
    renderHistory();


}


// Eventlyssnare

// När formuläret skickas:

form.addEventListener("submit", function(event) {
    event.preventDefault();

// - validera inmatningen
    if (validateForm()) {
        
// - skapa studentkort om valideringen lyckas
        createStudentCard();
    }
});


// När användaren klickar på "Rensa"
clearButton.addEventListener("click", function() {
    clearForm();

});



// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", function() {
    deleteHistory();
});


// När sidan laddas:
// - läs in och visa eventuell tidigare historik

loadHistory();
renderHistory();