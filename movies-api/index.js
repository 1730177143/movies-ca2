import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import defaultErrHandler from './errHandler'
import moviesRouter from './api/movies';
import reviewsRouter from './api/reviews';
import authenticate from './authenticate';

dotenv.config();

const app = express();
const port = process.env.PORT;

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./movies-ca2.postman_collection.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/reviews',reviewsRouter);
app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});