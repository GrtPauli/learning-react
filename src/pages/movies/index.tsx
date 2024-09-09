import { useEffect, useState } from "react"
import axios from "axios"
import BG from "../../images/cover.jpg"
import { IMovie } from "../../types"
import { GridLoader } from "react-spinners"
import MoviesSearch from "./components/MoviesSearch"
import { BASE_URL, API_KEY } from "../../constants"
import Movie from "./components/Movie"

export default function MoviesPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [popularMovies, setPopularMovies] = useState<IMovie[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<IMovie[]>([])
  
  const fetchMovies = () => {
    const promise1 = axios.get(`${BASE_URL}?apikey=${API_KEY}&s='action'`)
    const promise2 = axios.get(`${BASE_URL}?apikey=${API_KEY}&s='romance'`)

    Promise.all([promise1, promise2]).then((res) => {
      setPopularMovies(res[0]?.data?.Search)
      setTopRatedMovies(res[1]?.data?.Search)
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div className="flex flex-1 flex-col bg-slate-900 h-full min-h-screen">
      <div style={{backgroundImage: `url(${BG})`}} className="w-full bg-center bg-cover h-[100px] flex items-center justify-center">
        <MoviesSearch movies={[...popularMovies, ...topRatedMovies]}/>
      </div>

      {loading ? (
        <div className="flex flex-1 justify-center items-center">
          <GridLoader color="#f97316"/>
        </div>
      ) : (
        <main className="text-white p-10">
          <div>
            <h1 className="font-bold text-3xl mb-5 border-b-2 border-orange-500 inline-block pb-3">
              Popular
            </h1>
        
            <div className="grid grid-cols-5 gap-1 gap-y-8">
              {popularMovies?.map((item) => (
                <Movie key={item?.imdbID} movie={item}/>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h1 className="font-bold text-3xl mb-5 border-b-2 border-orange-500 inline-block pb-3">
              Top Rated
            </h1>
        
            <div className="grid grid-cols-5 gap-1 gap-y-8">
              {topRatedMovies?.map((item) => (
                <Movie key={item?.imdbID} movie={item}/>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  )
}
