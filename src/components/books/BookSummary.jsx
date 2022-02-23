import { Link, useNavigate } from 'react-router-dom';
import non_image from 'components/parts/image/non_image.jpg';
import heavy_reader from 'components/parts/image/heavy_reader.png';

function truncateString(str) {
  if (str.length > 70) {
    return str.slice(0, 70) + '...';
  } else {
    return str;
  }
}
function BookSummary({ book }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap -m-4">
      <div className="p-4 lg:w-1/2">
        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
          {book?.cover_photo && (
            <img
              alt={book?.title}
              className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4 cursor-pointer
              transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
              src={book?.cover_photo}
              onClick={() => {
                navigate(`/books/${book.book_num}/`);
              }}
            />
          )}
          {!book?.cover_photo && (
            <img
              alt="non_image"
              className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4 cursor-pointer
              transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
              src={non_image}
              onClick={() => {
                navigate(`/books/${book.book_num}/`);
              }}
            />
          )}
          <div className="flex-grow sm:pl-8">
            {book?.category && (
              <h3 className="text-sm text-gray-500 mb-3 select-none">
                [ {book?.category} ]
              </h3>
            )}
            <h2
              className="title-font font-medium text-lg text-black hover:text-blue-500
            transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
            >
              <Link to={`/books/${book.book_num}/`}>{book?.title}</Link>
            </h2>
            <h3 className="text-sm text-gray-500 mb-3 select-none">
              {book?.writer}
            </h3>
            <p className="font-medium text-base mb-4 truncate text-clip overflow-hidden select-none">
              {truncateString(book.story)}
            </p>
            <span className="inline-flex"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewBookSummary({ book }) {
  const navigate = useNavigate();

  return (
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container mx-auto">
        <div class="lg:w-2/3 mx-auto flex flex-wrap items-center">
          <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">
              {book.category}
            </h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">
              {book.title}
            </h1>
            <div class="flex mb-4">
              <div class="flex-grow border-b-2 border-blue-300 py-2 text-lg px-1">
                {book.writer}
              </div>
            </div>
            <p class="leading-relaxed mb-4">{truncateString(book.story)}</p>

            <div class="flex justify-center">
              <button
                onClick={() => {
                  navigate(`/books/${book.book_num}/`);
                }}
                class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Button
              </button>
            </div>
          </div>

          <img
            src={book?.cover_photo ? book.cover_photo : non_image}
            alt={book.title}
            class="lg:w-1/2 w-full lg:h-auto h-64 object-scale-down object-center rounded"
          />
        </div>
      </div>
    </section>
  );
}

function Top5Summary({ book }) {
  const navigate = useNavigate();

  return (
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container mx-auto">
        <div class="lg:w-2/3 mx-auto flex flex-wrap items-center">
          <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">
              {book.category}
            </h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">
              {book.title}
            </h1>
            <div class="flex mb-4">
              <div class="flex-grow border-b-2 border-blue-300 py-2 text-lg px-1">
                {book.writer}
              </div>
            </div>
            <p class="leading-relaxed mb-4">{truncateString(book.story)}</p>

            <div class="flex justify-center">
              <button
                onClick={() => {
                  navigate(`/books/${book.book_num}/`);
                }}
                class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Button
              </button>
            </div>
          </div>

          <img
            src={book?.cover_photo ? book.cover_photo : non_image}
            alt={book.title}
            class="lg:w-1/2 w-full lg:h-auto h-64 object-scale-down object-center rounded"
          />
        </div>
      </div>
    </section>
  );
}

function HeavyReaderSummary({ book }) {
  return (
    <div>
      <img
        src={heavy_reader}
        alt="다독왕"
        className="w-screen h-screen rounded inline"
      />
      <div className="absolute top-20 left-20 px-20 py-20">
        <h4 class="mb-3 text-xl font-semibold tracking-tight text-white">
          <p class="leading-normal text-gray-100">{book.username}</p>
        </h4>
      </div>
    </div>
  );
}

export { BookSummary, NewBookSummary, Top5Summary, HeavyReaderSummary };
