import { fetchReviews } from "../api"
import { useEffect, useState } from "react"
import ReviewCard from "./ReviewCard"
import { useSearchParams } from "react-router-dom"


export default function ReviewList() {

    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [searchParams, setSearchParams] = useSearchParams()

    const categoryQuery = searchParams.get('category')

    useEffect(() => {
        fetchReviews(categoryQuery)
    .then((response) => {
        setReviews(response)
        setIsLoading(false)
    })
     }, [categoryQuery])

    if (isLoading) {
        return <h2>Page is loading...</h2>
    }

    return (

            <main id="reviewList">
            {reviews.map(review => {
                return <div key={review.review_id}>
                    <ReviewCard review={review}/>
                    </div>
            })}
        </main>
    )

}