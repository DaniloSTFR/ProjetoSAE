import saeNandaSchema from "../models/SaeNandaSchema";
import saeNicNocShema from "../models/SaeNicNocShema";

class DiagnosticosNicNocServices{

    async getAnaliseDeDadoskeyword(keyWordarr:any[]){
        
        const respostaDagnostico = await saeNandaSchema.find(
            {keyword: {
                $in:keyWordarr,
              }}
            ).limit(4);

        return respostaDagnostico
    }

    async getAnaliseDeDadosUuid(uuidDiagArray:any[]){
        
        const respostaDagnostico = await saeNandaSchema.find(
            {_id: {
                $in:uuidDiagArray,
              }}
            );

        return respostaDagnostico
    }

    async getAnaliseDiagnostico(uuidDiagArray:any[]){
        const respostasNICNOC = await saeNicNocShema.find(
            {uuid_diagnosticos: {
                $in:uuidDiagArray,
              }}
            );
        return respostasNICNOC;

    }
}

export {DiagnosticosNicNocServices};