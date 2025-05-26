export default function SearchBar({ defaultText="Search...", handleChange }) {
    return (
        <textarea
            className="searchBar"
            autoComplete="Off"
            onChange={handleChange}
            placeholder={defaultText}
            rows={1}
            />
    )
}