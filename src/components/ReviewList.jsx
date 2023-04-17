import { fetchReviews } from "../api"
import { useEffect, useState } from "react"
import ReviewCard from "./ReviewCard"


export default function ReviewList() {

    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchReviews()
    .then((response) => {
        setReviews(response)
        setIsLoading(false)
    })
     }, [])

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