"use client"
import React from 'react';
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { toast } from 'react-toastify';


const validationSchema = Yup.object().shape({
    bookTitle: Yup.string().required('Book Title is required'),
    language: Yup.string().required('Language is required'),
    publishedYear: Yup.string().required('Published Year is required'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required')
});

type Book = {
    bookTitle: string;
    language: string;
    publishedYear: string;
    category: string;
    description: string;
}

const addBook = async (data: Book) => {
    const res = await fetch(`${ process.env.NEXT_PUBLIC_API }/books`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return (await res).json();
}

export default function Edit() {
    const router = useRouter();
    const { setValue, register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });
    const handleFormSubmit = handleSubmit(async (req) => {
        const res = await addBook({
            bookTitle: req.bookTitle,
            language: req.language,
            publishedYear: req.publishedYear,
            category: req.category,
            description: req.description
        })
        toast.success(res.message);
        router.push("/");
    })
    return (
        <>
            <main className="panel px-5 py-5">
                <h1 className="text-lg font-semibold mb-2">Add Book</h1>
                <hr className='mb-6' />
                <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="label-control">Book Title</label>
                            <input type="text" {...register('bookTitle')} className={errors['bookTitle'] ? "form-control border-red-600" : "form-control"} />
                            {errors["bookTitle"] ? (<span className='text-sm text-red-600'>{errors['bookTitle'].message}</span>) : null}
                        </div>
                        <div>
                            <label className="label-control">Language</label>
                            <input type="text" {...register("language")} className={errors['language'] ? "form-control border-red-600" : "form-control"} />
                            {errors["language"] ? (<span className='text-sm text-red-600'>{errors['language'].message}</span>) : null}
                        </div>
                        <div>
                            <label className="label-control">Published Year</label>
                            <input type="text" {...register("publishedYear")} className={errors['publishedYear'] ? "form-control border-red-600" : "form-control"} />
                            {errors["publishedYear"] ? (<span className='text-sm text-red-600'>{errors['publishedYear'].message}</span>) : null}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                        <div>
                            <label className="label-control">Category</label>
                            <input type="text" {...register("category")} className={errors['category'] ? "form-control border-red-600" : "form-control"} />
                            {errors["category"] ? (<span className='text-sm text-red-600'>{errors['category'].message}</span>) : null}
                        </div>
                        <div>
                            <label className="label-control">Description</label>
                            <input type="text" {...register("description")} className={errors['description'] ? "form-control border-red-600" : "form-control"} />
                            {errors["description"] ? (<span className='text-sm text-red-600'>{errors['description'].message}</span>) : null}
                        </div>
                    </div>
                    <button type="submit" className="btn-primary mt-5">Submit</button>
                    <button type="button" onClick={() => router.back()} className="btn-default ml-2">Cancel</button>
                </form>
            </main>
        </>
    )
}
