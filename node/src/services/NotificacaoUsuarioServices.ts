import { getCustomRepository } from "typeorm";
import { NotificacaousuarioRepository } from "../repositories/NotificacaousuarioRepository";
import { GetDateNow } from "../util/GetDateNow"; 
import { instanceToPlain } from "class-transformer";

interface INotificacaousuario{
    codUsuarioUuId : string,
    codComentarioProntuarioUuId : string,
    usuarioAlvo : string,
    codNotificacaoUsuarioAlvoUuId: string,
    notificacaoVista? : string,
}

class NotificacaoUsuarioServices{

    async createNotificacaoUsuario({
        codUsuarioUuId,
        codComentarioProntuarioUuId,
        usuarioAlvo,
        codNotificacaoUsuarioAlvoUuId,
        notificacaoVista,
    }:INotificacaousuario){

        const notificacaousuarioRepository = getCustomRepository( NotificacaousuarioRepository);
 
        const getDateNow = new GetDateNow();
        const datenow = getDateNow.getDateNow();

        const notificacaousuario = notificacaousuarioRepository.create({
            codUsuarioUuId,
            codComentarioProntuarioUuId,
            usuarioAlvo,
            codNotificacaoUsuarioAlvoUuId,
            notificacaoVista,
            dataCriacao: datenow,
        });

        await notificacaousuarioRepository.save(notificacaousuario);

        return notificacaousuario;
    }

    async showAllNotificacoesUsuarioNaoVistas(codNotificacaoUsuarioAlvoUuId: string){
        const notificacaousuarioRepository = getCustomRepository( NotificacaousuarioRepository);
        const notificacaosusuario = await notificacaousuarioRepository.find(
            {
                where: [
                    { codNotificacaoUsuarioAlvoUuId,
                      notificacaoVista: 'NÃO'
                    },
                ],relations: ["codUsuarioUu","codComentarioProntuarioUu"],
                order: {
                    dataCriacao: "DESC",
                },  
            });
        
        return instanceToPlain(notificacaosusuario);
    }

    async updateStatusNotificacaoUsuarioVista(codNotificacaoUsuarioUuId: string){
        const notificacaousuarioRepository = getCustomRepository( NotificacaousuarioRepository);
        const notificacaosusuario = await notificacaousuarioRepository.findOne(
            {
                where: [
                    { codNotificacaoUsuarioUuId,
                    },
                ],
            });
        notificacaosusuario.notificacaoVista = 'SIM';

        await notificacaousuarioRepository.save(notificacaosusuario);
    }
}



export {NotificacaoUsuarioServices};

