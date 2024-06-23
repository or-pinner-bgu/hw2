"use client";

import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/notes';

interface AddNoteProps {
    onAdd: () => void; 
}

const AddNote: React.FC<AddNoteProps> = ({ onAdd}) => {
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleAuthorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorName(e.target.value);
    };

    const handleAuthorEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorEmail(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, {
                title,
                author: {
                    name: authorName,
                    email: authorEmail,
                },
                content,
            });
            setTitle('');
            setAuthorName('');
            setAuthorEmail('');
            setContent('');
            onAdd(); // Refresh notes after adding
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    return (
        <div className="addNote">
            <h2>Add New Note</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="authorName">Author Name:</label>
                    <input
                        type="text"
                        id="authorName"
                        value={authorName}
                        onChange={handleAuthorNameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="authorEmail">Author Email:</label>
                    <input
                        type="email"
                        id="authorEmail"
                        value={authorEmail}
                        onChange={handleAuthorEmailChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                        rows={5}
                        cols={50}
                        required
                    />
                </div>
                <button type="submit">Add Note</button>
            </form>
        </div>
    );
};

export default AddNote;