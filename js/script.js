// const API_KEY = "vTDACgPp81yauJry9DptfHJ2lvptJ7pGnZQpNfjBbq87aba96boFu6mH";

// const imageContainer = document.getElementById("image-container");
// const secondaryImageContainer = document.getElementById("secondary-image-container");

// async function loadImages(query, container) {
//   try {
//     const response = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
//       headers: {
//         Authorization: API_KEY,
//       },
//     });
//     const data = await response.json();
//     const images = data.photos
//       .map(
//         photo => `
//       <div class="col-md-4">
//         <div class="card">
//           <img src="${photo.src.medium}" class="card-img-top" alt="${photo.photographer}">
//           <div class="card-body">
//             <h5 class="card-title">${photo.photographer}</h5>
//           </div>
//         </div>
//       </div>
//     `
//       )
//       .join("");
//     container.innerHTML = images;
//   } catch (error) {
//     console.error(error);
//   }
// }

// loadImages("dog", imageContainer);
// loadImages("montains", secondaryImageContainer);

// definiamo le costanti per le URL delle API
const PRIMARY_API_URL = "https://api.pexels.com/v1/search?query=dog";
const SECONDARY_API_URL = "https://api.pexels.com/v1/search?query=montains";

// selezioniamo gli elementi del DOM che vogliamo manipolare
const loadImagesBtn = document.querySelector("#load-images-btn");
const loadSecondaryImagesBtn = document.querySelector("#load-secondary-images-btn");
const imageContainer = document.querySelector("#image-container");
const secondaryImageContainer = document.querySelector("#secondary-image-container");

// funzione per caricare le immagini dalla API e mostrarle nel contenitore appropriato
function loadImages(apiUrl, container) {
  // impostiamo le opzioni della richiesta HTTP
  const options = {
    method: "GET",
    headers: {
      Authorization: "vTDACgPp81yauJry9DptfHJ2lvptJ7pGnZQpNfjBbq87aba96boFu6mH", // sostituire con la tua API key
    },
  };

  // facciamo la richiesta HTTP alla API
  fetch(apiUrl, options)
    .then(response => response.json())
    .then(data => {
      // iteriamo sui risultati della ricerca e creiamo un elemento HTML per ciascuna immagine
      data.photos.forEach(photo => {
        const card = document.createElement("div");
        card.classList.add("col-md-4");
        card.innerHTML = `
          <div class="card mb-4 shadow-sm">
            <img src="${photo.src.medium}" class="bd-placeholder-img card-img-top">
            <div class="card-body">
              <h5 class="card-title">${photo.photographer}</h5>
              <p class="card-text">${photo.url}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small class="text-muted">${photo.width}x${photo.height}</small>
              </div>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => console.error(error));
}

// quando viene premuto il bottone "Load Images", carichiamo le immagini primarie
loadImagesBtn.addEventListener("click", () => {
  loadImages(PRIMARY_API_URL, imageContainer);
});

// quando viene premuto il bottone "Load Secondary Images", carichiamo le immagini secondarie
loadSecondaryImagesBtn.addEventListener("click", () => {
  loadImages(SECONDARY_API_URL, secondaryImageContainer);
});
