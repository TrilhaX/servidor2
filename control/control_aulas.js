function getAllClasses(req, res) {
    res.status(200).send(bancodeDados)
}

function getSpecificClass(req, res) {
    readFile('bancoDeDados.json', 'utf-8', 'get', req, res)
}

function createClass(req, res) {
    readFile('bancoDeDados.json', 'utf-8', 'post', req, res)
}

function updateClass(req, res) {
    readFile('bancoDeDados.json', 'utf-8', 'put', req, res)
}

function deleteClass(req, res) {
    readFile('bancoDeDados.json', 'utf-8', 'delete', req, res)
}

module.exports = { getAllClasses, getSpecificClass, createClass, updateClass, deleteClass }