import { useSearchParams } from "react-router-dom"


export default function QueryBar() {

    const [searchParams,setSearchParams] = useSearchParams()

    function handleSortByChange(e) {
        console.log(e)
        const sort_by = e.target.value
        searchParams.set("sort_by", sort_by)
        setSearchParams(searchParams)
    }

    function handleOrderChange(e) {
        const order = e.target.value
        searchParams.set("order", order)
        setSearchParams(searchParams)
    }

    return (
        <section id="queryBar">
            <section id="sortBySelector">
            <label  htmlFor="sortBy">Sort by: </label>
            <select onChange={handleSortByChange} name="sortBy" id="sortBy">
            <option value="title">title</option>
            <option value="votes">votes</option>
            <option value="owner">author</option>
            <option value="comment_count">comment count</option>
            <option value="category">category</option>
            <option defaultValue="created_at" selected>date posted</option>
            </select>
        </section>
        <section id="orderSelector">
        <label  htmlFor="order">order: </label>
        <select onChange={handleOrderChange} name="order" id="order">
        <option value="asc">asc</option>
        <option defaultValue="desc" selected>desc</option>
        </select>
    </section>
        </section>   
    )
}