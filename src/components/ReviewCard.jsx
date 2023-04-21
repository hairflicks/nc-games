import { Link } from 'react-router-dom'

export default function ReviewCard({review}) {

    const date = new Date(review.created_at)
    const postedAt = (date.toLocaleString());


    return (
        <Link to={`/reviews/${review.review_id}`}>
        <section id='reviewCard'>
            <h2>{review.title}</h2>
            <div id="reviewImg">
            <img src={review.review_img_url} alt="review image"></img>
            </div>
            <br></br>
            <p id="reviewComments">Comments: {review.comment_count}</p>
            <p id="votes">votes:{review.votes}</p>
            <p>Posted by {review.owner} at {postedAt}</p>
        </section>
        </Link>
        
    )
}