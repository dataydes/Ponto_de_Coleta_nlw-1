const express = require("express")
const server = express()
//pegar o bd
const db = require("./database/db.js")
//configurar pasta publica
server.use(express.static("public"))

//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Configurar os caminhos
//pagina inicial
//req : requisição
//res: resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})
server.get("/search", (req, res) => {
    //Recuperar os dados do bd
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        //Apresenta a page com os dados do bd.
        return res.render("search-results.html", { places: rows })
    })


})
//Ligar o servidor
server.listen(3000)