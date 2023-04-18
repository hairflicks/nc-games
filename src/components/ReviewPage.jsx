import { useParams } from "react-router-dom"
import SingleReview from "./SingleReview"

export default function ReviewPage() {
    
    const { id } = useParams()


    return (
        <SingleReview id={id}/>
    )

}