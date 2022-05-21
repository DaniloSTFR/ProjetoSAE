import { getCustomRepository } from "typeorm";
import { ComentarioProntuarioRepository } from "../repositories/ComentarioProntuarioRepository";
import { GetDateNow } from "../util/GetDateNow";
interface IComentarioProntuario{
    codProntuarioUuId: string,
    codUsuarioUuId: string,
    comentarioProntuario?: string
}

class ComentarioProntuarioServices{

    async createComentarioProntuario({
        codProntuarioUuId, 
        codUsuarioUuId,
        comentarioProntuario = '', 
        }: IComentarioProntuario){

        const comentarioProntuarioRepository = getCustomRepository(ComentarioProntuarioRepository);
    
        const getDateNow = new GetDateNow();
        const datenow = getDateNow.getDateNow();
        const novocomentarioProntuario =  comentarioProntuarioRepository.create({
            codProntuarioUuId,
            codUsuarioUuId, 
            comentarioProntuario,
            dataCriacao: datenow,

        });

        await comentarioProntuarioRepository.save(novocomentarioProntuario);

        return novocomentarioProntuario;
    }
    
}

export {ComentarioProntuarioServices};