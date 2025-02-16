
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

connection
    .authenticate()
    .then(() => {
        console.log("Conectado ao Bando de Dados")
    })
    .catch((msgErro) => {
        console.log('ERRO ao Conectar no Bando de Dados: ');
        console.log(msgErro);
    });


//Informando ao Express utilizar o EJS comm View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function(req, res) {

    Pergunta.findAll({
        raw: true,
        order: [
            ['ID', 'DESC']
        ]
    }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });

});

app.get("/perguntar", (req, res) => {
    res.render("perguntar", {
        nome: 'Diego Pontes',
        lang: 'javascript'
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {
            id: id
        }
    }).then(pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({
                raw: true,               
                where: {
                    perguntaId: id
                },
                order: [
                    ['ID', 'DESC']
                ] 
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas : respostas
                });
            });
        } else {
            res.redirect("/");
        }
    });
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/');
    }).catch((msgErro) => {
        console.log('ERROR');
        console.log(msgErro);
        res.send("ERRO titulo = " + titulo + " descricao = " + descricao);
    });
});

app.post("/salvarresposta", (req, res) => {
    var perguntaId = req.body.perguntaId;
    var corpo = req.body.corpo;
    Resposta.create({
        perguntaId: perguntaId,
        corpo: corpo
    }).then(() => {
        res.redirect('/pergunta/' + perguntaId);
    }).catch((msgErro) => {
        console.log('ERROR');
        console.log(msgErro);
        res.send("ERRO titulo = " + perguntaId + " corpo = " + corpo);
    });
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