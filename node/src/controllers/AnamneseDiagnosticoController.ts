import { Request, Response } from "express";
import { AnamneseDiagnosticoServices } from "../services/AnamneseDiagnosticoServices";

class AnamneseDiagnosticoController{
    async createAnamneseDiagnosticos(request: Request, response: Response){
        const { codProntuarioUuId,diagnosticosJson,intervencoesJson,resultadosJson }  = request.body;
        const anamneseDiagnosticoServices =  new AnamneseDiagnosticoServices();

        try{ 
            const anamneseDiagnostico = await anamneseDiagnosticoServices.createAnamneseDiagnostico( 
                { codProntuarioUuId,diagnosticosJson,intervencoesJson,resultadosJson } );

            return response.status(201).json({
                message: "Diagnóstico da anamnese criado com sucesso!",
                status: true,
                anamneseDiagnostico,
            });

        }catch (err){
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


    async updateAnamneseDiagnosticos(request: Request, response: Response){
        const { codAnamneseDiagnosticoUuId,diagnosticosJson,intervencoesJson,resultadosJson }  = request.body;
        const anamneseDiagnosticoServices =  new AnamneseDiagnosticoServices();

        try{ 
            const upAnamneseDiagnostico = await anamneseDiagnosticoServices.updateAnamneseDiagnostico( 
                { codAnamneseDiagnosticoUuId,diagnosticosJson,intervencoesJson,resultadosJson } );

            return response.status(201).json({
                message: "Diagnóstico da anamnese atualizado com sucesso!",
                status: true,
                upAnamneseDiagnostico,
            });

        }catch (err){
            return response.status(400).json({
                error: err,
            });
        }
    }


}

export {AnamneseDiagnosticoController};