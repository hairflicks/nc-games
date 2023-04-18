import { useSearchParams } from "react-router-dom"


export default function QueryBar() {

    const [searchParams,setSearchParams] = useSearchParams()

    function handleChange(e) {
        const order_by = e.target.value
        searchParams.set("order_by", order_by)
        setSearchParams(searchParams)
        console.log(searchParams.get('order_by'))
    }

    return (
        <section id="orderBySelector">
            <label  for="OrderBy">Order by:</label>
            <select onChange={handleChange} name="OrderBy" id="OrderBy">
            <option value="title">title</option>
            <option value="votes">votes</option>
            <option value="comment_count">comment count</option>
            <option value="category">category</option>
            </select>
        </section>
        
    )
}