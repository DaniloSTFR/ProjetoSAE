import { getCustomRepository } from "typeorm";
import { AnamnesediagnosticoRepository } from "../repositories/AnamnesediagnosticoRepository";
import { GetDateNow } from "../util/GetDateNow"; 
import { instanceToPlain } from "class-transformer";

interface IAnamneseDiagnostico{
    codAnamneseDiagnosticoUuId?: string,
    codProntuarioUuId?: string;
    diagnosticosJson?: object;
    intervencoesJson?: object;
    resultadosJson?: object;
}

class AnamneseDiagnosticoServices{

    async createAnamneseDiagnostico({
        codProntuarioUuId,diagnosticosJson,intervencoesJson,resultadosJson
    }: IAnamneseDiagnostico){

        const anamnesediagnosticoRepository = getCustomRepository( AnamnesediagnosticoRepository );
        const getDateNow = new GetDateNow();
        const datenow = getDateNow.getDateNow();

        const novoAnamneseDiagnostico = anamnesediagnosticoRepository.create({
            codProntuarioUuId,
            diagnosticosJson,
            intervencoesJson,
            resultadosJson,
            dataCriacao: datenow,
        });
        
        await anamnesediagnosticoRepository.save(novoAnamneseDiagnostico);

        return instanceToPlain(novoAnamneseDiagnostico);
    }

    async findAnamneseDiagnostico(codAnamneseDiagnosticoUuId: string){
        const anamnesediagnosticoRepository = getCustomRepository( AnamnesediagnosticoRepository );
        const anamnesediagnostico = await anamnesediagnosticoRepository.findOne({codAnamneseDiagnosticoUuId});
        return instanceToPlain(anamnesediagnostico);
    }

    async findAnamneseDiagnosticoByProntuario(codProntuarioUuId: string){
        const anamnesediagnosticoRepository = getCustomRepository( AnamnesediagnosticoRepository );
        const anamnesediagnostico = await anamnesediagnosticoRepository.findOne({codProntuarioUuId});
        return instanceToPlain(anamnesediagnostico);
    }

    async updateAnamneseDiagnostico({
        codAnamneseDiagnosticoUuId,diagnosticosJson,intervencoesJson,resultadosJson
    }: IAnamneseDiagnostico){

        const anamnesediagnosticoRepository = getCustomRepository( AnamnesediagnosticoRepository );
        const anamnesediagnostico = await anamnesediagnosticoRepository.findOne({codAnamneseDiagnosticoUuId});

        const getDateNow = new GetDateNow();
        const datenow = getDateNow.getDateNow();

        if((diagnosticosJson != null) || (diagnosticosJson !== undefined)){
            anamnesediagnostico.diagnosticosJson =  diagnosticosJson;
        }

        if((intervencoesJson != null) || (intervencoesJson !== undefined)){
            anamnesediagnostico.intervencoesJson =  intervencoesJson;
        }

        if((resultadosJson != null) || (resultadosJson !== undefined)){
            anamnesediagnostico.resultadosJson =  resultadosJson;
        }

        anamnesediagnostico.dataCriacao = new Date(datenow);
        await anamnesediagnosticoRepository.save(anamnesediagnostico);
        
        return anamnesediagnostico;
    }

    
}

export {AnamneseDiagnosticoServices};