import { async } from "regenerator-runtime";
import { API_KEY } from "./config";
export const state = {
  search: {
    query: "",
    results: [],
  },
};

export const loadMusic = async function (query) {
  try {
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
  } catch (err) {
    console.error(err);
  }
};
