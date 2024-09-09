import { useEffect, useState } from "react"

export default function MoviesSearch({movies}: any) {
    const [query, setQuery] = useState("")
    const [searchResults, setSearchResults] = useState<any[]>([])
    
    const handleChange = (event: any) => {
        setQuery(event.target.value.toLowerCase());
    }

    useEffect(() => {
      const filtered = movies.filter(
        (item: any) =>
          item.Title.toLowerCase().includes(query)
      );

      setSearchResults(filtered)
    }, [query]);


  return (
    <div className="max-w-[800px] w-full relative">
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Search by movie title"
            className="border-[1px] rounded-full !pl-14 px-3 py-3.5 w-full outline-none shadow-md focus:border-green-500"
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
            <div className="bg-white absolute w-full z-50 top-16 rounded-2xl h-[400px] p-5 overflow-auto">
                {searchResults?.length > 0 ? (
                  <div className="flex flex-col gap-2">
                      {searchResults?.map((item, i) => (
                        <SearchItem item={item} key={i}/>
                      ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center flex-1 h-full">
                      No Results
                  </div>
                )}
            </div>
        )}
    </div>
  )
}

const SearchItem = ({item}: any) => {
    return (
        <div className="border-b cursor-pointer border-b-slate-300 p-3 hover:bg-orange-500/20 hover:shadow-lg hover:rounded-xl">
            <h1 className="font-bold text-lg">{item?.Title}</h1>
            <p className="text-sm">{item?.Year}</p>
        </div>
    )
}