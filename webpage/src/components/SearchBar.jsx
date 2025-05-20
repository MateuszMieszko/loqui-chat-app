export default function SearchBar({ defaultText="Search...", handleChange }) {
    return (
        <textarea
            className="searchBar"
            autocomplete={false}
            onChange={handleChange}
            placeholder={defaultText}
            rows={1}
            />
    )
}