export default function SearchBar({ defaultText="Search...", handleChange, ref }) {
    return (
        <textarea
            className="searchBar"
            autoComplete="Off"
            onChange={handleChange}
            placeholder={defaultText}
            rows={1}
            ref={ref}
            />
    )
}