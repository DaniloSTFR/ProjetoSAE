import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { CategoriasItensRepository } from "../repositories/CategoriasItensRepository";
import { ItensFormulariosRepository } from "../repositories/ItensFormulariosRepository";
import { CategoriasListaOpcoesRepository } from "../repositories/CategoriasListaOpcoesRepository";

class ItensFormulariosController {
    async create(request: Request, response: Response){
        const { descricaoItem, ordemItem,opcoesItensFormJson, nomeInternoCategoriasItens, 
            nomeInternoCategoriasOpcoes}    = request.body;
        
        const itensFormulariosRepository = getCustomRepository( ItensFormulariosRepository);
        const categoriasItensRepository = getCustomRepository( CategoriasItensRepository);
        const categoriasListaOpcoesRepository = getCustomRepository( CategoriasListaOpcoesRepository);
        

         
        const categoriasListaOpcoesAlreadyExists = await categoriasListaOpcoesRepository.findOne({
            nomeInternoCategoriasOpcoes,
        })

        let codCategoriasListaOpcoesUuId = null;  
        if (categoriasListaOpcoesAlreadyExists){
            codCategoriasListaOpcoesUuId = categoriasListaOpcoesAlreadyExists.codCategoriasListaOpcoesUuId;
        }


        const categoriasItensAlreadyExists = await categoriasItensRepository.findOne({
            nomeInternoCategoriasItens,
        })

        if (!categoriasItensAlreadyExists){
            return response.status(400).json({
                error: "A categorias não existe",
            });
        } 


        const itensFormulariosRepositoryAlreadyExists = await itensFormulariosRepository.findOne({
            descricaoItem,
        })

        if (itensFormulariosRepositoryAlreadyExists){
            return response.status(400).json({
                error: "Item de fomulario já criada!",
            });
        } 

        
         const itensFormularios = itensFormulariosRepository.create({
            descricaoItem, 
            ordemItem,
            opcoesItensFormJson,
            codCategoriasItensUuId: categoriasItensAlreadyExists.codCategoriasItensUuId,
            codCategoriasListaOpcoesUuId,
            
        })
        
        await itensFormulariosRepository.save(itensFormularios);

        return response.status(201).json(itensFormularios);
     
        //return response.json({message: "Os dados foram salvo com sucesso SAE!" });
    }

    async show(request: Request, response: Response){
        const itensFormulariosRepository = getCustomRepository( ItensFormulariosRepository);
        const all = await itensFormulariosRepository.find();
        return response.json(all);
    }

    async showone(request: Request, response: Response){
        const { codItensFormularios, nomeInternoCategoriasItens} = request.body;

        const itensFormulariosRepository = getCustomRepository( ItensFormulariosRepository);
        const one = await itensFormulariosRepository.findOne({
            where: [{codItensFormularios}],
            relations: ["codCategoriasItensUu", "codCategoriasListaOpcoesUu"],  
            order: {
                descricaoItem: "ASC",
            },
        });
        return response.json(one);
    }

}

export { ItensFormulariosController };
