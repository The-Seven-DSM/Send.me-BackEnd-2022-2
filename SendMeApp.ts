const cors = require('cors')
const express = require('express')
const app = express()
import db from "./src/config/Database.config";
import route from "./src/routes/routes";
const port =  process.env.PORT || 3001;


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