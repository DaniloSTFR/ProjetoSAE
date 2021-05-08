import express, { request, response } from "express";

const app = express();
// GET => BUscar
// http://localhost:3333/users
app.get("/", (request,response) => {
    return response.json({message:"Hello Word - NLW04" });
})

// 1 param => Rota(Recurso API)
// 2 param => resquest, response

app.post("/", (request,response) => {
    // recebe dados para salvar
    return response.json({message: "Os dados foram salvo com sucesso!" });
})

app.listen(3333, () => console.log("Server is running!")); 
