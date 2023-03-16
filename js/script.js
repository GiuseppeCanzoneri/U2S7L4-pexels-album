const BASE_URL = "http://api.pexels.com/v1/";
const PER_PAGE = 27;
const API_KEY = "vTDACgPp81yauJry9DptfHJ2lvptJ7pGnZQpNfjBbq87aba96boFu6mH";

const PRIMARY_QUERY = "friends";

const SECONDARY_QUERY = "amore";

window.onload = async () => {
  let inputSearch = document.getElementById("search-input");

  const loadPrimaryImg = document.getElementById("primaryLoad");

  const loadSecondaryImg = document.getElementById("secondaryLoad");

  const btnSearch = document.getElementById("search-btn");

  loadPrimaryImg.addEventListener("click", () => fetchData(PRIMARY_QUERY));

  loadSecondaryImg.addEventListener("click", () => fetchData(SECONDARY_QUERY));

  btnSearch.addEventListener("click", () => {
    const SEARCH_QUERY = inputSearch.value.trim();
    inputSearch.value = "";
    if (SEARCH_QUERY) {
      fetchData(SEARCH_QUERY);
    } else {
      alert("Please enter a search term");
    }
  });

  const fetchData = async parametro => {
    try {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${parametro}&per_page=${PER_PAGE}`, {
        headers: {
          Authorization: API_KEY,
        },
      });

      const images = await response.json();
      showImg(images);
    } catch (error) {
      console.log(error);
    }
  };

  function showImg(images) {
    if (images) {
      let row = document.querySelector(".album .container .row");
      row.innerHTML = "";
      console.log(images.photos);
      console.log(images.photos.lenght);
      for (let i = 0; i < images.photos.length; i++) {
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `    
      <div class="card mb-4 shadow-sm">
        <img src="${images.photos[i].src.tiny}" alt="Picture">
        <div class="card-body">
          <h5 class="card-title">Lorem Ipsum</h5>
          <p class="card-text">
            This is a wider card with supporting text below as a natural
            lead-in to additional content. This content is a little bit
            longer.
          </p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">
                View
              </button>
              <button type="button" class="btn btn-sm btn-outline-secondary" id="btnHide">
                Hide
              </button>
            </div>
            <small class="text-muted">${images.photos[i].id}</small>
          </div>
        </div>
      </div>
      `;

        const hideCard = col.querySelector("#btnHide");
        hideCard.onclick = () => {
          col.remove();
        };
        row.appendChild(col);
      }
    }
  }
};
