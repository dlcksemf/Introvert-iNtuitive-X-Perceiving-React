import { useApiAxios } from 'base/api/base';
import { ReviewSummary } from 'components/books/BookSummary';
import ReviewForm from 'components/books/ReviewForm';
import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

function ReviewPage({ book }) {
  const [query, setQuery] = useState();
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [, setPage] = useState(1);
  const [reloading, setReloading] = useState(false);

  const [{ data: review }, refetch] = useApiAxios(
    {
      url: `/books/api/review/?page_size=5`,
      method: 'GET',
    },
    { manual: true },
  );

  const fetchApplications = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
      };

      const { data } = await refetch({ params });

      setPage(newPage);

      setPageCount(Math.ceil(data.count / 5));
      setCurrentItems(data?.results);
    },
    [query, refetch],
  );

  const handlePageClick = (event) => {
    fetchApplications(event.selected + 1);
  };

  useEffect(() => {
    fetchApplications(1);
  }, [reloading, fetchApplications]);

  return (
    <>
      <ReviewForm book={book.book_num} setReload={setReloading} />
      {book?.review_set[0] && (
        <div className="flex m-auto mt-4">
          <div className="flex justify-center">
            <div className="bg-white shadow-xl rounded-lg w-[1040px] ml-[75px]">
              <ul className="divide-y divide-gray-300">
                {review?.results
                  ?.filter(
                    (review) => review.book_name.book_num === book.book_num,
                  )
                  .sort((user1, user2) => user2.count_loans - user1.count_loans)
                  .map((review) => (
                    <ReviewSummary
                      review={review}
                      key={review.review_num}
                      setReload={setReloading}
                    />
                  ))}
              </ul>
              <div className="relative bottom-7 pt-8">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageCount={pageCount}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                  className="pagination"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReviewPage;
