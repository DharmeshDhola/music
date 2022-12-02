import MusicView from "./musicView";
import icons from "url:../../img/icons.svg";
import lefticon from "../../img/arrow-left-icon.svg";
import righticon from "../../img/arrow-right-icon.svg";
import pause from "../../img/pause-icon.svg";

class SongView extends MusicView {
  _id;
  _preview;
  _parentEl = document.querySelector(".recipe");

  _generateMarkup() {
    this._id = +window.location.hash.slice(1);
    this._preview = this._data.find((data) => data.id === this._id);
    return `
    <figure class="recipe__fig">
        <img src="${this._preview.imageXl}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
        <span>${this._preview.title}</span>
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
            <img class="play__img" src="${this._preview.pictureMedium}" alt="" width="200" />
        </div>
        <div class="play__info">
            <div class="play__artist">
            <h1 class="play__name">${this._preview.name}</h1>
            <p class="play__title">Album by ${this._preview.name}</p>
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
  }
}

export default new SongView();
