"use client";

import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ThemeContext } from './Theme';

interface NoteProps {
    note: {
        id: number;
        title: string;
        author: {
            name: string;
            email: string;
        };
        content: string;
    };
    onUpdate: () => void; 
    onDelete: () => void;
    dbIndex: number;
}

const Note: React.FC<NoteProps> = ({ note, onUpdate, onDelete, dbIndex}) => {
    const [editing, setEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(note.content);
    const theme  = useContext(ThemeContext);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3001/notes/${dbIndex}`, { ...note, content: editedContent });
            setEditing(false);
            onUpdate(); // Refresh notes after saving
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const handleCancel = () => {
        setEditing(false);
        setEditedContent(note.content); // Reset edited content
    };

    const handleDelete = async () => {
        console.log(dbIndex);
        try {
            await axios.delete(`http://localhost:3001/notes/${dbIndex}`);
            onDelete(); 
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedContent(event.target.value);
    };

    return (
        <div className={`note ${theme}`} id={`${dbIndex}`}>
            <h2>{note.title}</h2>
            <small>Posted by: {note.author.name}</small>
            <small>Email: {note.author.email}</small>
            <br />
            {editing ? (
                <div>
                    <textarea
                        name={`text_input-${dbIndex}`}
                        value={editedContent}
                        onChange={handleChange}
                        rows={5}
                        cols={50}
                    />
                    <br />
                    <button onClick={handleSave} name={`text_input_save-${dbIndex}`}>Save</button>
                    <button onClick={handleCancel} name={`text_input_cancel-${dbIndex}`}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>{note.content}</p>
                    <button onClick={handleEdit} name={`edit-${dbIndex}`}>Edit</button>
                    <button onClick={handleDelete} name={`delete-${dbIndex}`}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default Note;
