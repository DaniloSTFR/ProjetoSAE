import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { CategoriasItensRepository } from "../repositories/CategoriasItensRepository";

class CategoriasItensController {
    async create(request: Request, response: Response){
        const { descricaoCategoriasItens, nomeInternoCategoriasItens, ordemCategoriaItens}
                = request.body;
        
        const categoriasItensRepository = getCustomRepository( CategoriasItensRepository);

        const categoriasItensAlreadyExists = await categoriasItensRepository.findOne({
            nomeInternoCategoriasItens,
        })

        if (categoriasItensAlreadyExists){
            return response.status(400).json({
                error: "Categoria de Item já criada!",
            });
        }

        const categoriasItens = categoriasItensRepository.create({
            descricaoCategoriasItens, 
            nomeInternoCategoriasItens, 
            ordemCategoriaItens,
        });

        await categoriasItensRepository.save(categoriasItens);

        return response.status(201).json(categoriasItens);
    }

    async show(request: Request, response: Response){
        const categoriasItensRepository = getCustomRepository( CategoriasItensRepository);
        const all = await categoriasItensRepository.find({
            order: {
                ordemCategoriaItens: "ASC",
            },
        });
        return response.json(all);
    }

    async showcategoriasitens(request: Request, response: Response){
        const { nomeInternoCategoriasItens} = request.body;

        const categoriasItensRepository = getCustomRepository( CategoriasItensRepository);
        const all = await categoriasItensRepository.find({
            where: [{nomeInternoCategoriasItens}],
            relations: ["saeItensformularios"],  
            order: {
                ordemCategoriaItens: "ASC",
            },
        });
        return response.json(all);
    }

}

export { CategoriasItensController };
