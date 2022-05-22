import { getCustomRepository } from "typeorm";
import { CategoriasItensRepository } from "../repositories/CategoriasItensRepository";

interface ICategoriasItens{
    descricaoCategoriasItens: string,
    nomeInternoCategoriasItens?: string,
    ordemCategoriaItens: number
}

class CategoriasItensServices{

    async createCategoriasItens({ descricaoCategoriasItens, nomeInternoCategoriasItens, ordemCategoriaItens}: ICategoriasItens){
        const categoriasItensRepository = getCustomRepository( CategoriasItensRepository);

        const categoriasItens = categoriasItensRepository.create({
            descricaoCategoriasItens, 
            nomeInternoCategoriasItens, 
            ordemCategoriaItens,
        });

        await categoriasItensRepository.save(categoriasItens);

        return categoriasItens;
    }

    async showAllCategoriasItens(){
        const categoriasItensRepository = getCustomRepository( CategoriasItensRepository);
        const allcategoriasItens = await categoriasItensRepository.find({
            order: {
                ordemCategoriaItens: "ASC",
            },
        });
        return allcategoriasItens;
    }


    async findCategoriasItensByNome( nomeInternoCategoriasItens: string){

        const categoriasItensRepository = getCustomRepository( CategoriasItensRepository);
        const categoriasItens = await categoriasItensRepository.find({
            where: [{nomeInternoCategoriasItens}],
            relations: ["saeItensformularios"],  
            order: {
                ordemCategoriaItens: "ASC",
            },
        });
        return categoriasItens;
    }

    async findOneCategoriasItensByNome( nomeInternoCategoriasItens: string){
        const categoriasItensRepository = getCustomRepository( CategoriasItensRepository);
        const categoriasItens = await categoriasItensRepository.findOne({nomeInternoCategoriasItens});
        return categoriasItens;
    }

}

export {CategoriasItensServices};