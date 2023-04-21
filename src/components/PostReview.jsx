import { useState } from "react"
import * as api from '../api'


export default function PostReview({categories, currentUser}) {

    const [title, setTitle] = useState('')
    const [designer, setDesigner] = useState('')
    const [body, setBody] = useState('')
    const [img, setImg] = useState('')
    const [category, setCategory] = useState(categories[0])
    
    function handleReviewSubmit(e) {
        e.preventDefault()
        const submittedReview = {
            title,
            designer,
            owner: currentUser.username,
            review_body: body,
            category
        }
        api.postReview(submittedReview)
    }

    return (
        <section id="postReviewPage">
            <h2>Post a new review</h2>
            <form id="postReviewForm" type="submit" onSubmit={handleReviewSubmit}>
                <label  htmlFor="title">title: </label>
                <input type="text" onChange={(e) => {setTitle(e.target.value)}} value={title} name="title"/>
                <label  htmlFor="designer">designer: </label>
                <input type="text" onChange={(e) => {setDesigner(e.target.value)}} value={designer} name="designer"/>
                <label  htmlFor="body" >body: </label>
                <input type="textarea" onChange={(e) => {setBody(e.target.value)}} value={body} name="body" maxlength="10"/>
                <label  htmlFor="img">image url: </label>
                <input type="text" onChange={(e) => {setImg(e.target.value)}} value={img} name="img"/>
                <label  htmlFor="category">Category: </label>
                <select onChange={(e) => {setCategory(e.target.value)}} name="category" id="category" value={category}>
                    {categories.map(category => {
                        return <option key={category.slug} value={category.slug}>{category.slug}</option>
                    })}
                </select>
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}