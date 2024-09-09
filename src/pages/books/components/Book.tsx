import { Link } from "react-router-dom";

export default function Book({ book }: any) {
  const data = book?.volumeInfo  
  
  return (
    <Link to={`/books/${book?.id}`} className="w-full hover:scale-110 duration-100 ease-in p-2 rounded-xl">
      <div className="relative w-full">
        <img
          src={data?.imageLinks?.thumbnail}
          className="h-[300px] object-cover object-center rounded-xl w-full"
        />
      </div>

      <div className="pt-4 text-center text-slate-900 font-semibold">
        <h1 className="text-base">{data?.title}</h1>
      </div>
    </Link>
  );
}
