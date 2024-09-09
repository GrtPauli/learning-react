import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PhoneBookPage, HomePage, MoviesPage, StatesPage, MovieDetailPage, BooksPage, BookDetailPage } from './pages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/states",
    element: <StatesPage />,
  },
  {
    path: "/phonebook",
    element: <PhoneBookPage />,
  },
  {
    path: '/movies',
    children: [
      {index: true, element: <MoviesPage />},
      {path: ':ulid', element: <MovieDetailPage/>}
    ]
  },
  {
    path: '/books',
    children: [
      {index: true, element: <BooksPage />},
      {path: ':id', element: <BookDetailPage/>}
    ]
  }
]);

const App = () => {
  return (
    <div className=''>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

