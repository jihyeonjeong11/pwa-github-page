const BASE_MEME_URL = "https://api.imgflip.com/";

export function getMemes() {
  return fetch(BASE_MEME_URL + "/get_memes")
    .then((s) => s.json())
    .then((j) => j.data);
}
