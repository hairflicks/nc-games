import { useParams } from "react-router-dom"
import SingleReview from "./SingleReview"
import Comments from "./Comments"
import PostComment from "./PostComment"
import {useState} from 'react'

export default function ReviewPage({currentUser}) {
    
    const [comments, setComments] = useState([])
    const { id } = useParams()


    return (
        <div>
            <SingleReview id={id}/>
            <Comments id={id} comments={comments} setComments={setComments}/>
            <PostComment id={id} currentUser={currentUser} setComments={setComments}/>
        </div>
    )

}