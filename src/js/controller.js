import "core-js/stable";
import "regenerator-runtime/runtime";
import icons from "url:../img/icons.svg";
import lefticon from "../img/arrow-previous-left-icon.svg";
import righticon from "../img/arrow-next-right-icon.svg";
import playicon from "../img/play-svgrepo-com.svg";
import pause from "../img/music-player-pause-button-svgrepo-com.svg";
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
const viewSongs = document.querySelector(".recipe");

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
        imageMedium: data.album.cover_medium,
        preview: data.preview,
        imageXl: data.album.cover_xl,
        pictureMedium: data.artist.picture_medium,
      };
    });

    const markup = state.search.results
      .map((data) => {
        return `
          <li class="preview">
            <a class="preview__link preview__link--active" href="#${data.id}">
              <figure class="preview__fig">
                <img src="${data.imageMedium}" alt="${data.title}" />
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
    console.error(err);
  }
};

const clearField = function (parantEl) {
  parantEl.value = "";
};

const hello = function () {
  const id = +window.location.hash.slice(1);
  console.log(id);
  const data = state.search.results.find((data) => data.id === id);
  console.log(data);
  const html = `
  <figure class="recipe__fig">
    <img src="${data.imageXl}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div>
      <h1>Good Morning</h1>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes"
          >12:00 <span>AM</span></span
        >
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="play__track">
    <div class="play__track__btn">
      <img
        class="play__track__img"
        src="${lefticon}"
        alt=""
      />
      <img
        class="play__track__img"
        src="${pause}"
        alt=""
      />
      <img
        class="play__track__img"
        src="${righticon}"
        alt=""
      />
    </div>
  </div>

  <div class="play">
    <div class="play__album">
      <div class="play__imgbox">
        <img class="play__img" src="${data.pictureMedium}" alt="" width="200" />
      </div>
      <div class="play__info">
        <div class="play__artist">
          <h1 class="play__name">${data.name}</h1>
          <p class="play__title">Album by ${data.name}</p>
          <p class="play__discription">
            Want better recommendation? Pick some music you like.
          </p>
        </div>

        <a
          style="width: 150px"
          class="btn--small recipe__btn"
          href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
          target="_blank"
        >
          <span>Album</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    </div>
  </div>
  </div>
`;
  viewSongs.innerHTML = "";
  viewSongs.insertAdjacentHTML("afterbegin", html);
};

searchBtn.addEventListener("submit", function (e) {
  e.preventDefault();
  let searchQuery = document.querySelector(".search__field");
  loadSearchSong(searchQuery.value);
  clearField(searchQuery);
});

window.addEventListener("hashchange", hello);
