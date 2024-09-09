import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";

const debounceDelay = 500;

export default function BooksSearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<any[]>([]);

  const handleChange = (event: any) => {
    setQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`)
        .then((res) => {
          setBooks(res?.data?.items);
        })
        .finally(() => setLoading(false));
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div className="max-w-[800px] w-full relative">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Search by book title"
          className="border-[1px] rounded-xl !pl-14 px-3 py-3.5 w-full outline-none shadow-md focus:border-green-500"
          value={query}
          onChange={handleChange}
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#888888"
          className="size-6 absolute top-3.5 left-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      {query !== "" && (
        <div className="bg-white shadow-lg absolute w-full z-50 top-16 rounded-2xl h-[400px] p-3 overflow-auto">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <PuffLoader color="#0f172a" />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {books?.length > 0 ? books?.map((item, i) => (
                <SearchItem isLast={books?.length == i+1 && true} item={item} key={item?.id}/>
              )) : (
                <div className="flex w-full h-full items-center justify-center">
                  No Results
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const SearchItem = ({ item, isLast }: any) => {
  return (
    <Link to={`/books/${item?.id}`} className={`${!isLast && 'border-b'} flex items-center gap-5 cursor-pointer border-b-slate-300 p-3 hover:bg-slate-800/10 hover:shadow-lg hover:rounded-xl`}>
      <img 
        src={item?.volumeInfo?.imageLinks?.thumbnail}
        className="h-[60px] w-[50px] object-cover object-center rounded-md"
      />

      <div>
        <h1 className="font-bold text-lg">{item?.volumeInfo?.title}</h1>

        <div className="text-sm">
          <p>{item?.volumeInfo?.authors?.length > 1 ? 'Authors' : 'Author'}</p>
          <div className="flex gap-2 flex-wrap">
            {item?.volumeInfo?.authors?.map((it: any, i: any) => (
              <p key={i}>
                {it}
                {i + 1 != item?.volumeInfo?.authors?.length && ','}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
