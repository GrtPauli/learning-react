import { useEffect, useState } from "react";

interface IStateAndCapital {
  state: string;
  capital: string;
}

export default function States() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<IStateAndCapital[]>(statesAndCapitals);

  // Debounce delay in milliseconds
  const debounceDelay = 1000;

  useEffect(() => {
    const handler = setTimeout(() => {
      const filtered = statesAndCapitals.filter(
        (item) =>
          item.state.toLowerCase().includes(searchTerm) ||
          item.capital.toLowerCase().includes(searchTerm)
      );
      setData(filtered);
    }, debounceDelay);

    // Cleanup function to clear timeout if user types within the delay period
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <div className="bg-green-500 flex flex-1 h-full min-h-screen items-center justify-center">
      <div className="bg-white flex-1 h-full max-h-[600px] flex-col flex gap-3 w-full max-w-[800px] p-10 rounded-2xl overflow-auto">
        <div>
          <h1 className="font-bold text-2xl">States And Their Capitals</h1>
        </div>
        <div className="mb-3 w-full relative">
          <input
            type="text"
            placeholder="Search by state name or capital"
            className="border-[1px] rounded-full !pl-14 px-3 py-3.5 w-full outline-none shadow-md focus:border-green-500"
            value={searchTerm}
            onChange={handleSearch}
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

        {data?.map((item, i) => (
          <div key={i} className="border-b pb-3 flex items-center gap-3">
            <div className="rounded-full bg-green-500 w-10 h-10 text-center text-sm text-white flex items-center justify-center">
              {i + 1}
            </div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-xl leading-none">{item.state}</h1>
              <p className="text-base leading-none mt-1">{item.capital}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const statesAndCapitals: IStateAndCapital[] = [
  { state: "Abia", capital: "Umuahia" },
  { state: "Adamawa", capital: "Yola" },
  { state: "Akwa Ibom", capital: "Uyo" },
  { state: "Anambra", capital: "Awka" },
  { state: "Bauchi", capital: "Bauchi" },
  { state: "Bayelsa", capital: "Yenagoa" },
  { state: "Benue", capital: "Makurdi" },
  { state: "Borno", capital: "Maiduguri" },
  { state: "Cross River", capital: "Calabar" },
  { state: "Delta", capital: "Asaba" },
  { state: "Ebonyi", capital: "Abakaliki" },
  { state: "Edo", capital: "Benin City" },
  { state: "Ekiti", capital: "Ado-Ekiti" },
  { state: "Enugu", capital: "Enugu" },
  { state: "Gombe", capital: "Gombe" },
  { state: "Imo", capital: "Owerri" },
  { state: "Jigawa", capital: "Dutse" },
  { state: "Kaduna", capital: "Kaduna" },
  { state: "Kano", capital: "Kano" },
  { state: "Katsina", capital: "Katsina" },
  { state: "Kebbi", capital: "Birnin Kebbi" },
  { state: "Kogi", capital: "Lokoja" },
  { state: "Kwara", capital: "Ilorin" },
  { state: "Lagos", capital: "Ikeja" },
  { state: "Nasarawa", capital: "Lafia" },
  { state: "Niger", capital: "Minna" },
  { state: "Ogun", capital: "Abeokuta" },
  { state: "Ondo", capital: "Akure" },
  { state: "Osun", capital: "Oshogbo" },
  { state: "Oyo", capital: "Ibadan" },
  { state: "Plateau", capital: "Jos" },
  { state: "Rivers", capital: "Port Harcourt" },
  { state: "Sokoto", capital: "Sokoto" },
  { state: "Taraba", capital: "Jalingo" },
  { state: "Yobe", capital: "Damaturu" },
  { state: "Zamfara", capital: "Gusau" },
  { state: "FCT", capital: "Abuja" },
];
