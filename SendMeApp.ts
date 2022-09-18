const cors = require('cors')
const express = require('express')
const app = express()
import db from "./src/config/Database.config";
import route from "./src/routes/routes";
const port = 3001;

const { spawn } = require("child_process");
const childPython = spawn('python', ['app.py']);

childPython.stdout.on('data', (data:any) => {
    console.log(`saídas: ${data}`);
});

childPython.stderr.on('data', (data:any) => {
    console.error(`erro: ${data}`);
});


childPython.on('close', (code:any) => {
    console.log(`código: ${code}`);
});

app.use(cors())
app.use(express.json());
app.listen(port, ()=>{
    console.log("server is running on port " + port);
});


db.authenticate().then(()=>{  //Testando conexão com o banco de dados
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
});

db.sync().then(()=>{   //Sincronizando o banco com possíveis mudanças nas tabelas
    console.log('db is sync');
});

app.use('/', route);