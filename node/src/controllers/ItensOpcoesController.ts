import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { CategoriasListaOpcoesRepository } from "../repositories/CategoriasListaOpcoesRepository";
import { ItensOpcoesRepository } from "../repositories/ItensOpcoesRepository";


interface IItensOpcoes{
    descricaoOpcoes: string, 
    ordemOpcoes: number, 
    listaOpcoesJson: {}, 
    nomeInternoCategoriasOpcoes: string, 
}//TODO implementar  o uso de interface

class ItensOpcoesController {
    async create(request: Request, response: Response){
        const { descricaoOpcoes, ordemOpcoes, listaOpcoesJson, nomeInternoCategoriasOpcoes}
                = request.body;
        
        const itensOpcoesRepository = getCustomRepository( ItensOpcoesRepository);
        const categoriasListaOpcoesRepository = getCustomRepository( CategoriasListaOpcoesRepository);

        const categoriasListaOpcoesAlreadyExists = await categoriasListaOpcoesRepository.findOne({
            nomeInternoCategoriasOpcoes,
        })

        const itensOpcoesRepositoryAlreadyExists = await itensOpcoesRepository.findOne({
            descricaoOpcoes,
        })

        if(itensOpcoesRepositoryAlreadyExists){
            throw new Error() 
        }

/*         if (itensOpcoesRepositoryAlreadyExists){
            return response.status(400).json({
                error: "A opção de item já criada!",
            });
        } */

        const itensOpcoes = itensOpcoesRepository.create({
            descricaoOpcoes,
            ordemOpcoes,
            codCategoriasListaOpcoesUuId: categoriasListaOpcoesAlreadyExists.codCategoriasListaOpcoesUuId,
            listaOpcoesJson,
        });
        
        await itensOpcoesRepository.save(itensOpcoes);

        return response.status(201).json(itensOpcoes);
    }

    async show(request: Request, response: Response){
        const itensOpcoesRepository = getCustomRepository( ItensOpcoesRepository);
        const all = await itensOpcoesRepository.find();
        return response.json(all);
    }

}

export { ItensOpcoesController };
