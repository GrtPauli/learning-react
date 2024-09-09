import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div 
      className="p-20 min-h-screen h-full flex-1 flex flex-col text-white bg-gradient-to-br from-yellow-800  to-white"
      // style={{
      //   background: 'linear-gradient(to bottom, rgba(59, 130, 246, 1) 20%, rgba(34, 197, 94, 0.5) 80%)'
      // }}
    >
      <h1 className="font-bold text-3xl mb-5 border-b-2 pb-3 textb border-white uppercase">Projects</h1>

      <ul className="list-disc px-5 flex flex-col gap-3">
        <li>
          <Link to='/phonebook' className="underline underline-offset-4">Phonebook App</Link>
        </li>
        <li>
          <Link to='/states' className="underline underline-offset-4">States and Capitals</Link>
        </li>
        <li>
          <Link to='/movies' className="underline underline-offset-4">Movies Library</Link>
        </li>
        <li>
          <Link to='/books' className="underline underline-offset-4">Books Library</Link>
        </li>
      </ul>
    </div>
  )
}
