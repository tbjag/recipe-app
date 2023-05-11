import { type NextPage } from "next";
import NewRecipeForm  from '../components/NewRecipeForm';

const Home: NextPage = () => {
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2"></header>
      <h1 className="mb-2 px-4 text-lg font-bold">Home - Create Recipe</h1>
      <NewRecipeForm />
    </>
  );
};

export default Home;
