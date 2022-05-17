import { Request, Response } from "express";
import { ProntuarioServices } from "../services/ProntuarioServices"
import { NumeroProntuarioServices } from "../services/NumeroProntuarioServices"

class ProntuarioController {

    async createProntuarios(request: Request, response: Response){
       const { codUsuarioUuId, nomePaciente, dataNascimento,
            altura, peso, imc, glicemia, pressaoArterial, oximetria } = request.body;

        const prontuarioServices = new ProntuarioServices();
        const numeroProntuarioServices = new NumeroProntuarioServices();

        try{ 
            const novoProntuario = await prontuarioServices.createProntuario( { codUsuarioUuId, nomePaciente, dataNascimento,
                                    altura, peso, imc, glicemia, pressaoArterial, oximetria } );
            
            const codProntuarioUuId = novoProntuario.codProntuarioUuId;
            const novoNumeroprontuario = await numeroProntuarioServices.createNumeroProntuario({codProntuarioUuId});                                    const numeroprontuario = 1

            return response.status(201).json({
                message: `Prontuário número ${novoNumeroprontuario.numeroprontuario}, criado com sucesso!`,
                status: true,
                novoProntuario,
                novoNumeroprontuario,
            });

        }catch (err){
            return response.status(400).json({
                error: err,
            });
        }          
    }

    async findProntuarioCompleteByUuId(request: Request, response: Response){
        const { codProntuarioUuId } = request.body;
        const prontuarioServices = new ProntuarioServices();
        const prontuarioFind = await prontuarioServices.findProntuarioCompleteByUuId(codProntuarioUuId);
        return response.json(prontuarioFind);
    }

    async findProntuarioCompleteByNumero(request: Request, response: Response){
        const { numeroprontuario } = request.body;
        const prontuarioServices = new ProntuarioServices();
        const prontuarioCompleteFind = await prontuarioServices.findProntuarioCompleteByNumero(numeroprontuario);
        return response.json(prontuarioCompleteFind);
    }
    


}

export {ProntuarioController};
