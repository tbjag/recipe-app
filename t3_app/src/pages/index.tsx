import { type NextPage } from "next";
import NewRecipeForm  from '../components/NewRecipeForm';
import { Component } from "react";

const Home: NextPage = () => {
  return (
    <div>
      <header className="sticky top-0 z-10 border-b bg-white pt-2"></header>
      <h1 className="mb-2 px-4 text-lg font-bold">Home - Create Recipe</h1>
      <NewRecipeForm />
    </div>
  );
};

export default Home;
