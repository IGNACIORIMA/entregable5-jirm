const { getAll, create, getOne, remove, update, setGenres, setActors, setDirectors } = require('../controllers/movie.controllers');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

// /movies/:id/genres
routerMovie.route('/:id/genres')
    .post(setGenres)

// /movies/:id/actors
routerMovie.route('/:id/actors')
    .post(setActors)

// /movies/:id/directors
routerMovie.route('/:id/directors')
    .post(setDirectors)

routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerMovie;