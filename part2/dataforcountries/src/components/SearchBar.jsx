const SearchBar = ({ query, handleQueryChange }) => {

    return (
        <form>
            find countries <input
                value={query}
                onChange={handleQueryChange} />
        </form>
    )
}

export default SearchBar