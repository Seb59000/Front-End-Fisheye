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
async function getPhotographerInfos(idPhotographer) {
    const reponse = await fetch("data/photographers.json");
    const photographers = await reponse.json();

    const dataPhotographer = photographers.photographers.filter(photographers => photographers.id == idPhotographer);
    return dataPhotographer[0];
}

/** 
 * Affichage des données du photographe
*/
async function displayInfos(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");

    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getPhotographerDataDOM();
    photographerHeader.appendChild(userCardDOM);

    // dans la modale
    const photographerName = document.getElementById("photographer-name");
    photographerName.textContent = photographer.name;
};

/**
 * Récupération des photos du photographe depuis le fichier JSON
 */
async function getPhotographerPhotos(id) {
    const reponse = await fetch("data/photographers.json");
    const photographers = await reponse.json();

    const photos = photographers.media.filter(media => media.photographerId == id);
    return photos;
}

/** 
 * Affichage des photos du photographe
*/
function displayPhotos(photos, name) {
    const listPhotos = document.querySelector(".photos-list");

    photos.forEach((photo) => {
        const photosModel = mediaFactory(photo, name);
        const photosDOM = photosModel.getPhotosDOM();
        listPhotos.appendChild(photosDOM);
    });
};


/** 
 * Affichage des prix du photographe
*/
function displayPrice(price) {
    const priceHtml = document.getElementById("price");
    priceHtml.textContent = price + "€ / jour";
};

/** 
 * Affichage des likes du photographe
*/
function displayLikesTotal(likesTotal) {
    const likesTotalHtml = document.getElementById("likesTotal");
    likesTotalHtml.textContent = likesTotal;
};

/** 
 * Calcul des likes du photographe
*/
async function calculNbLikes(photos) {
    let totLikes = 0;
    for (let index = 0; index < photos.length; index++) {
        totLikes += photos[index].likes;
    }
    return totLikes;
};

/**
 * Récupère les données du photographe
 */
async function init() {
    const id = getPhotographerId();

    const data = await getPhotographerInfos(id);
    displayInfos(data);

    const photos = await getPhotographerPhotos(id);
    displayPhotos(photos, data.name);

    displayPrice(data.price);
    displayLikesTotal(await calculNbLikes(photos));
};

init();

