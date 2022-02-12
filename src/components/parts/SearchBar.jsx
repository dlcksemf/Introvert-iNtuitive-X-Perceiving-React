function SearchBar({ handleSubmit, handleChange }) {
  const handleSubmitButtonClicked = (e) => {
    e.preventDefault();

    if (handleSubmit) {
      handleSubmit();
    }
  };

  return (
    <div className="pt-2 relative mx-auto text-gray-600">
      <form onSubmit={handleSubmitButtonClicked}>
        <input
          class="w-[200px] border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
          <svg
            style={{ width: 24 + 'px', height: 24 + 'px' }}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
