import { Request, Response, NextFunction } from "express";
import { UsuarioServices } from "../services/UsuarioServices"


export async function ensureAdmin(
    request: Request, response: Response, next: NextFunction
){
    // TODO construir metodos e tabelas para criar e validar perfils
    // BuscarUsuarioINcontroller()
    // BuscarPerfilINController()
    // Criartabela

    const { codUsuarioUuId } = request;
    
    const usuarioServices =  new UsuarioServices();
    const usuario = await usuarioServices.findUserByUuId(codUsuarioUuId);

    //const admin = true;

    if (usuario) {
        return next();
    }

    return response.status(401).json({ 
        error: "O usuário não tem privilégios!"
    });


}

