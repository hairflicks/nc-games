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

export function fetchReviewById(id) {
    return boardGamesApi.get(`/reviews/${id}`)
    .then(({data}) => {
        return data.review[0]
    })
}

export function fetchCommentsByReviewId(id) {
    return boardGamesApi.get(`/reviews/${id}/comments`)
    .then(({data}) => {
        return data.comments
    })
}

export function patchReviewVotes(change, id) {
    return boardGamesApi.patch(`/reviews/${id}`, {inc_votes: change})
    .then(({data}) => {
        return data.review
    })
}