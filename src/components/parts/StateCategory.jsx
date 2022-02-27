function StateCategory({ setCategory, category, stateObject }) {
  return (
    <div className="flex">
      {stateObject &&
        Object.values(stateObject).map((state, index) => (
          <div
            key={index}
            className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-2"
          >
            <button
              onClick={(e) => {
                setCategory(e.target.value);
              }}
              value={Object.keys(stateObject)[index]}
              className={`text-xs py-2 px-4 ${
                category === Object.keys(stateObject)[index] &&
                'bg-indigo-100 text-indigo-700'
              } text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full`}
            >
              {state}
            </button>
          </div>
        ))}
    </div>
  );
}

export default StateCategory;
