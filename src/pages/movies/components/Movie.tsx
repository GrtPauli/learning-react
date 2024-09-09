import { Link } from "react-router-dom";
import { IMovie } from "../../../types";

export default function Movie({ movie }: {movie: IMovie}) {
  return (
    <Link to={`/movies/${movie?.imdbID}`} className="w-full hover:bg-orange-500/10 p-2 rounded-xl">
      <div className="relative w-full">
        <img
          src={movie?.Poster}
          className="h-[300px] object-cover object-center rounded-xl w-full"
        />
        <div className="border-orange-500 border-4 bg-slate-700 z-30 w-[35px] h-[35px] flex items-center justify-center rounded-full text-xs font-bold absolute top-2 left-2">
          100
        </div>
      </div>

      <div className="pt-3 text-center">
        <h1 className="text-sm">{movie?.Title}</h1>
        <p className="text-sm text-slate-400">Year - {movie?.Year}</p>
      </div>
    </Link>
  );
}
