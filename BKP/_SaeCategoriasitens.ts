import { Column, Entity, Index } from "typeorm";
import { v4 as uuid  } from "uuid";

@Index("IDX_ORDEMCATEGORIA", ["ordemCategoria"], {})
@Entity("sae_categoriasitens", { schema: "projetosae" })
export class SaeCategoriasitens {
  @Column("int", { primary: true, name: "codCategoriasItens" })
  readonly codCategoriasItens: number;

  @Column("varchar", {
    primary: true,
    name: "codCategoriasItensUUId",
    length: 36,
  })
  readonly codCategoriasItensUuId: string;

  @Column("varchar", { name: "descricaoCategorias", length: 200 })
  descricaoCategorias: string;

  @Column("varchar", { name: "nomeInternoCategorias", length: 200 })
  nomeInternoCategorias: string;

  @Column("int", { name: "ordemCategoria" })
  ordemCategoria: number;

  constructor () {
    if (!this.codCategoriasItensUuId){
        this.codCategoriasItensUuId =uuid();
    }
  }
}
