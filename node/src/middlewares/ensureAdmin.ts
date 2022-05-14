import { Request, Response, NextFunction } from "express";


export function ensureAdmin(
    request: Request, response: Response, next: NextFunction
){
    // TODO verificar se o usuario esta logado
    const admin = true;

    if (admin) {
        return next();
    }

    return response.status(401).json({ 
        error: "O usuário não tem privilégios!"
    });


}

