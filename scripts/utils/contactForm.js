/* bool verif inputs*/
let firstValid = false;
let lastValid = false;
let emailValid = false;
let messageValid = false;

// DOM Elements
const nom = document.createElement('input');
const prenom = document.createElement('input');
const email = document.createElement('input');
const message = document.createElement('textarea');
const btnSubmit = document.createElement('button');
const erreurNom = document.createElement('div');
const erreurPrenom = document.createElement('div');
const erreurEmail = document.createElement('div');
const erreurMessage = document.createElement('div');

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    // focus sur modale
    nom.focus();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

/**
 * ajout des labels et modif inputs
 *  */
function createElements() {
    const form = document.getElementById("contact-form");

    nom.setAttribute('id', 'nom')
    prenom.setAttribute('id', 'prenom')
    email.setAttribute('id', 'email')
    message.setAttribute('id', 'message')

    const labelNom = document.createElement('label');
    labelNom.setAttribute('for', 'nom');
    labelNom.textContent = "Nom";
    const labelPrenom = document.createElement('label');
    labelPrenom.setAttribute('for', 'prenom');
    labelPrenom.textContent = "Prénom";
    const labelEmail = document.createElement('label');
    labelEmail.setAttribute('for', 'email');
    labelEmail.textContent = "Email";
    const labelMessage = document.createElement('label');
    labelMessage.setAttribute('for', 'message');
    labelMessage.textContent = "Votre message";

    erreurNom.setAttribute('id', 'erreur-nom');
    erreurNom.setAttribute('class', 'white');
    erreurPrenom.setAttribute('id', 'erreur-prenom');
    erreurPrenom.setAttribute('class', 'white');
    erreurEmail.setAttribute('id', 'erreur-email');
    erreurEmail.setAttribute('class', 'white');
    erreurMessage.setAttribute('id', 'erreur-message');
    erreurMessage.setAttribute('class', 'white');

    btnSubmit.setAttribute('type', 'button');
    btnSubmit.setAttribute('class', 'contact_button');
    btnSubmit.textContent = "Envoyer";

    form.appendChild(labelNom);
    form.appendChild(nom);
    form.appendChild(erreurNom);
    form.appendChild(labelPrenom);
    form.appendChild(prenom);
    form.appendChild(erreurPrenom);
    form.appendChild(labelEmail);
    form.appendChild(email);
    form.appendChild(erreurEmail);
    form.appendChild(labelMessage);
    form.appendChild(message);
    form.appendChild(erreurMessage);
    form.appendChild(btnSubmit);
}

/** 
 * verif taille nom
*/
function VeriFirstNameLength(event) {
    // recup ce qui est tapé
    const input = event.target.value;

    // verif qu'il y a lettres au moins 2 lettres
    if (input.length < 2) {
        firstValid = false;
        const errorMessage = document.getElementById("erreur-nom");
        errorMessage.innerHTML = "Veuillez rentrer au moins deux lettres";
    }
}

/** 
 * verif nom
*/
function VeriFirstName(event) {
    // recup ce qui est tapé
    const input = event.target.value;

    // verif qu'il n'y a que des lettres
    var regex = new RegExp("^[a-zA-Z é]+$");
    if (regex.test(input)) {
        firstValid = true;
        const errorMessage = document.getElementById("erreur-nom");
        errorMessage.innerHTML = "";
    } else {
        firstValid = false;
        const errorMessage = document.getElementById("erreur-nom");
        errorMessage.innerHTML = "Veuillez ne rentrer que des lettres";
    }
}

/** 
 * verif taille prenom
*/
function VeriLasttNameLength(event) {
    // recup ce qui est tapé
    const input = event.target.value;

    // verif qu'il y a lettres au moins 2 lettres
    if (input.length < 2) {
        firstValid = false;
        const errorMessage = document.getElementById("erreur-prenom");
        errorMessage.innerHTML = "Veuillez rentrer au moins deux lettres";
    }
}

/** 
 * verif prenom
*/
function VerifLastName(event) {
    // recup ce qui est tapé
    const input = event.target.value;

    // verif qu'il n'y a que des lettres
    var regex = new RegExp("^[a-zA-Z é]+$");
    if (regex.test(input)) {
        lastValid = true;
        const errorMessage = document.getElementById("erreur-prenom");
        errorMessage.innerHTML = "";
    } else {
        lastValid = false;
        const errorMessage = document.getElementById("erreur-prenom");
        errorMessage.innerHTML = "Veuillez ne rentrer que des lettres";
    }
}

/** 
 * verif taille email
*/
function VerifEmail(event) {
    // recup ce qui est tapé
    const input = event.target.value;

    // verif mail regex
    var regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.{1}[a-zA-Z0-9]+$");
    if (regex.test(input)) {
        emailValid = true;
        const errorMessage = document.getElementById("erreur-email");
        errorMessage.innerHTML = "";
    } else {
        emailValid = false;
        const errorMessage = document.getElementById("erreur-email");
        errorMessage.innerHTML = "Veuillez entrer une adresse valide";
    }
}

/** 
 * verif taille message
*/
function VerifMessageLength(event) {
    // recup ce qui est tapé
    const input = event.target.value;

    // verif qu'il y a lettres au moins 2 lettres
    if (input.length < 2) {
        messageValid = false;
        const errorMessage = document.getElementById("erreur-message");
        errorMessage.innerHTML = "Veuillez rentrer au moins deux lettres";
    }
}

/**
 * validation du questionnaire
 */
function Validate() {
    /* messages d'erreur */
    // first name renseigné
    ErrorMessage(firstValid, "erreur-nom", "Veuillez entrer un prénom valide");

    // last name renseigné
    ErrorMessage(lastValid, "erreur-prenom", "Veuillez entrer un nom valide");

    // email renseigné
    ErrorMessage(emailValid, "erreur-email", "Veuillez entrer un email valide");

    // message renseigné
    ErrorMessage(emailValid, "erreur-message", "Veuillez entrer un message valide");

    if (firstValid && lastValid && emailValid && messageValid) {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";

        console.log(" nom: " + nom.value + " prenom: " + prenom.value + " email: " + email.value + " message: " + message.value);
    }
}
/**
 * creation du message d'erreur
 */
function ErrorMessage(item, idHtml, message) {
    // si accceptées
    if (item) {
        const errorMessage = document.getElementById(idHtml);
        errorMessage.innerHTML = "";
    } else {
        // si pas accceptées
        const errorMessage = document.getElementById(idHtml);
        errorMessage.innerHTML = message;
    }
}

/**
 * verif des inputs
 */
function verifInputs() {
    // verif input first name
    nom.addEventListener("input", VeriFirstName);
    // verif input first name length
    nom.addEventListener("change", VeriFirstNameLength);
    // verif input last name
    prenom.addEventListener("input", VerifLastName);
    // verif input last name length
    prenom.addEventListener("change", VeriLasttNameLength);
    // verif input email 
    email.addEventListener("change", VerifEmail);
    // verif input message 
    message.addEventListener("change", VerifMessageLength);

    // submit button
    btnSubmit.addEventListener("click", Validate);
}

function init() {
    createElements();
    verifInputs();
}

init();


