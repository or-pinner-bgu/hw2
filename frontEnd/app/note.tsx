"use client";

import React, { useState } from 'react';
import axios from 'axios';

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
}

const Note: React.FC<NoteProps> = ({ note, onUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(note.content);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3001/notes/${note.id}`, { ...note, content: editedContent });
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
        try {
            await axios.delete(`http://localhost:3001/notes/${note.id}`);
            onUpdate(); // Refresh notes after deletion
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedContent(event.target.value);
    };

    return (
        <div className="note" id={`${note.id}`}>
            <h2>{note.title}</h2>
            <small>Posted by: {note.author.name}</small>
            <small>Email: {note.author.email}</small>
            <br />
            {editing ? (
                <div>
                    <textarea
                        value={editedContent}
                        onChange={handleChange}
                        rows={5}
                        cols={50}
                    />
                    <br />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>{note.content}</p>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default Note;
