import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import morgan from 'morgan';
import logger from './middleware/logger.js';
import notesRouter from './routes/notes.js';

const MONGODB_URI = process.env.MONGODB_CONNECTION_URL;
const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(morgan('combined'));
app.use(logger);

// Routes
app.use('/notes', notesRouter);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => {
    console.log('Connected to MongoDB');
    // Start server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((err) => console.error('Error connecting to MongoDB:', err));
