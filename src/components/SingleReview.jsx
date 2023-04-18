import { useEffect, useState } from "react";
import { fetchReviewById } from "../api";


export default function SingleReview({id}) {

    const [review, setReview] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchReviewById(id)
    .then(response => {
        setReview(response)
        setIsLoading(false)
    })
    }, [])

    const date = new Date(review.created_at)
    const postedAt = (date.toLocaleString());

    if (isLoading) {
        return <h2>Page is loading....</h2>
    }

    return (
            <section id="singleReview">
            <article>{review.title}</article>
            <div>
            <img src={review.review_img_url} alt="review image"></img>
            </div>
            <p>{review.review_body}</p>
            <p>Comments: {review.comment_count}</p>
            <p>votes:{review.votes}</p>
            <p>Posted by {review.owner} at {postedAt}</p>
        </section>
    )
}