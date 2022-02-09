import { useRender } from 'base/hooks/RenderContext';
import { useState, useEffect, useContext } from 'react';

function range(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

function Pagination({ setPage, dataNum }) {
  const [pageNum, setPageNum] = useState(2);
  const [, setReload] = useRender();

  useEffect(() => {
    setPageNum(Math.ceil(dataNum / 2));
  }, [dataNum]);

  const handleClick = ({ e, key }) => {
    e.preventDefault();

    setPage(() => {
      return key + 1;
    });
    setReload((prevState) => !prevState);
  };

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          {range(pageNum).map((key) => {
            return (
              <li key={key}>
                <a
                  onClick={(e) => {
                    handleClick({ e, key });
                  }}
                  className="cursor-pointer py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {key + 1}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
