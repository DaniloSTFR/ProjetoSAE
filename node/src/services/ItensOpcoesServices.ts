import { ItensOpcoesRepository } from "../repositories/ItensOpcoesRepository";
import { getCustomRepository } from "typeorm";

interface IItensOpcoes{
    descricaoOpcoes: string, 
    ordemOpcoes: number,
    codCategoriasListaOpcoesUuId: string, 
    listaOpcoesJson: object
}
class ItensOpcoesServices{

    async createItensOpcoes({ descricaoOpcoes, ordemOpcoes, listaOpcoesJson, codCategoriasListaOpcoesUuId}:IItensOpcoes){
        const itensOpcoesRepository = getCustomRepository( ItensOpcoesRepository);
        const itensOpcoes = itensOpcoesRepository.create({
            descricaoOpcoes, ordemOpcoes,codCategoriasListaOpcoesUuId, listaOpcoesJson
        });

        await itensOpcoesRepository.save(itensOpcoes);
        return itensOpcoes;
    }


    async showAllItensOpcoes(){
        const itensOpcoesRepository = getCustomRepository( ItensOpcoesRepository);
        const allitensOpcoes = await itensOpcoesRepository.find();
        return allitensOpcoes;
    }

    async findItensOpcoesById(codItensOpcoes: number){

        const itensOpcoesRepository = getCustomRepository( ItensOpcoesRepository);
        const allitensOpcoes = await itensOpcoesRepository.find({
            where: [{codItensOpcoes}],
            relations: ["codCategoriasListaOpcoesUu"],  
            order: {
                ordemOpcoes: "ASC",
            },
        });
        return allitensOpcoes;
    }

    async findOneItensOpcoesByDescricao(descricaoOpcoes: string){

        const itensOpcoesRepository = getCustomRepository( ItensOpcoesRepository);
        const allitensOpcoes = await itensOpcoesRepository.findOne({
            where: [{descricaoOpcoes}],
            relations: ["codCategoriasListaOpcoesUu"],  
            order: {
                ordemOpcoes: "ASC",
            },
        });
        return allitensOpcoes;
    }

    async findOneItensOpcoesById(codItensOpcoes: number){
        const itensOpcoesRepository = getCustomRepository( ItensOpcoesRepository);
        const itensOpcoes = await itensOpcoesRepository.findOne({codItensOpcoes});
        return itensOpcoes;
    }

}

export {ItensOpcoesServices};