import { Request, Response } from "express";
import { NotificacaoUsuarioServices } from "../services/NotificacaoUsuarioServices";
import { UsuarioServices } from "../services/UsuarioServices"


class NotificacaoUsuarioController {
    async createNotificacaoUsuarios(request: Request, response: Response){
        const{codUsuarioUuId, codComentarioProntuarioUuId, usuarioAlvo, notificacaoVista} = request.body;
        const notificacaoUsuarioServices = new NotificacaoUsuarioServices();

        const usuarioServices =  new UsuarioServices()
        const usuariofind = await usuarioServices.findUserbyNameUserOrEmail(usuarioAlvo.replace("@",""));

        // verificar usuario e senha
        if (typeof usuariofind === 'undefined'){     
                return response.status(400).json({
                    error: `Usuário ${usuarioAlvo},não encontrado!`,});
        }

        try{ 
            const notificacaoUsuario = await notificacaoUsuarioServices.
            createNotificacaoUsuario( {codUsuarioUuId, codComentarioProntuarioUuId, usuarioAlvo, 
                codNotificacaoUsuarioAlvoUuId:usuariofind.codUsuarioUuId, notificacaoVista} );

            return response.status(201).json({
                message: "Notificação criada com sucesso!",
                status: true,
                notificacaoUsuario,
            });

        }catch (err){
            return response.status(400).json({
                message: "Erro ao criar a Notificação!",
                error: err,
            });
        }
    }

    async showAllNotificacoesUsuarioNaoVistas(request: Request, response: Response){
        const{codNotificacaoUsuarioAlvoUuId} = request.body;
        const notificacaoUsuarioServices = new NotificacaoUsuarioServices();
        const allnotificacaoUsuario= await notificacaoUsuarioServices.showAllNotificacoesUsuarioNaoVistas(codNotificacaoUsuarioAlvoUuId);
        return response.json(allnotificacaoUsuario);
    }

    
    async updateStatusNotificacaoUsuarioVista(request: Request, response: Response){
        const{codNotificacaoUsuarioUuId} = request.body;
        const notificacaoUsuarioServices = new NotificacaoUsuarioServices();

        
        try{ 
            await notificacaoUsuarioServices.updateStatusNotificacaoUsuarioVista(codNotificacaoUsuarioUuId);
            
            return response.status(201).json({
                message: "Status da Notificação alterado com sucesso!",
            });

        }catch (err){
            return response.status(400).json({
                message: "Erro ao status da Notificação!",
                error: err,
            });
        }
    }




}

export {NotificacaoUsuarioController};
