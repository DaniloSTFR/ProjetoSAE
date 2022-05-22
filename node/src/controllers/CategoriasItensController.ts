import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { CategoriasItensServices } from "../services/CategoriasItensServices";

class CategoriasItensController {
    async createCategoriasItens(request: Request, response: Response){

        const { descricaoCategoriasItens, nomeInternoCategoriasItens, ordemCategoriaItens}
                = request.body;
        const categoriasItensServices =  new CategoriasItensServices();

        const categoriasItensAlreadyExists = await categoriasItensServices.findCategoriasItensByNome(nomeInternoCategoriasItens);

        if (typeof categoriasItensAlreadyExists !== 'undefined'){
            return response.status(400).json({
                error: "Categoria de Item já criada!",
            });
        }

        try{ 
            const categoriasItens = await categoriasItensServices.createCategoriasItens( 
                { descricaoCategoriasItens, nomeInternoCategoriasItens, ordemCategoriaItens} );

            return response.status(201).json({
                message: "Categoria criado com sucesso!",
                status: true,
                categoriasItens,
            });

        }catch (err){
            return response.status(400).json({
                error: err,
            });
        }
    }

    async showAllCategoriasItens(request: Request, response: Response){
        const categoriasItensServices =  new CategoriasItensServices();
        const allCategoriasItens= await categoriasItensServices.showAllCategoriasItens();
        return response.json(allCategoriasItens);
    }

    async findCategoriasItensByNome(request: Request, response: Response){
        const { nomeInternoCategoriasItens} = request.body;
        const categoriasItensServices =  new CategoriasItensServices();
        const categoriasItens= await categoriasItensServices.findCategoriasItensByNome(nomeInternoCategoriasItens);
        return response.json(categoriasItens);
    }

}

export { CategoriasItensController };
