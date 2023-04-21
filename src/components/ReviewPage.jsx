import { useParams } from "react-router-dom"
import SingleReview from "./SingleReview"
import Comments from "./Comments"
import PostComment from "./PostComment"
import {useState} from 'react'

export default function ReviewPage({currentUser}) {
    
    const [comments, setComments] = useState([])
    const [idError, setIdError] = useState(false)
    const [commentCount, setCommentCount] = useState()
    const { id } = useParams()

    if (idError) {
        return <h2 className="errorMsg">{idError}</h2>
    }

    return (
        <div>
            <SingleReview id={id} setIdError={setIdError} setCommentCount={setCommentCount}/>
            <Comments id={id} comments={comments} setComments={setComments} currentUser={currentUser} commentCount={commentCount}/>
            <PostComment id={id} currentUser={currentUser} setComments={setComments}/>
        </div>
    )

}