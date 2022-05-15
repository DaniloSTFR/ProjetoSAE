import { getCustomRepository } from "typeorm";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { GetDateNow } from "../util/GetDateNow"; 


interface IUsuario{
    nomeUsuario: string, 
    nomePessoa: string,
    email: string, 
    senha: string, 
}

class UsuarioServices{

    async createUsuario({ nomeUsuario, nomePessoa, email, senha}: IUsuario){

        const usuarioRepository = getCustomRepository( UsuarioRepository);
 
        const getDateNow = new GetDateNow();
        const datenow = getDateNow.getDateNow();

        const usuario = usuarioRepository.create({
            nomeUsuario, 
            nomePessoa, 
            email, 
            senha,
            dataCadastro: datenow,
        });
        
        await usuarioRepository.save(usuario);

        return usuario;
    }

    async findUser(usuario: string){
        const usuarioRepository = getCustomRepository( UsuarioRepository);
        const usuarioExists = await usuarioRepository.findOne(
            {
                where: [
                    { nomeUsuario: usuario,},
                    { email: usuario,},
                ],
            });
        
        return usuarioExists;
    }

    async findUserByUuId(codUsuarioUuId: string){
        const usuarioRepository = getCustomRepository( UsuarioRepository);
        const usuarioExists = await usuarioRepository.findOne({
            codUsuarioUuId,
        });
        
        return usuarioExists;
    }


    async findEmail(email: string){
        const usuarioRepository = getCustomRepository( UsuarioRepository);
        const emailExists = await usuarioRepository.findOne({
            email,
        });
        
        return emailExists;
    }

    async getAllUser(){
        const usuarioRepository = getCustomRepository( UsuarioRepository);
        const allUser = await usuarioRepository.find(
            {
                select: ['nomeUsuario', 'nomePessoa','email', 'dataCadastro', 'dataExclusao'],
            });
        return allUser;
    }


}

export {UsuarioServices};