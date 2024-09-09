import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, API_KEY } from "../../../constants";
import BG from "../../../images/movie-bg.jpg";
import Movie from "../components/Movie";
import { GridLoader } from "react-spinners";

export default function MovieDetailPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [movie, setMovie] = useState<any>();
  const [movies, setMovies] = useState<any[]>();
  const params = useParams();
  const movie_ulid = params.ulid ?? "";

  const fetchData = () => {
    const promise1 = axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${movie_ulid}`);
    const promise2 = axios.get(`${BASE_URL}?apikey=${API_KEY}&s='comedy'`);

    Promise.all([promise1, promise2])
      .then((res) => {
        setMovie(res[0]?.data);
        setMovies(res[1]?.data?.Search);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [movie_ulid]);

  return (
    <div className="flex flex-1 flex-col bg-slate-900 h-full min-h-screen">
      {loading ? (
        <div className="flex flex-1 justify-center items-center">
          <GridLoader color="#f97316" />
        </div>
      ) : (
        <>
          <div
            style={{ backgroundImage: `url(${BG})` }}
            className="w-full bg-cover h-auto flex items-center justify-center relative p-10"
          >
            <div className="absolute bg-black/60 w-full h-full" />

            <div className="w-full flex justify-between text-white z-10 relative flex-1 h-full">
              <div className="flex flex-col flex-1 justify-between items-start">
                <div>
                  <Link to="/movies" className="flex gap-3 items-center mb-3">
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
                  <h1 className="font-bold text-3xl mb-2">{movie?.Title}</h1>
                  <p className="max-w-[800px] leading-relaxed">{movie?.Plot}</p>
                </div>

                <div className="flex gap-3 font-bold text-lg rounded-md bg-orange-700 w-auto px-3 py-1">
                  <p>Released - {movie?.Released},</p>
                  <p>Runtime - {movie?.Runtime},</p>
                  <p>Language - {movie?.Language}</p>
                </div>
              </div>

              <div className="relative">
                <img
                  src={movie?.Poster}
                  className="h-[220px] object-cover object-center rounded-xl w-[170px]"
                />
                <div className="border-orange-500 border-4 bg-slate-700 z-30 w-[35px] h-[35px] flex items-center justify-center rounded-full text-xs font-bold absolute top-2 left-2">
                  100
                </div>
              </div>
            </div>
          </div>

          <div className="text-white p-10">
            <div>
              <h1 className="font-bold text-3xl mb-5 border-b-2 border-orange-500 inline-block pb-3">
                Top Billed Cast
              </h1>

              <div className="flex gap-10">
                {movie?.Actors?.split(",")?.map((item: any, i: any) => (
                  <div className="flex flex-col items-center gap-3" key={i}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-16 text-slate-300"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-28">
              <h1 className="font-bold text-3xl mb-5 border-b-2 border-orange-500 inline-block pb-3">
                Comedy Category
              </h1>

              <div className="grid grid-cols-5 gap-1 gap-y-8">
                {movies?.map((item) => (
                  <Movie key={item?.imdbID} movie={item} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
