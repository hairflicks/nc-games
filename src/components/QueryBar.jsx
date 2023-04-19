import { useSearchParams } from "react-router-dom"


export default function QueryBar() {

    const [searchParams,setSearchParams] = useSearchParams()

    function handleSortByChange(e) {
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
            <section id="sortBySelector" defaultValue="created_at">
            <label  htmlFor="sortBy">Sort by: </label>
            <select onChange={handleSortByChange} name="sortBy" id="sortBy">
            <option value="created_at">date posted</option>
            <option value="title">title</option>
            <option value="votes">votes</option>
            <option value="comment_count">comment count</option>
            <option value="category">category</option>
            </select>
        </section>
        <section id="orderSelector" defaultValue="desc">
        <label  htmlFor="order">order: </label>
        <select onChange={handleOrderChange} name="order" id="order">
        <option value="desc">desc</option>
        <option value="asc">asc</option>
        </select>
    </section>
        </section>   
    )
}