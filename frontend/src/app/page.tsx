'use client';

import Link from 'next/link'
import Head from 'next/head';
import { useState, useEffect, SetStateAction, ChangeEvent } from 'react';

interface Recipe{
  id: string;
  title: string;
  instructions: string;
  ingredients: string;
  notes: string;
}

export default function Recipes(): JSX.Element {
  
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipe, setRecipe] = useState<Recipe>({
    id: '',
    title: '',
    instructions: '',
    ingredients: '',
    notes: '',
  });

  useEffect(() => { //getting data
    async function fetchRecipes() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/`);
      const json = await res.json();
      console.log(json);
      setRecipes(json);
    }
    fetchRecipes()
      .catch(console.error);
  }, []);

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>,field:keyof Recipe): void {
    setRecipe((prevRecipe)=>({
      ...prevRecipe,
      [field]:e.target.value,
    }));
  }

  async function handleSubmit() { //sending data
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });
    const json = await res.json();
    setRecipes((prevRecipes)=> [...prevRecipes, json]);
  }

  async function handleDelete() { //delete data
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });
    const json = await res.json();
    setRecipes((prevRecipes)=> [...prevRecipes, json]);
  }

  const recipes_array = Array.from(recipes);
  

  return (

  
  <div className="container mx-auto sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 p-10 m-10">
    <header className="bg-white shadow">
        <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
            <a className="bg-gray-200 hover:bg-gray-400 p-3 text-black rounded-md transition-colors duration-300 text-gray-900 font-semibold text-lg transition-colors duration-300"><Link href="/">Home</Link></a>
            <a className="bg-gray-200 hover:bg-gray-400 p-3 text-black rounded-md transition-colors duration-300 text-gray-900 font-semibold text-lg transition-colors duration-300"><Link href="/aboutus">About Us</Link></a>
            <a className="bg-gray-200 hover:bg-gray-400 p-3 text-black rounded-md transition-colors duration-300 text-gray-900 font-semibold text-lg transition-colors duration-300"><Link href="/signup">Sign Up</Link></a>
        </div>
        </div>
    </header>
    <div>
      <div className="container mx-auto p-10 m-10">
        <div className="flex flex-col">
          <h1 className="font-bold mb-3 text-2xl">{recipe.id}</h1>

          <h1 className="font-bold mb-3 text-2xl">Recipe Title</h1>
          <textarea
            value={recipe.title}
            onChange={(e) => handleChange(e, 'title')}
            className="border-2 p-2 rounded-md text-black mb-3"
          ></textarea>

          <h1 className="font-bold mb-3 text-2xl">Ingredients</h1>
          <textarea
            value={recipe.ingredients}
            onChange={(e) => handleChange(e, 'ingredients')}
            className="border-2 p-2 rounded-md text-black mb-3"
          ></textarea>

          <h1 className="font-bold mb-3 text-2xl">Instructions</h1>
          <textarea
            value={recipe.instructions}
            onChange={(e) => handleChange(e, 'instructions')}
            className="border-2 p-2 rounded-md text-black mb-3"
          ></textarea>

          <h1 className="font-bold mb-3 text-2xl">Notes</h1>
          <textarea
            value={recipe.notes}
            onChange={(e) => handleChange(e, 'notes')}
            className="border-2 p-2 rounded-md text-black mb-3"
          ></textarea>

          <div className="mx-auto p-3 mt-5">
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 p-3 text-white rounded-md transition-colors duration-300"
            >
            Submit
            </button>
          </div>
          
          <div>
            <ul>
              {recipes &&
                recipes_array.map((r) => (
                  <li
                    key={r.id}
                    className="bg-yellow-100 my-3 py-3 px-4 border-yellow-200 border-2 rounded-md text-black"
                  >
                    <div>
                      <span className="font-bold">Id:</span> {r.id}
                    </div>
                    <div>
                      <span className="font-bold">Title:</span> {r.title}
                    </div>
                    <div>
                      <span className="font-bold">Ingredients:</span>{' '}
                      {r.ingredients}
                    </div>
                    <div>
                      <span className="font-bold">Instructions:</span>{' '}
                      {r.instructions}
                    </div>
                    <div>
                      <span className="font-bold">Notes:</span> {r.notes}
                    </div>
                    <div className="mx-auto p-2 mt-2">
                      <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-700 p-3 text-white rounded-md transition-colors duration-300"
                      >
                      Delete
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

