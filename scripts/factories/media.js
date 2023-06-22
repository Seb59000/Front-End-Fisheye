/** pattern factory */
function mediaFactory(data, name) {
    const { photographerId, title, image, video, likes } = data;

    // liste photos constructor
    function getPhotosDOM() {
        const article = document.createElement('article');
        const linkPhotoBox = document.createElement('a');
        linkPhotoBox.setAttribute('href', "photographer.html?id=" + photographerId);
        linkPhotoBox.setAttribute('role', "navigation");

        let img = document.createElement('img');
        img.setAttribute('alt', name);

        if (image === undefined) {
            let picture = `assets/photos/${name}/${video}`;
            img = document.createElement('video');
            img.setAttribute("src", picture);
            img.setAttribute("control", true);
            img.setAttribute('alt', name);
            img.controls = true;
        } else {
            let picture = `assets/photos/${name}/${image}`;
            img.setAttribute("src", picture);
        }

        const div = document.createElement('div');
        div.className = "red line marginV";

        const p = document.createElement('p');
        p.textContent = title;

        const div2 = document.createElement('div');
        div2.className = "line";

        const p2 = document.createElement('p');
        p2.textContent = likes;

        const linkLikes = document.createElement('a');
        linkLikes.className = "red fa-solid fa-heart";
        linkLikes.setAttribute('href', "photographer.html?id=" + photographerId);

        linkPhotoBox.appendChild(img);
        article.appendChild(linkPhotoBox);
        article.appendChild(div);
        div.appendChild(p);
        div.appendChild(div2);
        div2.appendChild(p2);
        div2.appendChild(linkLikes);

        return (article);
    }

    return { getPhotosDOM }
}