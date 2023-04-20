import { useParams } from "react-router-dom"
import SingleReview from "./SingleReview"
import Comments from "./Comments"
import PostComment from "./PostComment"
import {useState} from 'react'

export default function ReviewPage({currentUser}) {
    
    const [comments, setComments] = useState([])
    const [idError, setIdError] = useState(false)
    const { id } = useParams()

    if (idError) {
        return <h2 className="errorMsg">{idError}</h2>
    }

    return (
        <div>
            <SingleReview id={id} setIdError={setIdError}/>
            <Comments id={id} comments={comments} setComments={setComments} currentUser={currentUser}/>
            <PostComment id={id} currentUser={currentUser} setComments={setComments}/>
        </div>
    )

}