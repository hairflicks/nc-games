import { fetchReviews } from "../api"
import { useEffect, useState } from "react"
import ReviewCard from "./ReviewCard"
import { useSearchParams } from "react-router-dom"
import QueryBar from "./QueryBar"


export default function ReviewList() {

    const [queryError, setQueryError] = useState()
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        searchParams.delete('sort_by')
        searchParams.delete('order')
        setSearchParams(searchParams)
    }, [])

    const categoryQuery = searchParams.get('category')
    const sortByQuery = searchParams.get('sort_by')
    const orderQuery = searchParams.get('order')

    useEffect(() => {
        setQueryError()
        fetchReviews(categoryQuery, sortByQuery, orderQuery)
    .then((response) => {
        setReviews(response)
        setIsLoading(false)
    })
    .catch(err => {
        setIsLoading(false)
        setQueryError(err.response.data.msg)
    })
     }, [categoryQuery, sortByQuery, orderQuery])

    if (isLoading) {
        return <h2>Page is loading...</h2>
    }

    if (queryError) {
        return <h2 className="errorMsg">{queryError}</h2>
    }

    return (
        <main>
            <section id="queryBar">
            <QueryBar />
            </section>
            <section id="reviewList">
            {reviews.map(review => {
                return <div key={review.review_id}>
                    <ReviewCard review={review}/>
                    </div>
            })}
        </section>
        </main>
    )

}