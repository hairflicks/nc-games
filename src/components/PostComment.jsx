import * as api from '../api'
import {useState} from 'react'
import { Link } from 'react-router-dom'

export default function PostComment({id, currentUser, setComments, setAddedComments}) {

    const [comment, setComment] = useState('')
    const [postError, setPostError] = useState(false)
    const [submitDisabled, setSubmitDisable] = useState(false)


    function handleSubmit(e){
            setSubmitDisable(true)
            e.preventDefault()
        if (comment.trim() === "") {
            alert("Comment cannot be empty.");
            return false
        }
        const postComment = {
            username: currentUser.username,
            body: comment
        }
       api.postCommentByReviewId(postComment, id)
        .then((response) => {
            setPostError(false)
            setComment('')
            setSubmitDisable(false)
            setComments(comments => {
                const commentsCopy = [...comments]
                commentsCopy.push(response)
                return commentsCopy
            })
        }).catch((err) => {
            setSubmitDisable(false)
            setPostError(true)
        })
    }

    function handleChange(e) {
        setComment(e.target.value)
    }


    return (
        currentUser ?
        <form onSubmit={handleSubmit} id="postCommentForm" disabled={submitDisabled}>
            <textarea required value={comment} onChange={handleChange} id="postCommentText" disabled={submitDisabled}></textarea>
            {postError ? <button id="postCommentErrorButton" disabled={submitDisabled}>Unable to submit <br></br> Try again</button> : <button type="submit" id="postCommentButton" disabled={submitDisabled}>Submit comment</button>}
        </form>
        :
        <section id="postCommentLogin">
            <p>Please <Link to="/login">login</Link> to post a comment</p>
        </section>
    )
}