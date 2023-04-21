import { useSearchParams } from "react-router-dom"


export default function QueryBar() {

    const [searchParams,setSearchParams] = useSearchParams()

    const limit = searchParams.get('limit')
    const sortBy = searchParams.get('sort_by')
    const order = searchParams.get('order')


    function handleSortByChange(e) {
        const sort_by = e.target.value
        searchParams.set("sort_by", sort_by)
        searchParams.delete('page')
        setSearchParams(searchParams)
    }

    function handleOrderChange(e) {
        const order = e.target.value
        searchParams.set("order", order)
        searchParams.delete('page')
        setSearchParams(searchParams)
    }

    function handleLimitChange(e) {
        const limit = e.target.value
        searchParams.set("limit", limit)
        searchParams.delete('page')
        setSearchParams(searchParams)
    }

    return (
        <section id="queryBar">
            <section id="sortBySelector" >
            <label  htmlFor="sortBy">Sort by: </label>
            <select onChange={handleSortByChange} name="sortBy" id="sortBy" value={sortBy ? sortBy : "created at"}> 
            <option value="created_at">date posted</option>
            <option value="title">title</option>
            <option value="votes">votes</option>
            <option value="comment_count">comment count</option>
            <option value="category">category</option>
            </select>
        </section>
        <section id="orderSelector" >
        <label  htmlFor="order">Order: </label>
        <select onChange={handleOrderChange} name="order" id="order" value={order ? order : "desc"}>
        <option value="desc">desc</option>
        <option value="asc">asc</option>
        </select>
    </section>
    <section id="limitSelector">
        <label  htmlFor="limit">Results per page: </label>
        <select onChange={handleLimitChange} name="limit" id="limit" value={limit ? limit : "10"}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="all">All</option>
        </select>
    </section>
        </section>   
    )
}