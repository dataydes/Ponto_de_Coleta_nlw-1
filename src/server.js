const express = require("express")
const server = express()
//pegar o bd
const db = require("./database/db.js")
//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))

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
    //req.query string
    //console.log(req.query)


    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
//req.body: o corpo do formulário
console.log(req.body)

//Inserir dados no bd.
const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
    
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastrado com Sucesso.")
        console.log(this)
        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)
    
})



server.get("/search", (req, res) => {

    const search = req.query.search
    if(search==""){
        //pesquisa vazia
          //Apresenta a page com os dados do bd.
          return res.render("search-results.html", {total: 0 })
    }

    //Recuperar os dados do bd
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        const total = rows.length
        //Apresenta a page com os dados do bd.
        return res.render("search-results.html", { places: rows, total: total })
    })


})
//Ligar o servidor
server.listen(3000)