import { Request, Response } from "express";

class OpenConectionController {
    async openConection(request: Request, response: Response){
        return response.status(201).json({
            message: "Criada conexão com a Api.SAE!",
        });
    }
}

export { OpenConectionController };