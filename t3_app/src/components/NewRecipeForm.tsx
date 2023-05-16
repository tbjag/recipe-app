import { ProfileImage } from './ProfileImage';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { api } from '~/utils/api';
// import {Ingredient} from '@prisma/client'

interface Recipe {
    title: string;
    cuisine: string;
    course: string;
    ingredients: string[];
    instructions: string[];
}

export default function NewRecipeForm() {
    //const session = useSession();
    // if (session.status !== 'authenticated') {
    //     return <></>;
    // } else {
    //     return <Form />;
    // }
    return <Form/>;
}

function Form() {
    const [recipe, setRecipe] = useState<Recipe>({
        title: '',
        cuisine: '',
        course: '',
        ingredients: [],
        instructions: [],
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
    };

    const handleIngredientsChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const ingredients = event.target.value.split('\n');
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            ingredients,
        }));
    };

    const handleInstructionsChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const instructions = event.target.value.split('\n');
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            instructions,
        }));
    };

    const createRecipe = api.recipe.createRecipe.useMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(recipe);
        createRecipe.mutate(recipe);
        setRecipe({
            title: '',
            cuisine: '',
            course: '',
            ingredients: [],
            instructions: [],
        }); // Reset the form
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-md rounded-lg bg-white p-4 shadow-md"
        >
            <div className="mb-4">
                <label htmlFor="title" className="mb-2 block text-gray-800">
                    Title:
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={recipe.title}
                    onChange={handleInputChange}
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="cuisine" className="mb-2 block text-gray-800">
                    Cuisine:
                </label>
                <input
                    type="text"
                    id="cuisine"
                    name="cuisine"
                    value={recipe.cuisine}
                    onChange={handleInputChange}
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="course" className="mb-2 block text-gray-800">
                    Course:
                </label>
                <input
                    type="text"
                    id="course"
                    name="course"
                    value={recipe.course}
                    onChange={handleInputChange}
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="ingredients"
                    className="mb-2 block text-gray-800"
                >
                    Ingredients:
                </label>
                <textarea
                    id="ingredients"
                    name="ingredients"
                    value={recipe.ingredients.join('\n')}
                    onChange={handleIngredientsChange}
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                    rows={4}
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="instructions"
                    className="mb-2 block text-gray-800"
                >
                    Instructions:
                </label>
                <textarea
                    id="instructions"
                    name="instructions"
                    value={recipe.instructions.join('\n')}
                    onChange={handleInstructionsChange}
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                    rows={4}
                />
            </div>
            <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
                Submit
            </button>
        </form>
    );
}
