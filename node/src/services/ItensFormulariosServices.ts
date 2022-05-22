import { ItensFormulariosRepository } from "../repositories/ItensFormulariosRepository";
import { getCustomRepository } from "typeorm";

interface IItensFormularios{
    descricaoItem: string, 
    ordemItem: number,
    opcoesItensFormJson:  object,
    codCategoriasItensUuId: string,
    codCategoriasListaOpcoesUuId: string,
}
class ItensFormulariosServices{

    async createItensFormularios({
        descricaoItem, ordemItem, opcoesItensFormJson,
        codCategoriasItensUuId,codCategoriasListaOpcoesUuId,}:IItensFormularios){

        const itensFormulariosRepository = getCustomRepository( ItensFormulariosRepository);
        const itensFormularios = itensFormulariosRepository.create({
            descricaoItem, 
            ordemItem,
            opcoesItensFormJson,
            codCategoriasItensUuId,
            codCategoriasListaOpcoesUuId,
        })
        await itensFormulariosRepository.save(itensFormularios);
        return itensFormularios;
    }

    async findOneItensFormulariosByDescricao( descricaoItem: string){
        const itensFormulariosRepository = getCustomRepository( ItensFormulariosRepository);
        const itensFormularios = await itensFormulariosRepository.findOne({descricaoItem});
        return itensFormularios;
    }

    async showAllItensFormularios(){
        const itensFormulariosRepository = getCustomRepository( ItensFormulariosRepository);
        const allItensFormularios = await itensFormulariosRepository.find();
        return allItensFormularios;
    }

    async findOneItensFormularios(codItensFormularios: string){
        const itensFormulariosRepository = getCustomRepository( ItensFormulariosRepository);
        const itensFormulario = await itensFormulariosRepository.findOne({
            where: [{codItensFormularios}],
            relations: ["codCategoriasItensUu", "codCategoriasListaOpcoesUu"],  
            order: {
                descricaoItem: "ASC",
            },
        });
        return itensFormulario;
    }
}

export {ItensFormulariosServices};