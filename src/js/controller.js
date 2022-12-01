import "core-js/stable";
import "regenerator-runtime/runtime";
import icons from "url:../img/icons.svg";
import { API_KEY } from "./config";
import { async } from "regenerator-runtime";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const state = {
  search: {
    query: "",
    results: [],
  },
};

const searchBtn = document.querySelector(".search");
const searchResult = document.querySelector(".results");

const loadSpinner = function (parantEl) {
  const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
  `;
  parantEl.innerHTML = "";
  parantEl.insertAdjacentHTML("afterbegin", markup);
};

const loadSearchSong = async function (query) {
  try {
    loadSpinner(searchResult);
    state.search.query = query;
    const options = {
      headers: {
        "X-RapidAPI-Key": `${API_KEY}`,
      },
    };

    const res = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`,
      options
    );

    const data = await res.json();

    if (data.error) throw new Error("Something want worng! please try again.");

    console.log(data);

    state.search.results = data.data.map((data) => {
      return {
        id: data.id,
        name: data.artist.name,
        title: data.album.title,
        image: data.album.cover_medium,
      };
    });

    const markup = state.search.results
      .map((data) => {
        return `
          <li class="preview">
            <a class="preview__link preview__link--active" href="#${data.id}">
              <figure class="preview__fig">
                <img src="${data.image}" alt="${data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${data.title}</h4>
                <p class="preview__publisher">${data.name}</p>
              </div>
            </a>
          </li>
      `;
      })
      .join("");

    searchResult.innerHTML = "";
    searchResult.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    console.log(err);
  }
};

const clearField = function (parantEl) {
  parantEl.value = "";
};

searchBtn.addEventListener("submit", function (e) {
  e.preventDefault();
  let searchQuery = document.querySelector(".search__field");
  loadSearchSong(searchQuery.value);
  clearField(searchQuery);
});
