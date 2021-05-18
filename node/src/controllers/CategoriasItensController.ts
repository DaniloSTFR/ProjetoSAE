import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { SaeCategoriasitens } from "../models/SaeCategoriasitens";

class CategoriasItensController {
    async create(request: Request, response: Response){
        const { descricaoCategorias, nomeInternoCategorias, ordemCategoria}
                = request.body;
        
        const categoriasItensRepository = getRepository(SaeCategoriasitens);

        const categoriasItensAlreadyExists = await categoriasItensRepository.findOne({
            nomeInternoCategorias,
        })

        if (categoriasItensAlreadyExists){
            return response.status(400).json({
                error: "Categoria de Item já criada!",
            });
        }

        const categoriasItens = categoriasItensRepository.create({
            descricaoCategorias, 
            nomeInternoCategorias, 
            ordemCategoria,
        });

        await categoriasItensRepository.save(categoriasItens);

        return response.json(categoriasItens);
    }
}

export { CategoriasItensController };