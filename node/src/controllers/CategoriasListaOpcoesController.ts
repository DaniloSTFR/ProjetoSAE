import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { CategoriasListaOpcoesRepository } from "../repositories/CategoriasListaOpcoesRepository";

class CategoriasListaOpcoesController {
    async create(request: Request, response: Response){
        const {descricaoCategoriasOpcoes, nomeInternoCategoriasOpcoes, ordemCategoriasOpcoes } 
        = request.body;

        const categoriasListaOpcoesRepository = getCustomRepository( CategoriasListaOpcoesRepository);

        
        const categoriasListaOpcoesAlreadyExists = await categoriasListaOpcoesRepository.findOne({
            nomeInternoCategoriasOpcoes,
        })

        if (categoriasListaOpcoesAlreadyExists){
            return response.status(400).json({
                error: "A opção para Item já existe!",
            });
        }

        const categoriasListaOpcoes = categoriasListaOpcoesRepository.create({
            descricaoCategoriasOpcoes, 
            nomeInternoCategoriasOpcoes, 
            ordemCategoriasOpcoes,
        });

        await categoriasListaOpcoesRepository.save(categoriasListaOpcoes);

        return response.status(201).json(categoriasListaOpcoes);
    }

    async show(request: Request, response: Response){
        const categoriasListaOpcoesRepository = getCustomRepository( CategoriasListaOpcoesRepository);
        const all = await categoriasListaOpcoesRepository.find();
        return response.json(all);
    }

    async showcategoriaslistaopcoes(request: Request, response: Response){
        const { codCategoriasListaOpcoesUuId} = request.body;

        const categoriasListaOpcoesRepository = getCustomRepository( CategoriasListaOpcoesRepository);
        const all = await categoriasListaOpcoesRepository.find({
            where: [{codCategoriasListaOpcoesUuId}],
            relations: ["saeItensopcoes"],  
            order: {
                ordemCategoriasOpcoes: "ASC",
            },
        });
        return response.json(all);
    }
}

export { CategoriasListaOpcoesController };
