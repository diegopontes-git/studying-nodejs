
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

connection
    .authenticate()
    .then(() => {
        console.log("Conectado ao Bando de Dados")
    })
    .catch((msgErro) => {
        console.log('ERRO ao Conectar no Bando de Dados: ');
        console.log(msgErro);
    })

//Informando ao Express utilizar o EJS comm View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function(req, res) {

    var produtos = [
        {nome: 'doritos', preco: 3.23},
        {nome: 'coca', preco: 5.21},
        {nome: 'leite', preco: 4.10}
    ]

    res.render("index", {
        nome: 'Diego Pontes',
        lang: 'javascript',
        empresa: 'DSP Dev',
        inscritos: 9000,
        produtos: produtos
    });
});

app.get("/perguntar", (req, res) => {
      res.render("perguntar", {
        nome: 'Diego Pontes',
        lang: 'javascript'
    });
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    res.send("Pergunta salva titulo = " + titulo + " descricao = " + descricao);
});

app.get("/blog", function(req, res){
    res.send("bem vindo blog");
});
app.get("/video", function(req, res){
    res.send("bem vindo video");
});
app.get("/param/:var1?", function(req, res){
    res.send("bem vindo param: " + req.params.var1);
});
app.get("/paramq/", function(req, res){
    //parametros dinamicos
    var param1 = req.query["param1"];
    var param2 = req.query["param2"];
    res.send("bem vindo - param1: " + param1 + " e param2: " + param2);
});

app.listen(4000, function(erro){
    if (erro) {
        console.log("Ocorreu um erro.");
    } else {
        console.log("App ok");
    }
});