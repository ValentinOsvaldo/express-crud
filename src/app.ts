import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { PostsRouter } from './routes';

const app = express();

// TODO: Connect to DB

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/posts', PostsRouter);

export default app;
