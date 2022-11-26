import 'reflect-metadata';
import './database';
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors"
import { router } from './routes';
import cors from "cors"

const app = express();
app.use(cors());

//Set up mongoose connection
const mongoose = require('mongoose');
mongoose.connect ('mongodb://localhost:27017/SAE',{
    useNewUrlParser: true ,
    useUnifiedTopology: true ,
    useFindAndModify: false,
    useCreateIndex: true,
});
mongoose.Promise = global.Promise;

app.use(express.json());
app.use( router );

app.use( (err: Error, request: Request, response: Response, next: NextFunction) => {
    if( err instanceof Error ){
        return response.status(400).json({
            error: err.message
        })
    }
    
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
    })
});


app.listen(3333, () => console.log("Projeto SAE is running!")); 


/*
app.post("/", (request,response) => {
    // recebe dados para salvar
    return response.json({message: "Os dados foram salvo com sucesso SAE!" });
}) */
