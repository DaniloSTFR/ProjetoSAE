import { Request, Response } from "express";
import { CategoriasListaOpcoesServices } from "../services/CategoriasListaOpcoesServices";


class CategoriasListaOpcoesController {
    async createCategoriasListaOpcoes(request: Request, response: Response){
        const {descricaoCategoriasOpcoes, nomeInternoCategoriasOpcoes, ordemCategoriasOpcoes } 
        = request.body;

        const categoriasListaOpcoesServices = new CategoriasListaOpcoesServices();
        const categoriasListaOpcoesAlreadyExists = 
            await categoriasListaOpcoesServices.findOneCategoriasListaOpcoesByNome(nomeInternoCategoriasOpcoes);

        if (typeof categoriasListaOpcoesAlreadyExists !== 'undefined'){
            return response.status(400).json({
                error: "A opção para Item já existe!",
            });
        }

        try{ 
            const categoriasListaOpcoes = await categoriasListaOpcoesServices.
                createCategoriasListaOpcoes( {descricaoCategoriasOpcoes, nomeInternoCategoriasOpcoes, ordemCategoriasOpcoes } );
            return response.status(201).json({
                message: "Item criado com sucesso!",
                status: true,
                categoriasListaOpcoes,
            });

        }catch (err){
            return response.status(400).json({
                error: err,
            });
        }
    }

    async showAllCategoriasListaOpcoes(request: Request, response: Response){
        const categoriasListaOpcoesServices = new CategoriasListaOpcoesServices();
        const allCategoriasListaOpcoes = await categoriasListaOpcoesServices.showAllCategoriasListaOpcoes();
        return response.json(allCategoriasListaOpcoes);
    }

    async findCategoriasListaOpcoesByUuId(request: Request, response: Response){
        const { codCategoriasListaOpcoesUuId} = request.body;
        const categoriasListaOpcoesServices = new CategoriasListaOpcoesServices();
        const categoriasListaOpcoes = await categoriasListaOpcoesServices.findCategoriasListaOpcoesByUuId(codCategoriasListaOpcoesUuId);
        return response.json(categoriasListaOpcoes);
    }
}

export { CategoriasListaOpcoesController };
