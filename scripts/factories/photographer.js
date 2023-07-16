/** pattern factory */
function photographerFactory(data) { /* eslint-disable-line no-unused-vars */
    const { name, city, country, tagline, price, portrait, id } = data;

    const picture = `assets/photographers/${portrait}`;

    // card constructor
    function getUserCardDOM(cptr) {

        const article = document.createElement("article");
        const link = document.createElement("a");
        link.setAttribute("title", name);
        link.setAttribute("tabindex", cptr);
        link.setAttribute("href", "photographer.html?id=" + id);
        // link.setAttribute("role", "navigation");
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", "photographe " + name);
        const h2 = document.createElement("h2");
        h2.textContent = name;
        const p1 = document.createElement("p");
        p1.textContent = city + ", " + country;
        p1.className = "red";
        p1.setAttribute("tabindex", cptr + 1);
        const p2 = document.createElement("p");
        p2.textContent = tagline;
        p2.setAttribute("tabindex", cptr + 2);
        const p3 = document.createElement("p");
        p3.setAttribute("tabindex", cptr + 3);
        p3.className = "gray";
        const textPrix = document.createElement("span");
        textPrix.textContent = price + "€/jour";
        textPrix.setAttribute("aria-hidden", "true");
        const textAria = document.createElement("div");
        textAria.textContent = price + "€ par jour";
        textAria.setAttribute("class", "sr-only");
        p3.appendChild(textPrix);
        p3.appendChild(textAria);
        article.appendChild(link);
        link.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(p3);
        return (article);
    }

    // header constructor
    function getPhotographerDataDOM() {

        const header = document.createElement("div");

        const container = document.createElement("div");
        const h1 = document.createElement("h1");
        h1.textContent = name;
        h1.setAttribute("tabindex", "2");

        const h2 = document.createElement("h2");
        h2.textContent = city + ", " + country;
        h2.className = "red";
        h2.setAttribute("tabindex", "3");
        const p2 = document.createElement("p");
        p2.textContent = tagline;
        p2.setAttribute("tabindex", "4");

        const btn = document.createElement("button");
        btn.setAttribute("class", "contact_button");
        btn.setAttribute("type", "button");
        btn.setAttribute("onclick", "displayModal()");
        btn.textContent = "Contactez-moi";

        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);

        container.appendChild(h1);
        container.appendChild(h2);
        container.appendChild(p2);
        header.appendChild(container);
        header.appendChild(btn);
        header.appendChild(img);

        return (header);
    }

    return { name, picture, getUserCardDOM, getPhotographerDataDOM };
}