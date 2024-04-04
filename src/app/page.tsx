"use client"
import Link from 'next/link';
import { ControlPointOutlined, MoreVertOutlined, EditOutlined, DeleteOutlineOutlined, SearchOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Book = {
  id: string;
  bookTitle: string;
  language: string;
  publishedYear: string;
  category: string;
  description: string;
}

const getAllBooks = async () => {
  const res = await fetch("http://localhost:3000/api/books")
  const data = await res.json();
  return data.books;
}

const deleteBookById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/books/${id}`, {
    method:"DELETE"
  });
  return (await res).json();
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const fetchBooks = async () => {
    const bookData = await getAllBooks();
    setBooks(bookData);
  }

  useEffect(() => {
    fetchBooks();
  }, [books]
  )

  const toggleDropdown = (index: string) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  }

  const filterBooksByTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value != ""){
      const newBooks = books.filter((book) => book.bookTitle.toLocaleLowerCase().includes(event.target.value.toLowerCase()));
      setBooks(newBooks);
    }else {
      fetchBooks();
    }
  }

  const handleDelete = async(id: string) => {
    const res = await deleteBookById(id);
    toast.success(res.message);
  }
  return (
    <>
      <main className="panel px-5 py-5">
        <h1 className="text-lg font-semibold mb-2">Book List</h1>
        <hr className='mb-6' />
        <div className='text-right pb-5'>
          <Link href='/books/add' className="btn-primary"><ControlPointOutlined />Create</Link>
        </div>
        <div className="flex items-center mb-5">
            <div className="mr-auto flex items-center relative">
                <SearchOutlined className="text-textColor-light absolute left-2" />
                <input type="text" className="form-control pl-10" placeholder="Search Here..." onChange={filterBooksByTitle} />
            </div>
        </div>
        <table className="table table-fixed w-full">
          <thead>
            <tr className='bg-slate-100'>
              <th className='border-b border-slate-300 p-2 text-left'>
                Book Title
              </th>
              <th className='border-b border-slate-300 p-2 text-left'>
                Language
              </th>
              <th className='border-b border-slate-300 p-2 text-left'>
                Published Year
              </th>
              <th className='border-b border-slate-300 p-2 text-left'>
                Category
              </th>
              <th className='border-b border-slate-300 p-2 text-left'>
                Description
              </th>
              <th className='border-b border-slate-300 p-2 text-left'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: Book, index: number) => (
              <tr key={index}>
                <td className='border-b border-slate-300 p-2'>
                  {book.bookTitle}
                </td>
                <td className='border-b border-slate-300 p-2'>
                  {book.language}
                </td>
                <td className='border-b border-slate-300 p-2'>
                  {book.publishedYear}
                </td>
                <td className='border-b border-slate-300 p-2'>
                  {book.category}
                </td>
                <td className='border-b border-slate-300 p-2'>
                  {book.description}
                </td>
                <td className='border-b border-slate-300 p-2'>
                  <div className='dropdown'>
                    <div>
                      <button type='button' className='dropdown-toggle-icon' onClick={() => toggleDropdown(book.id)}>
                        <MoreVertOutlined />
                      </button>
                    </div>
                    {openDropdown === book.id && (
                      <div className="dropdown-menu">
                        <Link href={`/books/edit/${book.id}`} className="dropdown-item"><EditOutlined />Edit</Link>
                        <Link href={'#'} className="dropdown-item" onClick={() => handleDelete(book.id)}><DeleteOutlineOutlined />Delete</Link>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-5">
          Total Records: <strong>{ books.length }</strong>
        </p>
      </main>
    </>
  )
}
