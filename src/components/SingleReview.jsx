import { useEffect, useState } from "react";
import * as api from "../api";
import uparrow from "../imgs/uparrow.png"
import downarrow from "../imgs/downarrow.png"

export default function SingleReview({id, setIdError}) {

    const [review, setReview] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [voteError, setVoteError] = useState(false)

    useEffect(() => {
        api.fetchReviewById(id)
    .then(response => {
        setReview(response)
        setIsLoading(false)
    })
    .catch(err => {
        setIdError(err.response.data.msg)
    })
    }, [])

    const date = new Date(review.created_at)
    const postedAt = (date.toLocaleString());

    function handleVoteClick(e) {
        e.preventDefault()
        const change = Number(e.target.value)
        setReview((review) => {
            const reviewCopy = {...review}
            reviewCopy.votes = review.votes + change
            reviewCopy.comments = review.comment_count
            return reviewCopy
        })
        api.patchReviewVotes(change,id)
        .then(() => {setVoteError(false)})
        .catch(() => {
        setVoteError(true)
        setReview((review) => {
            const reviewCopy = {...review}
            reviewCopy.votes = review.votes - change
            reviewCopy.comments = review.comment_count
            return reviewCopy
        })
    })
    }

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
            <div>
            <p id="reviewVotes">votes: {review.votes}</p>
            <input type="image" src={uparrow} alt="upvote" id="upvote" value='1' onClick={handleVoteClick}/>
            <input type="image" src={downarrow} alt="downvote" id="downvote" value='-1' onClick={handleVoteClick}/>
            {voteError ? <p id="voteError">unable to process votes</p> : null}
            </div>
            <p>Posted by {review.owner} at {postedAt}</p>
        </section>
    )
}