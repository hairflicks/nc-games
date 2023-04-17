
export default function ReviewCard({review}) {

    const date = new Date(review.created_at)
    const postedAt = (date.toLocaleString());


    return (
        <section id='reviewCard'>
            <h2>{review.title}</h2>
            <img src={review.review_img_url} alt="review image"></img>
            <p>{review.review_body}</p>
            <p>Comments: {review.comment_count}</p>
            <p>votes:{review.votes}</p>
            <p>Posted by {review.owner} at {postedAt}</p>
        </section>
    )
}