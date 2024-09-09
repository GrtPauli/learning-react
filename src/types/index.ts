export interface IContact {
    contactName: string
    phoneNumber: string
    location: string
    id?: string
}

export interface IMovie {
    "Title": string,
    "Year": string,
    "imdbID": string,
    "Type": "movie" | "series" | "episode",
    "Poster": string
}