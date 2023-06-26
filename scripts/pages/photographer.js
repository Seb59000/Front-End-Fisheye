let photographerName = "";
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
    const photographers = await getJSON();

    const dataPhotographer = photographers.photographers.filter(photographers => photographers.id == idPhotographer);

    photographerName = dataPhotographer[0].name;

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
    const photographerNameElt = document.getElementById("photographer-name");
    photographerNameElt.textContent = photographer.name;
};

/**
 * Récupération des photos du photographe depuis le fichier JSON
 */
async function getPhotographerPhotos(id) {
    const photographers = await getJSON();

    const photos = photographers.media.filter(media => media.photographerId == id);
    return photos;
}

/** 
 * Affichage des photos du photographe
*/
function displayPhotos(photos) {
    const listPhotos = document.querySelector(".photos-list");
    listPhotos.innerHTML = '';

    photos.forEach((photo) => {
        const photosModel = mediaFactory(photo, photographerName);
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
 * réordonne les médias
 */
async function OrderMedias() {
    const tri = document.getElementById("tri").value;
    switch (tri) {
        case "date":
            const photosOrderedByDate = await OrderByDate();
            displayPhotos(photosOrderedByDate, photographerName);
            break;
        case "titre":
            const photosOrderByTitle = await OrderByTitle();
            displayPhotos(photosOrderByTitle, photographerName);
            break;
        case "popularite":
            const photosOrderByLikes = await OrderByLikes();
            displayPhotos(photosOrderByLikes, photographerName);
            break;
        default:
            break;
    }
}

/**
 * réordonne les médias par titre
 */
async function OrderByTitle() {
    const photographers = await getJSON();

    const photos = photographers.media.filter(media => media.photographerId == getPhotographerId());
    const photoOrdered = photos.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    });
    return photoOrdered;
}

/**
 * réordonne les médias par date
 */
async function OrderByDate() {
    const photographers = await getJSON();

    const photos = photographers.media.filter(media => media.photographerId == getPhotographerId());
    const photoOrdered = photos.sort(function (a, b) {
        return a.date - b.date;
    });
    return photoOrdered;
}

/**
 * recupère les données du fichier JSON
 */
async function getJSON() {
    const reponse = await fetch("data/photographers.json");
    const photographers = await reponse.json();
    return photographers;
}

/**
 * réordonne les médias par likes
 */
async function OrderByLikes() {
    const photographers = await getJSON();

    const photos = photographers.media.filter(media => media.photographerId == getPhotographerId());
    const photoOrdered = photos.sort(function (a, b) {
        return b.likes - a.likes;
    });
    return photoOrdered;
}

/**
 * Récupère les données du photographe
 */
async function init() {
    const id = getPhotographerId();

    const data = await getPhotographerInfos(id);
    displayInfos(data);

    const photos = await getPhotographerPhotos(id);
    displayPhotos(photos, photographerName);

    displayPrice(data.price);
    displayLikesTotal(await calculNbLikes(photos));
};

init();

function ChangeLikes() {
    // Charger le fichier JSON
    fetch('example.json')
        .then(response => response.json())
        .then(data => {
            // Modifier les données JSON
            data.name = 'John Doe';
            data.age = 30;

            // Convertir les données modifiées en chaîne JSON
            const jsonString = JSON.stringify(data);

            // Écrire les données modifiées dans le fichier JSON
            fs.writeFile('example.json', jsonString, err => {
                if (err) {
                    console.log('Error writing file', err);
                } else {
                    console.log('Successfully wrote file');
                }
            });
        })
        .catch(err => {
            console.error('Error fetching data', err);
        });
}

