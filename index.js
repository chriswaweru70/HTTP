const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'courses1'},
  { id: 2, name: 'courses2'},
  { id: 3, name: 'courses3'}
];

app.get('/', (req, res) => {
  res.send('Hello World Guys!!!!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req,res) => {
  const { error } = validateCourse(req.body); //result.error
  //Validate
  //If invalid, return 400  - Bad request
  
  if (error) return res.status(400).send(error.details[0].message);

   const course = {
        id: courses.length + 1,
        name: req.body.name
   };
   courses.push(course);
   res.send(course);
});

app.get('/api/courses/:id', (req, res) => { 
const course = courses.find(c => c.id === parseInt(req.params.id));
if (!course) return res.status(404).send('The Course you are looking for is not here')
res.send(course); 
});

const port = process.env.PORT || 3000;
app.listen(port, () => 
    console.log(`Listening on Port ${port}...`)
);
app.put('/api/courses/:id', (req, res) => {
// Look up the course
//If not existing we need to return 404
const course = courses.find(c => c.id === parseInt(req.params.id));
if (!course) return res.status(404).send('The Course you are looking for is not here')


const { error } = validateCourse(req.body); //result.error
//Validate
//If invalid, return 400  - Bad request

if (error) return res.status(400).send(error.details[0].message);



//Updated course
course.name = req.body.name;
//Return the updated course to the client
res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
   return Joi.validate(course, schema);
}

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The Course you are looking for is not here')

  const index = courses.indexOf(course)
  courses.splice(index, 1)

  res.send('course');
});