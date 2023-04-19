import * as api from '../api'
import {useState} from 'react'
import { Link } from 'react-router-dom'

export default function PostComment({id, currentUser, setComments}) {

    const [comment, setComment] = useState('')


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
        setComment('')
        setComments(comments => {
            const newComment = {
                author: currentUser.username,
                body: comment,
                created_at: new Date(),
                comment_id: new Date()
            }
            return [...comments, newComment]
        })
        api.postCommentByReviewId(postComment, id)
    }

    function handleChange(e) {
        setComment(e.target.value)
    }


    return (
        currentUser ?
        <form onSubmit={handleSubmit} id="postCommentForm">
            <textarea required value={comment} onChange={handleChange} id="postCommentText"></textarea>
            <button type="submit" id="postCommentButton">Submit comment</button>
        </form>
        :
        <section id="postCommentLogin">
            <p>Please <Link to="/login">login</Link> to post a comment</p>
        </section>
    )
}