'use client';

import Head from 'next/head';
import { useState, useEffect, SetStateAction, ChangeEvent } from 'react';

interface Note {
  id: string;
  text: string;
  completed: boolean;
}

export default function Notes(): JSX.Element {
  const [note, setNote] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/`);
      const json = await res.json();
      console.log(json);
      setNotes(json);
    }
    fetchNotes();
  }, []);

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setNote(e.target.value);
  }

  async function handleSubmit() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: note,
        completed: false,
      }),
    });
    const json = await res.json();
    setNotes([...notes, json]);
  }

  return (
    <div>
      <Head>
        <title>Notes</title>
      </Head>
      <div className="container mx-auto p-10 m-10">
        <div className="flex flex-col">
          <h1 className="font-bold mb-3 text-2xl">Notes</h1>
          <textarea
            value={note}
            onChange={handleChange}
            className="border-2 p-2 rounded-md text-black"
          ></textarea>
          <div className="mx-auto p-3 mt-5">
            <button
              onClick={handleSubmit}
              className="bg-green-500 p-3 text-white rounded-md"
            >
              Submit
            </button>
          </div>
          <div>
            <ul>
              {notes &&
                notes.map((note) => (
                  <li
                    key={note.id}
                    className="bg-yellow-100 my-3 py-3 px-4 border-yellow-200 border-2 rounded-md text-black"
                  >
                    {note.text}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

Notes['useClient'] = true; // Marking the Notes component as a client entry
export {}; // Ensuring this file is treated as a module
