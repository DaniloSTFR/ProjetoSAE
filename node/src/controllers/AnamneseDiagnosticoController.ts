import { Request, Response } from "express";
import { AnamneseDiagnosticoServices } from "../services/AnamneseDiagnosticoServices";
import { DiagnosticosNicNocServices } from "../services/DiagnosticosNicNocServices";
import { ProntuarioServices } from "../services/ProntuarioServices"
import { NumeroProntuarioServices } from "../services/NumeroProntuarioServices"

type  DiagnosticosItensTypes = {
    _id: string,
    codigo_do_diagnostico: string,
    dominio: string,
    classe: string,
    definicao: string,
    keyword: [string],
    caracteristicas_definidoras : [string],
    condicoes_associadas : [string],
    fatores_relacionados : [string],
    populacao_em_risco : [string],
    fatores_de_risco : [string]
  }

type SaeNicNocTypes = {
    _id: string,
    uuid_diagnosticos: string,
    codigo_do_diagnostico: string,
    intervercoes_nic: [string],
    resultados_noc : [string]
  }
class AnamneseDiagnosticoController {
    async createAnamneseDiagnosticos(request: Request, response: Response) {
        const { codProntuarioUuId, diagnosticosJson, intervencoesJson, resultadosJson } = request.body;
        const anamneseDiagnosticoServices = new AnamneseDiagnosticoServices();

        try {
            const anamneseDiagnostico = await anamneseDiagnosticoServices.createAnamneseDiagnostico(
                { codProntuarioUuId, diagnosticosJson, intervencoesJson, resultadosJson });

            return response.status(201).json({
                message: "Diagnóstico da anamnese criado com sucesso!",
                status: true,
                anamneseDiagnostico,
            });

        } catch (err) {
            return response.status(400).json({
                error: err,
            });
        }
    }

    async createAnamneseDiagnosticosUuid(request: Request, response: Response) {
        const { uuidDiagArray, numeroprontuario, codUsuarioUuId } = request.body;
        try {
            const diagnosticosNicNocServices = new DiagnosticosNicNocServices();
            const respostasNICNOC = (await diagnosticosNicNocServices.getAnaliseDiagnostico(uuidDiagArray)) as unknown as Array<SaeNicNocTypes>;
            const respostasNANDA = (await diagnosticosNicNocServices.getAnaliseDeDadosUuid(uuidDiagArray)) as unknown as  Array<DiagnosticosItensTypes>;

            const prontuarioServices = new ProntuarioServices();
            const prontuarioPaciente = await prontuarioServices.findProntuarioCompleteByNumero(numeroprontuario);

            let intervencoesJson = [];
            let resultadosJson = [];
            respostasNICNOC.map( (x) => { 
                intervencoesJson.push({uuid_diagnosticos: x.uuid_diagnosticos, intervercoes_nic: x.intervercoes_nic, _id: x._id});
                resultadosJson.push({uuid_diagnosticos: x.uuid_diagnosticos, resultados_noc: x.resultados_noc, _id: x._id}); 
            } );

            const anamneseDiagnosticoServices = new AnamneseDiagnosticoServices();

            const anamneseDiagnosticoAlreadyExists = await anamneseDiagnosticoServices.findAnamneseDiagnosticoByProntuario(prontuarioPaciente.numeroProntuarioExists.codProntuarioUuId);

            const anamneseDiagnostico = (typeof anamneseDiagnosticoAlreadyExists !== 'undefined')  ? 
                await anamneseDiagnosticoServices.updateAnamneseDiagnostico(
                    {codAnamneseDiagnosticoUuId: anamneseDiagnosticoAlreadyExists.codAnamneseDiagnosticoUuId,
                    codProntuarioUuId: prontuarioPaciente.numeroProntuarioExists.codProntuarioUuId,
                    diagnosticosJson:respostasNANDA, 
                    intervencoesJson,
                    resultadosJson 
                    })

                : await anamneseDiagnosticoServices.createAnamneseDiagnostico(
                    { codProntuarioUuId: prontuarioPaciente.numeroProntuarioExists.codProntuarioUuId,
                    diagnosticosJson:respostasNANDA, 
                    intervencoesJson,
                    resultadosJson 
                    }); 



            return response.status(201).json({
                message: "Diagnóstico da anamnese criado com sucesso!",
                anamneseDiagnostico,
                status: true,
            });

        } catch (err) {
            return response.status(400).json({
                error: err,
            });
        }
    }

    async findAnamneseDiagnostico(request: Request, response: Response){
        const{codAnamneseDiagnosticoUuId} = request.body;
        const anamneseDiagnosticoServices =  new AnamneseDiagnosticoServices();
        const anamnesediagnostico= await anamneseDiagnosticoServices.findAnamneseDiagnostico(codAnamneseDiagnosticoUuId);
        return response.json(anamnesediagnostico);
    }

    async findAnamneseDiagnosticoByNumProntuario(request: Request, response: Response){
        const{numeroprontuario} = request.body;

        const numeroProntuarioServices = new NumeroProntuarioServices();
        const numeroProntuarioFind = await numeroProntuarioServices.findRascunhoProntuarioByNumero(numeroprontuario);
        const anamneseDiagnosticoServices =  new AnamneseDiagnosticoServices();
        const anamnesediagnostico= await anamneseDiagnosticoServices.findAnamneseDiagnosticoByProntuario(numeroProntuarioFind.codProntuarioUuId);
        return response.json(anamnesediagnostico);
    }


    async updateAnamneseDiagnosticos(request: Request, response: Response) {
        const { codAnamneseDiagnosticoUuId, diagnosticosJson, intervencoesJson, resultadosJson } = request.body;
        const anamneseDiagnosticoServices = new AnamneseDiagnosticoServices();

        try {
            const upAnamneseDiagnostico = await anamneseDiagnosticoServices.updateAnamneseDiagnostico(
                { codAnamneseDiagnosticoUuId, diagnosticosJson, intervencoesJson, resultadosJson });

            return response.status(201).json({
                message: "Diagnóstico da anamnese atualizado com sucesso!",
                status: true,
                upAnamneseDiagnostico,
            });

        } catch (err) {
            return response.status(400).json({
                error: err,
            });
        }
    }


}

export { AnamneseDiagnosticoController };