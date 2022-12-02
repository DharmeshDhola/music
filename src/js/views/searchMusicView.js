import MusicView from "./musicView";
import icons from "url:../../img/icons.svg";

class SearchMusicView extends MusicView {
  _parentEl = document.querySelector(".results");

  _generateMarkup() {
    return this._data.map(this._getGenerateMarkup).join("");
  }

  _getGenerateMarkup(data) {
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
  }
}

export default new SearchMusicView();
