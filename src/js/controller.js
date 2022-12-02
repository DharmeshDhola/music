import * as model from "./model.js";
import searchMusicView from "./views/searchMusicView.js";
import songView from "./views/songView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

const searchBtn = document.querySelector(".search");

const controllerMusic = async function (query) {
  try {
    // Load Spinner
    searchMusicView.loadSpinner();

    // Load Song
    await model.loadMusic("sia");

    // Render Search Result
    searchMusicView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

const clearField = function (parantEl) {
  parantEl.value = "";
};

const controllerRenderMusic = function () {
  songView.render(model.state.search.results);
};

searchBtn.addEventListener("submit", function (e) {
  e.preventDefault();
  let searchQuery = document.querySelector(".search__field");
  controllerMusic(searchQuery.value);
  clearField(searchQuery);
});

window.addEventListener("hashchange", controllerRenderMusic);
