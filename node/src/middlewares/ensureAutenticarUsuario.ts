import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}

export function ensureAutenticarUsuario(
    request: Request, response: Response, next: NextFunction
){
    // TODO verificar se o usuario esta logado

    // receber token
    const authToken = request.headers.authorization;
    if (!authToken){
        return response.status(401).json({ 
            error: "O usuário não está autorizado!"
        }); 
    }
    // validar token
    const [,token] =  authToken.split(" ");
    try{
        const { sub } = verify(token, "8e4f47754fdec7a65308baf4b7f782fd") as IPayload;
        request.codUsuarioUuId = sub;

    }catch(err){
        return response.status(401).json({ 
            error: "O usuário não está autorizado!"
        }); 
    }


   return next();

}

