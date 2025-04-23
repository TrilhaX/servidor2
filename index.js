require('dotenv').config();
const express = require('express');
const fs = require('fs').promises;
const app = express();
const PORT = process.env.PORT || 8000;
const DATA_FILE = 'bancoDeDados.json';

app.use(express.json());

async function loadData() {
    try {
        const txt = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(txt);
    } catch {
        return [];
    }
}

async function saveData(dados) {
    await fs.writeFile(DATA_FILE, JSON.stringify(dados, null, 2));
}

app.get('/aulas', async (req, res, next) => {
    try {
        const aulas = await loadData();
        res.json(aulas);
    } catch (e) { next(e) }
});

app.get('/aulas/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const aulas = await loadData();
        const aula = aulas.find(a => a.id === id);
        if (!aula) return res.status(404).json({ msg: 'Aula não encontrada' });
        res.json(aula);
    } catch (e) { next(e) }
});

app.post('/aulas', async (req, res, next) => {
    try {
        const { titulo, curso, turma, professor } = req.body;
        if (!titulo || !curso) {
            return res.status(400).json({ msg: 'Título e curso são obrigatórios' });
        }
        const aulas = await loadData();
        const nova = { id: aulas.length + 1, titulo, curso, turma, professor };
        aulas.push(nova);
        await saveData(aulas);
        res.status(201).json(nova);
    } catch (e) { next(e) }
});

app.put('/aulas/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const aulas = await loadData();
        const idx = aulas.findIndex(a => a.id === id);
        if (idx === -1) return res.status(404).json({ msg: 'Aula não encontrada' });
        aulas[idx] = { ...aulas[idx], ...req.body };
        await saveData(aulas);
        res.json(aulas[idx]);
    } catch (e) { next(e) }
});

app.delete('/aulas/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const aulas = await loadData();
        const idx = aulas.findIndex(a => a.id === id);
        if (idx === -1) return res.status(404).json({ msg: 'Aula não encontrada' });
        aulas.splice(idx, 1);
        await saveData(aulas);
        res.json({ msg: 'Aula deletada com sucesso' });
    } catch (e) { next(e) }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ msg: 'Erro interno no servidor' });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));