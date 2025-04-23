const texto = 'teste 12354'

fs.writeFile('texto.txt', texto, (err) => {
    console.log(err)
})