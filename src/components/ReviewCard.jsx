
export default function ReviewCard({review}) {

    const date = new Date(review.created_at)
    const postedAt = (date.toLocaleString());


    return (
        <section id='reviewCard'>
            <h2>{review.title}</h2>
            <div id="reviewImg">
            <img src={review.review_img_url} alt="review image"></img>
            </div>
            <p id="reviewBody">{review.review_body}</p>
            <p>Comments: {review.comment_count}  votes:{review.votes}</p>
            <p>Posted by {review.owner} at {postedAt}</p>
        </section>
    )
}