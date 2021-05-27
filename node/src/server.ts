import 'reflect-metadata';
import './database';
import express, { request, response } from "express";
import { router } from './routes';
const cors = require('cors');
const app = express();

//Set up mongoose connection
const mongoose = require('mongoose');
mongoose.connect ('mongodb://localhost:27017/SAE',{
    useNewUrlParser: true ,
    useUnifiedTopology: true ,
    useFindAndModify: false,
    useCreateIndex: true,
});
mongoose.Promise = global.Promise;

app.use(cors());
app.use(express.json());
app.use( router );


app.listen(3333, () => console.log("Projeto SAE is running!")); 



/* // GET => BUscar
// http://localhost:3333/users
app.get("/", (request,response) => {
    return response.json({message:"Hello Word - NLW04 SAE" });
})

// 1 param => Rota(Recurso API)
// 2 param => resquest, response

app.post("/", (request,response) => {
    // recebe dados para salvar
    return response.json({message: "Os dados foram salvo com sucesso SAE!" });
}) */
