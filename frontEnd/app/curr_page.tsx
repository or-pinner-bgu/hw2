"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
interface PageProps {
  currentPage: number;
}

const NOTES_PER_PAGE = 10;
const API_URL = 'http://localhost:3001/notes';

interface Author {
    name: string;
    email: string;
}

interface Note {
    id: number;
    title: string;
    author: Author;
    content: string;
}

const Notes: React.FC<PageProps>  = ({currentPage}) => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const start_index = (currentPage-1)*NOTES_PER_PAGE
        const end_index = (currentPage)*NOTES_PER_PAGE
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`${API_URL}?_start=${start_index}&_end=${end_index}}`);
                setNotes(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };
        fetchNotes();
    }, [currentPage]);

    return (
        <div className="allNotes">
            <h1>Notes</h1>
            <div>
                {notes.map(note => (
                    <div key={note.id} className="note" id={`${note.id}`}>
                        <h2>{note.title}</h2>
                        <small>Posted by: {note.author.name}</small>
                        <small>mail: {note.author.email}</small>
                        <br />
                        {note.content}
                    </div>
                ))}
            </div>
           
        </div>
    );
};

export default Notes;