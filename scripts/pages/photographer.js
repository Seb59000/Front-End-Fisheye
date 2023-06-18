/**
 * Récupération de l'id du photographe depuis l'url
 */
function getPhotographerId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')

    return id;
}

/**
 * Récupération des données du photographe depuis le fichier JSON
 */
async function getPhotographerData(idPhotographer) {
    const reponse = await fetch("data/photographers.json");
    const photographers = await reponse.json();

    const dataPhotographer = photographers.photographers.filter(photographers => photographers.id == idPhotographer);
    return dataPhotographer[0];
}

/** 
 * Affichage des données du photographe
*/
async function displayData(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");

    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getPhotographerDataDOM();
    photographerHeader.appendChild(userCardDOM);

};

/**
 * Récupère les données du photographe
 */
async function init() {
    const id = getPhotographerId();
    const data = await getPhotographerData(id);
    displayData(data);
    // const photos = await getPhotographerPhotos(id);
    // displayPhotos(photos);
};

init();

