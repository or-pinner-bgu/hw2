"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Note from './note'
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

const Curr_page: React.FC<PageProps>  = ({currentPage}) => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        fetchNotes();
    }, [currentPage]);

    const handleNoteUpdate = () => {
        fetchNotes(); // Refresh notes after editing or deleting
    };

    
        const fetchNotes = async () => {
            const start_index = (currentPage-1)*NOTES_PER_PAGE
            const end_index = (currentPage)*NOTES_PER_PAGE
            try {
                const response = await axios.get(`${API_URL}?_start=${start_index}&_end=${end_index}}`);
                setNotes(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

    return (
        <div className="allNotes">
            <h1>Notes</h1>
            <div>
                {notes.map(note => (
                     <Note key={note.id} note={note} onUpdate={handleNoteUpdate} />
                ))}
            </div>
           
        </div>
    );
};

export default Curr_page;