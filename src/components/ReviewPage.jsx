import { useParams } from "react-router-dom"
import SingleReview from "./SingleReview"
import Comments from "./Comments"

export default function ReviewPage() {
    
    const { id } = useParams()


    return (
        <div>
            <SingleReview id={id}/>
            <Comments id={id}/>
        </div>
    )

}