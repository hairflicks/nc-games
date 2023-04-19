import * as api from '../api'
import {useState} from 'react'
import { Link } from 'react-router-dom'

export default function PostComment({id, currentUser, setComments, setAddedComments}) {

    const [comment, setComment] = useState('')
    const [postError, setPostError] = useState(false)


    function handleSubmit(e){
        e.preventDefault()
        if (comment.trim() === "") {
            alert("Comment cannot be empty.");
            return false
        }
        const postComment = {
            username: currentUser.username,
            body: comment
        }
        const newComment = {
            author: currentUser.username,
            body: comment,
            created_at: new Date(),
            comment_id: new Date()
        }
        setComment('')
        setComments(comments => {
            return [...comments, newComment]
        })
        api.postCommentByReviewId(postComment, id)
        .then((response) => {
            setPostError(false)
            setAddedComments(addedComments => {
                addedComments[newComment.comment_id] = response.comment_id
                return addedComments
            })
        }).catch((err) => {
            setPostError(true)
            setComments(comments => {
                const copy = [...comments] 
                return copy.filter(comment => comment.comment_id !== newComment.comment_id)
            })
        })
    }

    function handleChange(e) {
        setComment(e.target.value)
    }


    return (
        currentUser ?
        <form onSubmit={handleSubmit} id="postCommentForm">
            <textarea required value={comment} onChange={handleChange} id="postCommentText"></textarea>
            {postError ? <button id="postCommentErrorButton" >Unable to submit <br></br> Try again</button> : <button type="submit" id="postCommentButton">Submit comment</button>}
        </form>
        :
        <section id="postCommentLogin">
            <p>Please <Link to="/login">login</Link> to post a comment</p>
        </section>
    )
}