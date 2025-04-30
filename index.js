const express = require('express')// importar modulo express do npm
const app = express()// inicializar o servidor express e salvar variavel app
const fs = require('fs')
const PORT = 8000 // separa uma porta para rodar o servidor
app.use(express.json())//fala para o servidor que vai receber dados em JSON

const bancodeDados = [
    {
        id: 1,
        titulo: "desenvolvimento de sistemas",
        curso: "tecnico em desenvolvimento de sistemas",
        turma: "3B",
        professor: "Ramon"
    }
]

function writeFile(arg1, arg2, res, arg3) {
    fs.writeFile(arg1, JSON.stringify(arg2, null, 2), err => {
        if (err) return res.status(500).send('Erro ao salvar');
        if (arg3 !== undefined) {
            return res.status(200).send(arg3);
        }
        res.status(200).send('Salvo com sucesso');
    });
}

function readFile(path, encoding, type, req, res) {
    fs.readFile(path, encoding, (err, data) => {
        if (err) return res.status(500).send('Erro ao ler o arquivo');

        let aulas;
        try {
            aulas = JSON.parse(data);
            if (!Array.isArray(aulas)) {
                console.warn(`"${path}" não continha um array — resetando para [].`);
                aulas = [];
            }
        } catch (parseErr) {
            console.error('Falha ao fazer parse do JSON:', parseErr);
            aulas = [];
        }

        const id = req.params.id;
        const dados = req.body;

        if (type === "get") {
            const aula = aulas.find(a => a.id == id);
            return aula
                ? res.status(200).send(aula)
                : res.status(404).send('Aula não encontrada');
        }
        else if (type === "post") {
            dados.id = aulas.length + 1;
            aulas.push(dados);
            return writeFile(path, aulas, res);
        }
        else if (type === "put") {
            const idx = aulas.findIndex(a => a.id == id);
            if (idx === -1) return res.status(404).send('Aula não encontrada');
            aulas[idx] = { ...aulas[idx], ...dados };
            return writeFile(path, aulas, res, aulas[idx]);
        }
        else if (type === "delete") {
            const idx = aulas.findIndex(a => a.id == id);
            if (idx === -1) return res.status(404).send('Aula não encontrada');
            const [removed] = aulas.splice(idx, 1);
            return writeFile(path, aulas, res, removed);
        }

        res.status(400).send('Requisição mal formatada');
    });
}

//criar as minhas rotas
app.get('/aulas', (req, res) => {
    res.status(200).send(bancodeDados)
})

app.get('/aulas/:id', (req, res) => {
    readFile('bancoDeDados.json', 'utf-8', 'get', req, res)
})

app.post('/aulas', (req, res) => {
    readFile('bancoDeDados.json', 'utf-8', 'post', req, res)
})

app.put('/aulas/:id', (req, res) => {
    readFile('bancoDeDados.json', 'utf-8', 'put', req, res)
});

app.delete('/aulas/:id', (req, res) => {
    readFile('bancoDeDados.json', 'utf-8', 'delete', req, res)
});

app.listen(PORT, () => { console.log('servidor online') })//coloca o servidor para ouvir na porta e colocar mensagem
//depois disso instalar o npm i nodemon e ir  no package.json e adicionar virgula depois de text e embaixo de test o "start": "nodemon index.js"