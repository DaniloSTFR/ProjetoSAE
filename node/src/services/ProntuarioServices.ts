import { getCustomRepository } from "typeorm";
import { ProntuarioRepository } from "../repositories/ProntuarioRepository";
import { NumeroProntuarioRepository } from "../repositories/NumeroProntuarioRepository";
import { AnamneseDiagnosticoServices } from "../services/AnamneseDiagnosticoServices";
import { GetDateNow } from "../util/GetDateNow";
import { instanceToPlain } from "class-transformer";

interface IProntuario {
    codUsuarioUuId,
    nomePaciente: string,
    dataNascimento: Date,
    altura?: number,
    peso?: number,
    imc?: number,
    glicemia?: number,
    pressaoArterial?: string,
    oximetria?: number,
}

class ProntuarioServices {

    async createProntuario({ codUsuarioUuId, nomePaciente, dataNascimento,
        altura, peso, imc, glicemia, pressaoArterial, oximetria }: IProntuario) {

        const prontuarioRepository = getCustomRepository(ProntuarioRepository);

        const getDateNow = new GetDateNow();
        const datenow = getDateNow.getDateNow();

        const prontuario = prontuarioRepository.create({
            codUsuarioUuId, 
            nomePaciente, 
            dataNascimento,
            altura, 
            peso, 
            imc, 
            glicemia, 
            pressaoArterial, 
            oximetria, 
            dataCriacao:datenow,
        });

        await prontuarioRepository.save(prontuario);

        return prontuario;
    }

    async findProntuario(codProntuarioUuId: string){
        const prontuarioRepository = getCustomRepository(ProntuarioRepository);
        const prontuariolExists = await prontuarioRepository.findOne({
            where: [{codProntuarioUuId}],
            relations: ["codUsuarioUu", "enfComentarioprontuarios", "enfComentarioprontuarios.codUsuarioUu"],  
        });
        
        return instanceToPlain(prontuariolExists);
    }

    async findProntuarioCompleteByUuId(codProntuarioUuId: string){
        const numeroProntuarioRepository = getCustomRepository(NumeroProntuarioRepository);
        const numeroProntuarioExists = await numeroProntuarioRepository.findOne({
            codProntuarioUuId,
        });

        const prontuariolCompleteExists = await this.findProntuario(numeroProntuarioExists.codProntuarioUuId);
        
        return ({numeroProntuarioExists,prontuariolCompleteExists});
    }

    async findProntuarioCompleteByNumero(numeroprontuario: number){
        const numeroProntuarioRepository = getCustomRepository(NumeroProntuarioRepository);
        const numeroProntuarioExists = await numeroProntuarioRepository.findOne({
            numeroprontuario,
        });

        const prontuariolCompleteExists = await this.findProntuario(numeroProntuarioExists.codProntuarioUuId);
        
        const anamneseDiagnosticoServices = new AnamneseDiagnosticoServices();
        const anamneseCompleteExists = await anamneseDiagnosticoServices.findAnamneseDiagnosticoByProntuario(numeroProntuarioExists.codProntuarioUuId);
        
        return ({numeroProntuarioExists, prontuariolCompleteExists, anamneseCompleteExists});
    }
}

export { ProntuarioServices };
