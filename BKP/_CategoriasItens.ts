import { Entity, PrimaryColumn, Column  } from "typeorm";
import { v4 as uuid  } from "uuid";

@Entity("sae_categoriasitens")  
class CategoriasItens{

    @PrimaryColumn()
    readonly codCategoriasItens: number;

    @PrimaryColumn()
    readonly codCategoriasItensUUId: string;

    @Column()    
    descricaoCategorias: string;

    @Column()  
    nomeInternoCategorias: string;
     
    @Column()  
    ordemCategoria: number;

    constructor () {
        if (!this.codCategoriasItensUUId){
            this.codCategoriasItensUUId =uuid();
        }
    }

}
export {CategoriasItens};