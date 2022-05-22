import { Request, Response } from "express";
import { ItensOpcoesServices } from "../services/ItensOpcoesServices";
import { CategoriasListaOpcoesServices } from "../services/CategoriasListaOpcoesServices";

class ItensOpcoesController {
    async createItensOpcoes(request: Request, response: Response){

        const { descricaoOpcoes, ordemOpcoes, listaOpcoesJson, nomeInternoCategoriasOpcoes}
                = request.body;

        const itensOpcoesServices = new ItensOpcoesServices();
        const categoriasListaOpcoesServices = new CategoriasListaOpcoesServices();

        try{ 
            const categoriasListaOpcoesAlreadyExists = await categoriasListaOpcoesServices.findOneCategoriasListaOpcoesByNome(nomeInternoCategoriasOpcoes);
            if (typeof categoriasListaOpcoesAlreadyExists === 'undefined'){
                return response.status(400).json({
                    error: "A opção para Item não existe!",
                });
            }
            
            const itensOpcoesRepositoryAlreadyExists = await itensOpcoesServices.findOneItensOpcoesByDescricao(descricaoOpcoes);

            if (itensOpcoesRepositoryAlreadyExists){
                return response.status(400).json({
                    error: "A opção de item já criada!",
                });
            } 


            const itensOpcoes = await itensOpcoesServices.createItensOpcoes({
                descricaoOpcoes,
                ordemOpcoes,
                codCategoriasListaOpcoesUuId: categoriasListaOpcoesAlreadyExists.codCategoriasListaOpcoesUuId,
                listaOpcoesJson,
            });

            return response.status(201).json({
                message: "Opções criadas com sucesso!",
                status: true,
                itensOpcoes,
            });

        }catch (err){
            return response.status(400).json({
                error: err,
            });
        }
            


    }

    async showAllItensOpcoes(request: Request, response: Response){
        const itensOpcoesServices = new ItensOpcoesServices();
        const all = await itensOpcoesServices.showAllItensOpcoes();
        return response.json(all);
    }

}

export { ItensOpcoesController };
