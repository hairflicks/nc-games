import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import * as api from '../api'

export default function ReviewPageNavigation({totalReviews, limit}) {

    const [searchParams,setSearchParams] = useSearchParams()

    let pages = 0

    if (limit) {
        pages = Math.ceil(totalReviews / limit)
    } else {
        pages = Math.ceil(totalReviews / 10)
    }
    
    const pageCountArr = []
    for (let i = 1; i <= pages; i ++) {
        pageCountArr.push(i)
    }

    function handlePageClick(e) {
        const page = e.target.value
        searchParams.set("page", page)
        setSearchParams(searchParams)
        window.scrollTo(0, 0)
    }

    return (
        <nav id="pagination">
        {pageCountArr.map(pageNumber => {
            return <button key={pageNumber} className="reviewPaginationButton" type="input" value={pageNumber} onClick={handlePageClick}>{pageNumber}</button>
        })}
    </nav>
    )

}