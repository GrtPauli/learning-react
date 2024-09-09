import BG from "../../images/books-bg.jpg";
import BooksStack from "../../images/books.png";
import { Book, BooksSearch } from "./components";
import { useEffect, useState } from "react";
import axios from "axios";
// import { GOOGLE_API_KEY } from "../../constants";
import { GridLoader } from "react-spinners";

export default function BooksPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [books, setBooks] = useState<any[]>([]);

  const fetchMovies = () => {
    const promise1 = axios.get(`
            https://www.googleapis.com/books/v1/volumes?q=fantasy`);
    const promise2 = axios.get(`
            https://www.googleapis.com/books/v1/volumes?q=romance`);
    let data: any[] = [];

    Promise.all([promise1, promise2])
      .then((res) => {
        data = data.concat(
          res[0]?.data?.items,
          res[1]?.data?.items        
        );
        setBooks(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="bg-slate-100 flex flex-col flex-1 min-h-screen h-full">
      <div
        style={{ backgroundImage: `url(${BG})` }}
        className="relative w-full bg-center bg-cover h-[230px]"
      >
        <div className="bg-black/30 absolute h-full w-full flex-col flex items-center justify-center">
          <div className="flex items-center gap-3 text-white font-bold text-5xl mb-5">
            <img className="w-[80px]" src={BooksStack} />
            <h1>BookHub</h1>
          </div>

          <BooksSearch />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-1 justify-center items-center">
          <GridLoader color="#f97316" />
        </div>
      ) : (
        <div className="grid grid-cols-5 p-16 gap-5">
            {books?.map((item) => (
                <Book book={item} key={item?.id}/>
            ))}
        </div>
      )}
    </div>
  );
}
