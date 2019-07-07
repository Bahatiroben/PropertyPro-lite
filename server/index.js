import uuid from 'uuid';
import express from 'express';
const PORT = process.env.PORT || 1;
const person1 = {
    name: "bar",
    age: 20
}

const person2 = {
    address: "foo",
    new: 23
}

const persons = {...person1,...person2};
console.log(persons);
const app = express();
app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}...`);
})
