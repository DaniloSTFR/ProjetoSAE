import { Request, Response } from "express";
import { UsuarioServices } from "../services/UsuarioServices"
import { validate } from "deep-email-validator";
import { hash } from "bcryptjs";

class UsuarioController {
    async createUsuarios(request: Request, response: Response){
        const { nomeUsuario, nomePessoa, email, senha}  = request.body;
        const usuarioServices =  new UsuarioServices();

        const nomeUsuarioAlreadyExists = await usuarioServices.findUser(nomeUsuario);
        const validar_email = await validate(email);
        const emailAlreadyExists = await usuarioServices.findEmail(email);

/*         if(usuarioRepositoryAlreadyExists){
            throw new Error() 
        } */

        if (nomeUsuarioAlreadyExists){
            return response.status(400).json({
                error: "Usuário já possui cadastro!",
            });
        }else  if (!validar_email.validators.regex.valid){
            return response.status(400).json({
                error: "O e-mail não é valido!",
                validar_email,
            });            
        }else  if (emailAlreadyExists){
            return response.status(400).json({
                error: "E-mail já  cadastrado!",
            });
        } 

        const senhaHash = await hash(senha, 8);

        try{ 
            const novoUsuario = await usuarioServices.createUsuario( { nomeUsuario, nomePessoa, email, senha: senhaHash} );

            return response.status(201).json({
                message: "Usuário criado com sucesso!",
                status: true,
                novoUsuario,
            });

        }catch (err){
            return response.status(400).json({
                error: err,
            });
        }

    }

    async autenticarUsuarios(request: Request, response: Response){
        const { usuario, senha} = request.body;
        const usuarioServices =  new UsuarioServices()
        const usuariofind = await usuarioServices.findUser(usuario);

        if (typeof usuariofind !== 'undefined'){
            if(usuariofind.senha !== senha){
                return response.status(400).json({
                    error: "Usuário ou senha incorreta!",
                });
            }
        }else{
            return response.status(400).json({
                error: "Usuário ou senha incorreta!",
            });
        }

        usuariofind.statusLogin = true;
        return response.status(201).json(usuariofind);
    }

    async showAllUsuarios(request: Request, response: Response){        
        const usuarioServices =  new UsuarioServices()
        const allUsers = await usuarioServices.getAllUser();
        return response.json(allUsers);
    }

}

export { UsuarioController };
