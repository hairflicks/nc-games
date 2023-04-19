import { fetchReviews } from "../api"
import { useEffect, useState } from "react"
import ReviewCard from "./ReviewCard"
import { useSearchParams } from "react-router-dom"
import QueryBar from "./QueryBar"


export default function ReviewList() {

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
        fetchReviews(categoryQuery, sortByQuery, orderQuery)
    .then((response) => {
        setReviews(response)
        setIsLoading(false)
    })
     }, [categoryQuery, sortByQuery, orderQuery])

    if (isLoading) {
        return <h2>Page is loading...</h2>
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