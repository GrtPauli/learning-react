import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { Book } from "../components";

export default function BookDetailPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [book, setBook] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [authorBooksloading, setAuthorBooksLoading] = useState<boolean>(true);
  const params = useParams();
  const book_id = params.id;

  useEffect(() => {
    setLoading(true)
    if (book_id) {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes/${book_id}`)
        .then((res) => {
          setBook(res?.data?.volumeInfo);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [book_id]);

  useEffect(() => {
    setAuthorBooksLoading(true)
    if (book) {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=inauthor:"${book?.authors[0]}"`
        )
        .then((res) => {
          const data = res?.data?.items || []
          setBooks(data?.filter((item: any) => item?.volumeInfo?.title !== book?.title));
        })
        .finally(() => {
          setAuthorBooksLoading(false);
        });
    }
  }, [book]);

  return (
    <div className="bg-slate-100 flex flex-col flex-1 min-h-screen h-full">
      {loading ? (
        <div className="flex flex-1 justify-center items-center">
          <GridLoader color="#f97316" />
        </div>
      ) : (
        <div className="text-slate-900">
          <div className="bg-slate-900 p-10 flex justify-between text-slate-100">
            <div className="flex flex-col justify-between flex-1">
              <div>
                <Link to="/books" className="flex gap-3 items-center mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-10 text-slate-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-slate-100 font-bold text-xl">Go Back</p>
                </Link>

                <div>
                  <h1 className="font-bold text-2xl mb-2">{book?.title}</h1>
                  <div>
                    <p>{book?.authors?.length > 1 ? "Authors" : "Author"}</p>
                    <div className="flex gap-3">
                      {book?.authors?.map((item: any, i: any) => (
                        <p key={i}>{item}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-5">
                <p className="rounded-full bg-slate-100 text-slate-900 font-bold px-3 py-1">
                  Publisher - {book?.publisher}
                </p>
                <p className="rounded-full bg-slate-100 text-slate-900 font-bold px-3 py-1">
                  Published On - {book?.publishedDate}
                </p>
              </div>
            </div>

            <img
              src={book?.imageLinks?.thumbnail}
              className="h-[200px] object-cover object-center rounded-xl"
            />
          </div>

          <div className="p-16">
            <h2 className="border-b-2 pb-3 border-slate-900 font-bold text-2xl mb-5">
              Book Description
            </h2>
            <p className="leading-loose">
              {book?.description?.replace(/<[^>]+>/g, "")}
            </p>
          </div>


          {authorBooksloading ? (
            <div className="flex flex-1 justify-center items-center mt-5">
                <GridLoader color="#f97316" />
            </div>
          ) : (
            <>
                {books?.length > 0 && (
                    <div className="p-16">
                        <h2 className="border-b-2 pb-3 border-slate-900 font-bold text-2xl mb-5">
                            More Books From {book?.authors[0]}
                        </h2>

                        <div className="grid grid-cols-5 gap-5">
                            {books?.map((item) => (
                                <Book book={item} key={item?.id}/>
                            ))}
                        </div>
                    </div>
                )}
            </>
          )}      
        </div>
      )}
    </div>
  );
}
