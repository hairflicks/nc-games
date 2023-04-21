import { useState, useEffect } from "react"
import * as api from '../api'
import uparrow from "../imgs/uparrow.png"
import downarrow from "../imgs/downarrow.png"
import PageNavigation from "./PageNavigation"


export default function Comments({id, comments, setComments, currentUser, commentCount}) {

    const [isLoading, setIsLoading] = useState(true)
    const [deleteError, setDeleteError] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [commentVoteError, setCommentVoteError] = useState(false)

    useEffect(() => {
        api.fetchCommentsByReviewId(id)
    .then(response => {
        setComments(response)
        setIsLoading(false)
    }).catch((err => {}))
    }, [])

    function handleDelete(e) {

        setDisabled(true)
        const commentId = e.target.value

            api.deleteCommentById(commentId)
                .then(() => {
                    setDisabled(false)
                    setDeleteError(false)
                    setComments(comments => {
                        const commentsCopy = [...comments]
                        const filtered = commentsCopy.filter(comment => {
                            return comment.comment_id != commentId
                        })
                        return filtered
                    })
                })
                .catch(err => {
                    setDisabled(false)
                    setDeleteError(commentId)
                })
    }

    function handleCommentVote(change, commentId) {

        setComments(comments => {
            const commentsCopy = [...comments]
            commentsCopy.forEach(comment => {
                if (comment.comment_id === commentId) {
                    comment.votes += change
                }
            })
            return commentsCopy
        })

        api.patchCommentVotes(change, commentId)
        .then(() => {
            setCommentVoteError(false)
        })
        .catch((err )=> {
            setCommentVoteError(commentId)
            setComments(comments => {
                const commentsCopy = [...comments]
                commentsCopy.forEach(comment => {
                    if (comment.comment_id === commentId) {
                        comment.votes -= change
                    }
                })
                return commentsCopy
            })
        })
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
                        <input type="image" src={uparrow} alt="upvote" id="commentUpvote" value='1' onClick={() => {handleCommentVote(1, comment.comment_id)}}/>
                        <input type="image" src={downarrow} alt="downvote" id="commentDownvote" value='-1' onClick={() => {handleCommentVote(-1, comment.comment_id)}}/>
                        {commentVoteError === comment.comment_id ? <p id="commentVoteError">unable to process votes</p> : null}
                        <p id="commentBody">{comment.body}</p>
                        <time>{postedAt}</time>
                        {currentUser && currentUser.username === comment.author && <button onClick={handleDelete} value={comment.comment_id} id="deleteComment" disabled={disabled}>delete</button>}
                        {currentUser && currentUser.username === comment.author && deleteError == comment.comment_id && <p id="errorDelete">Error deleting try again!</p>}
                    </article>
                )
            })}
        <PageNavigation setComments={setComments} commentCount={commentCount} id={id}/>
        </section>
         : 
        <section id="comments">
            <h2>No comments to show</h2>
        </section>
    )
}