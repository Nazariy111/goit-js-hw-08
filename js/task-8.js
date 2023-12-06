import images from "./images.js";

const body = document.querySelector("body");
const listMarkup = '<ul class="gallery"></ul>';
body.insertAdjacentHTML("afterbegin", listMarkup);

const gallery = document.querySelector(".gallery");

const galleryMarkup = images
    .map((image) => `
    <li class="gallery-item">
    <a class="gallery-link" href="${image.original}">
    <img
        class="gallery-image"
        src="${image.preview}"
        data-source="${image.original}"
        alt="${image.description}"
    />
    </a>
    </li>`)
    .join("");

gallery.innerHTML = galleryMarkup;

gallery.addEventListener("click", event => {
    event.preventDefault();
    const selectedImage = event.target.dataset.source;
    console.log(selectedImage);

    if (selectedImage) {
        const modal = basicLightbox.create(`
        <div class="modal">
            <img src="${selectedImage}" width="1112" height="640">
        </div>`,
            {
                closable: false,
                onShow: (modal) => document.addEventListener("keydown", isEscapePressed),
                onClose: (modal) => document.removeEventListener("keydown", isEscapePressed)
            }
        );
        
        modal.show();

        function isEscapePressed({ code }) {
            if (code === "Escape") {
                modal.close();
            };
        };
    };
});






