import express from "express";
import db from "./config/Database.config";
import route from "./routes/routes"

const app = express();

app.use(express.json());

const port = 3000;

app.listen(port, ()=>{
    console.log("server is running on port " + port);
});

db.authenticate().then(()=>{  //Testando conexão com o banco de dados
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
});

db.sync().then(()=>{   //Sincronizando o banco com possíveis mudanças nas tabelas
    console.log('sucesso');
});

app.use('/', route);