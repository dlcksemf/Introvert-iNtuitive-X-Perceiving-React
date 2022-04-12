function BookApplicationSearch({ setQuery, handleSubmit }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder={'검색어를 입력해주세요 ex) ISBN 번호'}
          autoComplete="off"
          className="border-2 border-gray-300 h-[70px] w-[845px] px-3 text-xl font-semibold
          relative top-[20px] left-[360px] focus:outline-none select-none"
        />

        <button
          className="border-2 border-gray-300 h-[70px] w-[90px] top-[21px]
          relative left-[385px]"
          onClick={handleSubmit}
        >
          <h1 className="text-2xl font-semibold text-center select-none">
            검색
          </h1>
        </button>
      </form>
    </div>
  );
}

export default BookApplicationSearch;
