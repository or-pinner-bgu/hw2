"use client";

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Note from './note';
import AddNote from './AddNote';
import { ThemeContext } from './Theme';

interface PageProps {
  currentPage: number;
  handleDelete: () => void;
  addNoteCount: () => void;
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

const Curr_page: React.FC<PageProps>  = ({currentPage, handleDelete, addNoteCount}) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const theme = useContext(ThemeContext); 

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

        const handleAddNote = () => {
            addNoteCount();
            fetchNotes();
        }

        const handleDeleteNote = () => {
            handleDelete();
            fetchNotes();
        }

    return (
        <div className={`allNotes ${theme}`}>
            <h1>Notes</h1>
            <div>
                {notes.map(note => (
                     <Note key={note.id} note={note} onUpdate={handleNoteUpdate} onDelete = {handleDeleteNote} />
                ))}
            </div>
            <AddNote onAdd = {handleAddNote}/>
        </div>
    );
};

export default Curr_page;