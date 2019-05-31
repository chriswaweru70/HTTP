const Joi = require('joi');
const express = require('express');
const app = express();
const home = require('./router/home')
const courses = require('./router/courses')

app.use(express.json());
app.use('/api/genres', courses);
app.use('/', home);


const port = process.env.PORT || 3000;
app.listen(port, () => 
    console.log(`Listening on Port ${port}...`)
);
