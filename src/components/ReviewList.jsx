import { fetchReviews } from "../api"
import { useEffect, useState } from "react"
import ReviewCard from "./ReviewCard"


export default function ReviewList() {

    const [reviews,setReviews] = useState([])

    useEffect(() => {
        fetchReviews()
    .then((response) => {
        setReviews(response)
    })
     }, [])

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