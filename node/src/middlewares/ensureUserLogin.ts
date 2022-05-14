import { Request, Response, NextFunction } from "express";


export function ensureUserLogin(
    request: Request, response: Response, next: NextFunction
){
    // TODO verificar se o usuario esta logado
    const userLogin = true;

    if (userLogin) {
        return next();
    }

    return response.status(401).json({ 
        error: "O usuário não está conectado!"
    });


}

