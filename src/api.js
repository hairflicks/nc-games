import axios from "axios"

const boardGamesApi = axios.create({
    baseURL: "https://board-games-api-89zv.onrender.com/api"
});

export function fetchReviews() {
    return boardGamesApi.get("/reviews")
    .then((response) => {
        return response.data.reviews
    });
};

export function fetchCategories() {
    return boardGamesApi.get("/categories")
    .then((response) => {
        return response.data.categories
    });
};