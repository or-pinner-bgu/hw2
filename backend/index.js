import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import 'dotenv/config';

const MONGODB_URL = process.env.MONGODB_CONNECTION_URL || '';
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

mongoose.connect(MONGODB_URL)

.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((err) => console.error('Error connecting to MongoDB:', err));

const noteSchema = new mongoose.Schema({
    id: Number,
    title: String,
    author : {
        name: String,
        email: String
    },
    content: String
});

const Note = mongoose.model('Note', noteSchema);

app.get('/notes', async (req, res) => {
    const start_index = parseInt(req.query._start) || 0;
    const limit = parseInt(req.query._end) || 10;
    try {
        const notes = await Note.find().skip(start_index).limit(limit);
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching notes' });
    }
});

app.post('/notes', async (req, res) => {
    const note = new Note({
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    });
    
    note.save().then(() => {
        res.json(note);
    })
});

app.put('/notes/:id', async (req, res) => {
    const note = {
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    };

    Note.findByIdAndUpdate(req.params.id, note, { new: true })
        .then((updatedNote) => {
            res.json(updatedNote);
        })
});

app.delete('/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({ message: 'Note deleted' });
        })
});

app.get('/notesCount', async (req, res) => {
    try {
        const count = await Note.countDocuments();
        res.json({ totalNotes: count });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching total notes count' });
    }
});

