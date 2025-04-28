const express = require('express')// importar modulo express do npm
const app = express()// inicializar o servidor express e salvar variavel app
const fs = require('fs')
const PORT = 8000 // separa uma porta para rodar o servidor
app.use(express.json())//fala para o servidor que vai receber dados em JSON

const bancodeDados = [
    {
        id:1,
        titulo:"desenvolvimento de sistemas",
        curso: "tecnico em desenvolvimento de sistemas",
        turma: "3B",
        professor:"Ramon"
    }
]
//criar as minhas rotas
app.get('/aulas', (req,res) => {
    res.status(200).send(bancodeDados)
})

app.get('/aulas/:id', (req,res)=>{
    const id = req.params.id
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) =>{
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo');
        }
        const aulas = JSON.parse(data)
        const aula = usuarios.find(aula => aula.id == id)
        if (aula) {
            return res.status(200).send(aula);
        } else {
            return res.status(404).send('Usuário não encontrado');
        }
    })
})

app.post('/aulas', (req, res) => {
    const dados = req.body
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if(err){
            return res.status(500).send('Erro ao ler o arquivo');
        }
        const aulas = JSON.parse(data)
        dados['id'] = aulas.length + 1
        aulas.push(dados)
        fs.writeFile('bancoDeDados.json', JSON.stringify(aulas), (err) => {
            if (err) {
                return res.status(500).send('Erro ao escrever no arquivo');
            }
        })
        console.log(aulas)
    })
    res.status(201).send(dados)
})

app.put('/aulas/:id', (req,res)=>{
    const id = req.params.id;
    const usuario = bancodeDados.find(user => user.id == id);
    if (!usuario){
        return res.status(404).json({msg:"Usuario não encontrado"});
    }
    Object.assign(usuario, req.body);
    res.status(200).json(usuario);
});


app.delete('/aulas/:id', (req, res) => {
    const id = req.params.id;
    const index = bancodeDados.findIndex(user => user.id == id);

    if (index === -1) {
        return res.status(404).json({msg: "Usuario não encontrado"});
    }

    bancodeDados.splice(index, 1);
    res.status(200).json({msg: "Usuario deletado com sucesso"});
});

app.listen(PORT, () => {console.log('servidor online')})//coloca o servidor para ouvir na porta e colocar mensagem
//depois disso instalar o npm i nodemon e ir  no package.json e adicionar virgula depois de text e embaixo de test o "start": "nodemon index.js"