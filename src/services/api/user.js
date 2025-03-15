import httpClient from "../../helpers/httpClient.js";

export function getFavoriteMovies() {
  return httpClient.get(
    `${process.env.VUE_APP_API_URL}/account/${process.env.VUE_APP_API_SESSION_ID}/favorite/movies`
  );
}
