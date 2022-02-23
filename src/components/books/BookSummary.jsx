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
    <div>
      {book.cover_photo && (
        <img
          src={book.cover_photo}
          alt={book.title}
          className="w-5 h-5 mr-1 rounded inline"
        />
      )}
      {!book?.cover_photo && (
        <img
          src={non_image}
          alt="non_image"
          className="w-5 h-5 mr-1 rounded inline"
        />
      )}
      <Link to={`/books/${book.book_num}/`}>
        [ {book.category_id} ] {book.title} - {book.writer}{' '}
        {book.return_due_date}
      </Link>
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
