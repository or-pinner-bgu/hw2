"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import bigInt from 'big-integer'

const API_URL = 'http://localhost:3001/notes';

interface AddNoteProps {
    onAdd: () => void; 
    onCancel: () => void;
}

const uuidToInt = (uuid: string) => {
    const hex = uuid.replace(/-/g, '');
    const bigInteger = bigInt(hex, 16);
    return bigInteger;
  };

const AddNote: React.FC<AddNoteProps> = ({ onAdd, onCancel}) => {
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');

    const handleAuthorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleAuthorEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, {
                id: uuidToInt(uuidv4()),
                title,
                author: {
                    name: name,
                    email: email,
                },
                content,
            });
            setName('');
            setContent('');
            setTitle('');
            setEmail('');
            onAdd();
        } catch (error) {
            console.error('The note has not added', error);
        }
    };

    return (
        <div className="addNote" >
            <h2>Add New Note</h2>
            <form onSubmit={handleSubmit} name="text_input_new_note">
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                <div>
                    <label>Author Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={handleAuthorNameChange}
                        required
                    />
                </div>
                <div>
                    <label>Author Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleAuthorEmailChange}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={handleContentChange}
                        required
                    />
                </div>
                <button type="submit" name="text_input_save_new_note">save</button>
                <button name="text_input_cancel_new_note" onClick={onCancel}>cancel</button>

            </form>
        </div>
    );
};

export default AddNote;