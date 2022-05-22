import { Request, Response } from "express";
import { RascunhoProntuarioServices } from "../services/RascunhoProntuarioServices";

class RascunhoProntuarioController{
    async createRascunhoProntuarios(request: Request, response: Response){
        const{codProntuarioUuId,codUsuarioUuId,formKeysRascunhoJson} = request.body;
        const rascunhoProntuarioServices = new RascunhoProntuarioServices();

        try{ 
            const rascunhoProntuario = await rascunhoProntuarioServices.
            createRascunhoProntuario({codProntuarioUuId,codUsuarioUuId,formKeysRascunhoJson} );

            return response.status(201).json({
                message: "Rascunho criado com sucesso!",
                status: true,
                rascunhoProntuario,
            });

        }catch (err){
            return response.status(400).json({
                message: "Erro ao criar a Rascunho!",
                error: err,
            });
        }

    }

    async showAllRascunhoProntuarios(request: Request, response: Response){
        const{codUsuarioUuId} = request.body;
        const rascunhoProntuarioServices = new RascunhoProntuarioServices();
        const allRascunhoProntuario= await rascunhoProntuarioServices.showAllRascunhoProntuario(codUsuarioUuId);
        return response.json(allRascunhoProntuario);

    }

    async updateRascunhoProntuarios(request: Request, response: Response){
        const{codRascunhoProntuarioUuId,formKeysRascunhoJson} = request.body;
        const rascunhoProntuarioServices = new RascunhoProntuarioServices();

        try{ 
            const rascunhoProntuario = await rascunhoProntuarioServices.
            updateRascunhoProntuario({codRascunhoProntuarioUuId, formKeysRascunhoJson} );

            return response.status(201).json({
                message: "Rascunho atualizado com sucesso!",
                status: true,
                rascunhoProntuario,
            });

        }catch (err){
            return response.status(400).json({
                message: "Erro ao atualizar o Rascunho!",
                error: err,
            });
        }
    }

    async deleteRascunhoProntuarios(request: Request, response: Response){
        const{codRascunhoProntuarioUuId} = request.body;
        const rascunhoProntuarioServices = new RascunhoProntuarioServices();

        try{ 
            await rascunhoProntuarioServices.deleteRascunhoProntuario(codRascunhoProntuarioUuId);

            return response.status(201).json({
                message: "Rascunho excluído com sucesso!",
                status: true,
            });

        }catch (err){
            return response.status(400).json({
                message: "Erro ao excluir o Rascunho!",
                error: err,
            });
        }

    }


}

export {RascunhoProntuarioController};

