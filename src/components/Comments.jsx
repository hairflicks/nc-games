import { useState, useEffect } from "react"
import * as api from '../api'


export default function Comments({id, comments, setComments, currentUser, addedComments}) {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        api.fetchCommentsByReviewId(id)
    .then(response => {
        setComments(response)
        setIsLoading(false)
    })
    }, [])

    function handleDelete(e) {
        const id = e.target.value
        setComments(comments => {
            const copy = [...comments]
            return copy.filter(comment => {
                return comment.comment_id != id
            })
        })
        if(addedComments[id]) {
            api.deleteCommentById(addedComments[id])
        } else {
            api.deleteCommentById(id)

        }
        // api.deleteCommentById(id)
    }

    if (isLoading) {
        return <h2>Comments are loading....</h2>
    }

    return (
        comments ?
        <section id="comments">
            <h2>Comments</h2>
            {comments.map(comment => {

            const date = new Date(comment.created_at)
            const postedAt = (date.toLocaleString())

                return (
                    <article id="comment" key={comment.comment_id}>
                        <p id="commentAuthor">{comment.author} | </p>
                        <p id="commentVotes">{comment.votes} votes</p>
                        <p id="commentBody">{comment.body}</p>
                        <date>{postedAt}</date>
                        {currentUser ? currentUser.username === comment.author ? <button onClick={handleDelete} value={comment.comment_id} id="deleteComment">delete</button> : null : null}
                    </article>
                )
            })}
        </section> : 
        <section id="comments">
            <h2>No comments to show</h2>
        </section>
    )
}