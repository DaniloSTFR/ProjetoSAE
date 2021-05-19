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

        return response.json(categoriasItens);
    }
}

export { CategoriasItensController };
