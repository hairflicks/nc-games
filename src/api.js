import axios from "axios"

const boardGamesApi = axios.create({
    baseURL: "https://board-games-api-89zv.onrender.com/api"
});

export function fetchReviews(category, sort_by, order) {
    const limit = 'all'
    return boardGamesApi.get('/reviews', {params: {category, sort_by, order, limit}})
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

export function postCommentByReviewId(comment, id) {
    return boardGamesApi.post(`/reviews/${id}/comments`, comment)
    .then(({data}) => {
        return data.comment
    })
}

export function fetchUsers() {
    return boardGamesApi.get('/users')
    .then(({data}) => {
        return data.users
    })
}

export function deleteCommentById(id) {
    return boardGamesApi.delete(`/comments/${id}`)
}