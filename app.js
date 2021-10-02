const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { notFound, errorHandler } = require('./middleware/common/error');
const productRouter = require('./router/productRouter');
const authRouter = require('./router/authRouter');

const app = express();
dotenv.config();

mongoose
    .connect(process.env.DATABASE_CONNECTION_STRING)
    .then(() => {
        console.log('Database conected sucessfully');
    })
    .catch((err) => console.log(err));

app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));

// router setup
app.use('/api', productRouter);
app.use('/api', authRouter);

// not found handler
app.use(notFound);

// default errror handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Listening to ${process.env.PORT}`);
});
