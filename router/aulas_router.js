const express = require('express')
const {writeFile, readFile} = require('../model/aulas_model')
const router_aulas = express.Router()


//incluir as rotas que fazem parte deste roteador
router_aulas.get('', (req, res) => {
    res.status(200).send(bancodeDados)
})

router_aulas.get('/:id', (req, res) => {
    readFile('bancoDeDados.json', 'utf-8', 'get', req, res)
})

router_aulas.post('', (req, res) => {
    readFile('bancoDeDados.json', 'utf-8', 'post', req, res)
})

router_aulas.put('/:id', (req, res) => {
    readFile('bancoDeDados.json', 'utf-8', 'put', req, res)
});

router_aulas.delete('/:id', (req, res) => {
    readFile('bancoDeDados.json', 'utf-8', 'delete', req, res)
});

module.exports = router_aulas