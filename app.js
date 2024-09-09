const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json()) //ler dados json

const Filme = mongoose.model('Film',{
    Title: String,
    Description: String,
    Director: String,
    Year: Number,
    Imagem_Url: String, 
    Trailer: String
});


app.get("/", async (req, res) => {
    const films = await Filme.find()
    return res.send(films)
})

app.post("/", async (req, res) => {
    const film = new Filme({
        Title: req.body.Title,
        Description: req.body.Description,
        Director: req.body.Director,
        Year: req.body.Year,
        Imagem_Url: req.body.Imagem_Url, 
        Trailer: req.body.Trailer
    })

    await film.save()
    return res.send(film)
})

app.delete("/:id", async (req, res) => {
    const film = await Filme.findByIdAndDelete(req.params.id)
    return res.send(film)
})

app.put("/:id", async (req, res) => {
    const film = await Filme.findByIdAndUpdate(req.params.id, {
        Title: req.body.Title,
        Description: req.body.Description,
        Director: req.body.Director,
        Year: req.body.Year,
        Imagem_Url: req.body.Imagem_Url, 
        Trailer: req.body.Trailer
    })
    
    return res.send(film)
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://Carla:lRsASVxJQDyV1Yy2@starwars.uyi85.mongodb.net/?retryWrites=true&w=majority&appName=StarWars')
    console.log('Funcionando')
})