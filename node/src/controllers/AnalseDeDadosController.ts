import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { CategoriasItensRepository } from "../repositories/CategoriasItensRepository";

import saeNandaSchema from "../models/SaeNandaSchema";
import saeNicNocShema from "../models/SaeNicNocShema";

type KeyWordElements ={
    uuid:string; 
    idItem:number; 
    keyword:string;
}



class AnalseDeDadosController {

    async analisededados(request: Request, response: Response){
        
        const { keyWordArrayRequest } = request.body ;
        const keyWordArray =  keyWordArrayRequest as KeyWordElements[];

        //const keyWordarr = ['ACIDENTE_VASCULAR_CEREBRAL_SIM'];
        const keyWordarr = keyWordArray.map(x => x.keyword);

        const respostaDagnostico = await saeNandaSchema.find(
            {keyword: {
                $in:keyWordarr,
              }}
            ).limit(4);
        //console.log(respostaDagnostico);
        //console.log(keyWordArray);

        return response.json({ 
        respostaDagnostico
       });
    }

    async analisediagnostico(request: Request, response: Response){
        
        const { uuidDiagArray } = request.body ;

        const respostasNICNOC = await saeNicNocShema.find(
            {uuid_diagnosticos: {
                $in:uuidDiagArray,
              }}
            );
        //console.log(uuidDiagArray);
        //console.log(respostasNICNOC);

        return response.json({ 
            respostasNICNOC
       });
    }

}

export { AnalseDeDadosController };





/*         const SaeNandaSchema = new mongoose.Schema({
            codigo_do_diagnostico: String,
            dominio: String,
            classe: String,
            definicao: String,
            keyword: [String],
              caracteristicas_definidoras : [String],
              condicoes_associadas : [String],
              fatores_relacionados : [String],
              populacao_em_risco : [String],
              fatores_de_risco : [String]
          }, { collection: 'NANDA' });
          
          const Tank = await mongoose.model('NANDA',SaeNandaSchema); 
          const respostaDagnostico  = await Tank.find({codigo_do_diagnostico: "00155 - Risco de quedas"}); */

          //const query = {codigo_do_diagnostico: "00155 - Risco de quedas"};
          //const rr = mongoose.model('NANDA').find(query);

/*       

 function MongoQuery (){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    return(
        MongoClient.connect(url,{useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("SAE");
        var query = {codigo_do_diagnostico: "00155 - Risco de quedas"};
        return (
            dbo.collection("NANDA").find(query).toArray(function(err, result) {
                if (err) throw err;

                const saeNandaTypeArr = result as SaeNandaType [];
                console.log(saeNandaTypeArr[0].keyword);

                db.close();

                return saeNandaTypeArr;
                }));
            return db;
        }) 
    )
}   
----------------------------------------------------------------
type SaeNandaType = {
    codigo_do_diagnostico: String,
    dominio: String,
    classe: String,
    definicao: String,
    keyword: [String],
      caracteristicas_definidoras : [String],
      condicoes_associadas : [String],
      fatores_relacionados : [String],
      populacao_em_risco : [String],
      fatores_de_risco : [String]
  };
*/
