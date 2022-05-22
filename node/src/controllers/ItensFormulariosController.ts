import { Request, Response } from "express";
import { CategoriasItensServices } from "../services/CategoriasItensServices";
import { ItensFormulariosServices } from "../services/ItensFormulariosServices";
import { CategoriasListaOpcoesServices } from "../services/CategoriasListaOpcoesServices";

class ItensFormulariosController {
    async createItensFormularios(request: Request, response: Response){
        const { descricaoItem, ordemItem,opcoesItensFormJson, nomeInternoCategoriasItens, 
            nomeInternoCategoriasOpcoes}    = request.body;
        
        const categoriasItensServices = new CategoriasItensServices();
        const itensFormulariosServices = new ItensFormulariosServices();
        const categoriasListaOpcoesServices = new CategoriasListaOpcoesServices();
        
        try{ 
            const categoriasListaOpcoesAlreadyExists = await categoriasListaOpcoesServices.findOneCategoriasListaOpcoesByNome(
                nomeInternoCategoriasOpcoes);

            let codCategoriasListaOpcoesUuId = null;  
            if (categoriasListaOpcoesAlreadyExists){
                codCategoriasListaOpcoesUuId = categoriasListaOpcoesAlreadyExists.codCategoriasListaOpcoesUuId;
            }


            const categoriasItensAlreadyExists = await categoriasItensServices.findOneCategoriasItensByNome(
                nomeInternoCategoriasItens);

            if (!categoriasItensAlreadyExists){
                return response.status(400).json({
                    error: "A categorias não existe",
                });
            } 


            const itensFormulariosRepositoryAlreadyExists = await itensFormulariosServices.findOneItensFormulariosByDescricao(
                descricaoItem);

            if (itensFormulariosRepositoryAlreadyExists){
                return response.status(400).json({
                    error: "Item de fomulario já criado!",
                });
            } 
            
            const itensFormularios = await itensFormulariosServices.createItensFormularios({
                descricaoItem, 
                ordemItem,
                opcoesItensFormJson,
                codCategoriasItensUuId: categoriasItensAlreadyExists.codCategoriasItensUuId,
                codCategoriasListaOpcoesUuId,
                
            });
            
            return response.status(201).json({
                message: "Item de formulário criado com sucesso!",
                status: true,
                itensFormularios,
            });

        }catch (err){
            return response.status(400).json({
                error: err,
            });
        }
        //return response.json({message: "Os dados foram salvo com sucesso SAE!" });
    }

    async showAllItensFormularios(request: Request, response: Response){ 
        const itensFormulariosServices = new ItensFormulariosServices();
        const itensFormulariosAll = await itensFormulariosServices.showAllItensFormularios();
        return response.json(itensFormulariosAll);
    }

    async findOneItensFormularios(request: Request, response: Response){
        const { codItensFormularios, nomeInternoCategoriasItens} = request.body;
        const itensFormulariosServices = new ItensFormulariosServices();

        const itensFormularios = await itensFormulariosServices.findOneItensFormularios(codItensFormularios);
        return response.json(itensFormularios);
    }

}

export { ItensFormulariosController };
