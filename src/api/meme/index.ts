const BASE_MEME_URL = "https://api.imgflip.com/";

export function getMemes() {
  return fetch(BASE_MEME_URL + "/get_memes")
    .then((s) => s.json())
    .then((j) => j.data);
}

export async function getMemesWithDelay({ signal }: { signal: AbortSignal }) {
  const randomDelay = Math.random() * 7000 + 4000;
  await new Promise((resolve) => setTimeout(resolve, randomDelay));

  const response = await fetch(BASE_MEME_URL + "/get_memes", { signal });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data;
}
