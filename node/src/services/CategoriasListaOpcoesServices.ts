import { CategoriasListaOpcoesRepository } from "../repositories/CategoriasListaOpcoesRepository";
import { getCustomRepository } from "typeorm";

interface ICategoriasListaOpcoes{
    descricaoCategoriasOpcoes: string, 
    nomeInternoCategoriasOpcoes: string, 
    ordemCategoriasOpcoes: number
}
class CategoriasListaOpcoesServices{

    async createCategoriasListaOpcoes({descricaoCategoriasOpcoes, nomeInternoCategoriasOpcoes, ordemCategoriasOpcoes }:ICategoriasListaOpcoes){
        const categoriasListaOpcoesRepository = getCustomRepository( CategoriasListaOpcoesRepository);
        const categoriasListaOpcoes = categoriasListaOpcoesRepository.create({
            descricaoCategoriasOpcoes, 
            nomeInternoCategoriasOpcoes, 
            ordemCategoriasOpcoes,
        });

        await categoriasListaOpcoesRepository.save(categoriasListaOpcoes);
        return categoriasListaOpcoes;
    }


    async showAllCategoriasListaOpcoes(){
        const categoriasListaOpcoesRepository = getCustomRepository( CategoriasListaOpcoesRepository);
        const allcategoriasLista = await categoriasListaOpcoesRepository.find();
        return allcategoriasLista;
    }

    async findCategoriasListaOpcoesByUuId(codCategoriasListaOpcoesUuId: string){

        const categoriasListaOpcoesRepository = getCustomRepository( CategoriasListaOpcoesRepository);
        const allcategoriasListaOpcoes = await categoriasListaOpcoesRepository.find({
            where: [{codCategoriasListaOpcoesUuId}],
            relations: ["saeItensopcoes"],  
            order: {
                ordemCategoriasOpcoes: "ASC",
            },
        });
        return allcategoriasListaOpcoes;
    }

    async findOneCategoriasListaOpcoesByNome(nomeInternoCategoriasOpcoes: string){
        const categoriasListaOpcoesRepository = getCustomRepository( CategoriasListaOpcoesRepository);
        const categoriasListaOpcoes = await categoriasListaOpcoesRepository.findOne({nomeInternoCategoriasOpcoes});
        return categoriasListaOpcoes;
    }

}

export {CategoriasListaOpcoesServices};