// import the server and start it!
const express = require("express");
const shortid = require("shortid");

const server = express();
server.use(express.json());

let dogs = [
    {
        id: shortid.generate(),
        name: "dog1",
        weight: 10
    },
    {
        id: shortid.generate(),
        name: "dog2",
        weight: 15
    }
]

server.get("/api/dogs", (req, res) => {
    res.json(dogs)
})

server.post("/api/dogs", (req, res) => {
    const newDog = req.body;

    newDog.id = shortid.generate();
    dogs.push(newDog);

    res.json(`${newDog.name} has been added to the list.`);

})

server.delete("/api/dogs/:id", (req, res) => {
    const id = req.params.id;
    const deleted = (dogs.find(dog => dog.id === id));

    dogs = (dogs.filter(dog => dog.id === id));

    res.json(deleted);
})

server.put("api/dogs/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    let found = (dogs.find(dog => dog.id === id));

    if (found) {
        Object.assign(found, changes);
    } else {
        res.status(404).json({ message: "Dog not found!" })
    }
    res.json(found)
})

const PORT = 8000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
