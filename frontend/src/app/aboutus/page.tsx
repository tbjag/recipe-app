'use client';

import Link from 'next/link'
import Head from 'next/head';
import { useState, useEffect, SetStateAction, ChangeEvent } from 'react';

export default function AboutUs(): JSX.Element {

return (
<div className="container mx-auto sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 p-10 m-10">
    <body className="bg-blue-200">
    <header className="bg-white shadow">
        <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
            <a className="bg-gray-200 hover:bg-gray-400 p-3 text-white rounded-md transition-colors duration-300 text-gray-900 font-semibold text-lg transition-colors duration-300"><Link href="/">Home</Link></a>
            <a className="text-gray-900 font-semibold">About</a>
        </div>
        </div>
    </header>

    <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-800 mb-4">
        Welcome to our recipe application! We are a team of food enthusiasts who love to experiment with flavors and
        create amazing dishes. Our goal is to share our passion for cooking by providing you with a wide variety of
        delicious recipes that you can easily recreate in your own kitchen.
        </p>
        <p className="text-lg text-gray-800 mb-4">
        Whether you're a seasoned chef or just starting your culinary journey, our recipe app has something for
        everyone. From quick and easy meals for busy weeknights to impressive dishes for special occasions, you'll find
        inspiration and guidance here.
        </p>
        <p className="text-lg text-gray-800 mb-4">
        We believe that cooking should be fun and enjoyable, and our app aims to make the process of discovering and
        preparing recipes as seamless as possible. Browse through our collection, save your favorite recipes, and
        create personalized meal plans. You can also contribute to our community by sharing your own recipes and
        engaging with other food enthusiasts.
        </p>
        <p className="text-lg text-gray-800">
        Thank you for choosing our recipe app. We hope you enjoy your culinary adventures!
        </p>
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

         