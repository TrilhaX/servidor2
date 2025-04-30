const express = require('express')
const {writeFile, readFile} = require('../model/aulas_model')
const { getAllClasses, getSpecificClass, createClass, updateClass, deleteClass } = require('../control/control_aulas')
const router_aulas = express.Router()


//incluir as rotas que fazem parte deste roteador
router_aulas.get('', getAllClasses)

router_aulas.get('/:id', getSpecificClass)

router_aulas.post('', createClass)

router_aulas.put('/:id', updateClass)

router_aulas.delete('/:id', deleteClass);

module.exports = router_aulas