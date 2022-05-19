import { Request, Response } from "express";
import { ComentarioProntuarioServices } from "../services/ComentarioProntuarioServices"

class ComentarioProntuarioController{

    async createComentarioProntuarios(request: Request, response: Response){
        const { codProntuarioUuId, codUsuarioUuId, comentarioProntuario,}  = request.body;
        
        const comentarioProntuarioServices = new ComentarioProntuarioServices();

        try {
            const novocomentarioProntuario =  await comentarioProntuarioServices.
            createComentarioProntuario({ codProntuarioUuId, codUsuarioUuId, comentarioProntuario,} );

            return response.status(201).json({
                message: "Comentario criado com sucesso!",
                status: true,
                novocomentarioProntuario,
            });

        } catch (err){
            return response.status(400).json({
                error: err,
            });
        }

    }

}

export {ComentarioProntuarioController};
