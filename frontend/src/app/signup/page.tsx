'use client';

import Link from 'next/link'
import Head from 'next/head';
import { useState, useEffect, SetStateAction, ChangeEvent } from 'react';

interface ID {
    id: string;
  }
export default function SignUp(): JSX.Element {
    const [ID, setId] = useState<ID>({
        id: ''
      });

    useEffect(() => { //getting data
        async function fetchRecipes() {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/ids/`);
          const json = await res.json();
          console.log(json);
          setId(json);
        }
        fetchRecipes()
          .catch(console.error);
      }, []);

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>,field:keyof ID): void {
    setId((prevID)=>({
        ...prevID,
        [field]:e.target.value,
    }));
    }

    async function handleSubmit() { //sending data (this needs to be changed)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ID),
        });
        const json = await res.json();
      }

      async function handleSignIn() { //adjusts state (this needs to be changed)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ID),
        });
        const json = await res.json();
      }

return (
<div className="container mx-auto sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 p-10 m-10">
    <body className="bg-blue-200">
    <header className="bg-white shadow">
        <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
            <a className="bg-gray-200 hover:bg-gray-400 p-3 text-white rounded-md transition-colors duration-300 text-gray-900 font-semibold text-lg transition-colors duration-300"><Link href="/">Home</Link></a>
            <a className="text-gray-900 font-semibold">Sign Up</a>
        </div>
        </div>
    </header>

    <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        <p className="text-lg text-gray-800 mb-4">
        Welcome to our recipe application!
        </p>
        <h1 className="font-bold mb-3 text-2xl">Enter New Name</h1>
          <textarea
            value={ID.id}
            onChange={(e) => handleChange(e, 'id')}
            className="border-2 p-2 rounded-md text-black mb-3"
          ></textarea>
        <div className="mx-auto p-3 mt-5">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 p-3 text-white rounded-md transition-colors duration-300"
            >
            Sign Up
            </button>
          </div>
    </main>

    <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
        <h1 className="font-bold mb-3 text-2xl">Enter Name</h1>
          <textarea
            value={ID.id}
            onChange={(e) => handleChange(e, 'id')}
            className="border-2 p-2 rounded-md text-black mb-3"
          ></textarea>
          <div className="mx-auto p-3 mt-5">
            <button
              onClick={handleSignIn}
              className="bg-blue-500 hover:bg-blue-600 p-3 text-white rounded-md transition-colors duration-300"
            >
            Sign In
            </button>
          </div>
    </main>

    <footer className="bg-white py-4">
        <div className="container mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm">
            &copy; 2023 Recipe App
        </p>
        </div>
    </footer>
    </body>
</div>
        );
}

         