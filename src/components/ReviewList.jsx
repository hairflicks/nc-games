import { fetchReviews } from "../api"
import { useEffect, useState } from "react"
import ReviewCard from "./ReviewCard"
import { useSearchParams } from "react-router-dom"
import QueryBar from "./QueryBar"
import ReviewPageNavigation from "./ReviewPagination"


export default function ReviewList() {

    const [queryError, setQueryError] = useState()
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [totalReviews, setTotalReviews] = useState()
    const [searchParams, setSearchParams] = useSearchParams()

    const categoryQuery = searchParams.get('category')
    const sortByQuery = searchParams.get('sort_by')
    const orderQuery = searchParams.get('order')
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')

    useEffect(() => {
        setQueryError()
        fetchReviews(categoryQuery, sortByQuery, orderQuery, page, limit)
    .then(({reviews, total_count}) => {
        console.log('hi')
        setTotalReviews(total_count)
        setReviews(reviews)
        setIsLoading(false)
    })
    .catch(err => {
        setIsLoading(false)
        setQueryError(err.response.data.msg)
    })
     }, [categoryQuery, sortByQuery, orderQuery, page, limit])

    if (isLoading) {
        return <h2>Page is loading...</h2>
    }

    if (queryError) {
        return <h2 className="errorMsg">{queryError}</h2>
    }

    return (
        <main>
            <section id="queryBar">
            <QueryBar />
            </section>
            <section id="reviewList">
            {reviews.map(review => {
                return <div key={review.review_id}>
                    <ReviewCard review={review}/>
                    </div>
            })}
        </section>
        <ReviewPageNavigation totalReviews={totalReviews} limit={limit}/>
        </main>
    )

}