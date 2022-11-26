import { getCustomRepository } from "typeorm";
import { RascunhoProntuarioRepository } from "../repositories/RascunhoProntuarioRepository";
import { GetDateNow } from "../util/GetDateNow"; 
import { instanceToPlain } from "class-transformer";

interface IRascunhoProntuario{
    codProntuarioUuId : string,
    codUsuarioUuId : string,
    formKeysRascunhoJson?: object,
}

interface IUpdateRascunhoProntuario{
    codRascunhoProntuarioUuId: string,
    formKeysRascunhoJson: object,
}

class RascunhoProntuarioServices {

    async createRascunhoProntuario( 
        {codProntuarioUuId,codUsuarioUuId,formKeysRascunhoJson}:IRascunhoProntuario)
    {
        const rascunhoProntuarioRepository = getCustomRepository( RascunhoProntuarioRepository);
        const getDateNow = new GetDateNow();
        const datenow = getDateNow.getDateNow();

        const rascunhoProntuario = rascunhoProntuarioRepository.create({
            codProntuarioUuId,
            codUsuarioUuId,
            formKeysRascunhoJson,
            dataCriacao: datenow,
        });

        await rascunhoProntuarioRepository.save(rascunhoProntuario);

        return rascunhoProntuario;
    }

    async showAllRascunhoProntuario(codUsuarioUuId: string){
        const rascunhoProntuarioRepository = getCustomRepository( RascunhoProntuarioRepository);
        const allRascunhoProntuario = await rascunhoProntuarioRepository.find({codUsuarioUuId});  
        return instanceToPlain(allRascunhoProntuario);
    }

    async updateRascunhoProntuario({codRascunhoProntuarioUuId,formKeysRascunhoJson}:IUpdateRascunhoProntuario){
        const rascunhoProntuarioRepository = getCustomRepository( RascunhoProntuarioRepository);
        const rascunhoProntuario = await rascunhoProntuarioRepository.findOne({codRascunhoProntuarioUuId});

        const getDateNow = new GetDateNow();
        const datenow = getDateNow.getDateNow();

        rascunhoProntuario.formKeysRascunhoJson = formKeysRascunhoJson;
        rascunhoProntuario.dataCriacao = new Date(datenow);
        //console.log(rascunhoProntuario.dataCriacao);

        await rascunhoProntuarioRepository.save(rascunhoProntuario);

        return rascunhoProntuario;
    }

    async deleteRascunhoProntuario(codRascunhoProntuarioUuId: string){
        const rascunhoProntuarioRepository = getCustomRepository( RascunhoProntuarioRepository);
        //const rascunhoProntuario = await rascunhoProntuarioRepository.findOne({codRascunhoProntuarioUuId});
        await rascunhoProntuarioRepository.delete(codRascunhoProntuarioUuId);
    }
}

export {RascunhoProntuarioServices};