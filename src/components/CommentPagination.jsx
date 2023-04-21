import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import * as api from '../api'

export default function PageNavigation({setComments, id, commentCount}) {

    const pages = Math.ceil(commentCount / 10)
    const pageCountArr = []
    for (let i = 1; i <= pages; i ++) {
        pageCountArr.push(i)
    }

    function handlePageClick(e) {
        const page = e.target.value
        api.fetchCommentsByReviewId(id, page)
        .then(response => setComments(response))
        document.getElementById("singleReview").scrollIntoView()
    }

    return (
        <nav id="pagination">
            {pageCountArr.map(pageNumber => {
                return <button key={pageNumber} className="paginationButton" type="input" value={pageNumber} onClick={handlePageClick}>{pageNumber}</button>
            })}
        </nav>
    )

}