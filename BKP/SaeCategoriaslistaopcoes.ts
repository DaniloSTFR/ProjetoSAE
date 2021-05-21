import { Column, Entity, Index, OneToMany } from "typeorm";
import { SaeItensformularios } from "./SaeItensformularios";
import { SaeItensopcoes } from "./SaeItensopcoes";
import { v4 as uuid  } from "uuid";

@Index("ordemCategoriasOpcoes_UNIQUE", ["ordemCategoriasOpcoes"], {
  unique: true,
})
@Entity("sae_categoriaslistaopcoes", { schema: "projetosae" })
export class SaeCategoriaslistaopcoes {
  @Column("varchar", {
    primary: true,
    name: "codCategoriasListaOpcoesUUId",
    length: 45,
  })
  codCategoriasListaOpcoesUuId: string;

  @Column("varchar", { name: "descricaoCategoriasOpcoes", length: 200 })
  descricaoCategoriasOpcoes: string;

  @Column("varchar", {
    name: "nomeInternoCategoriasOpcoes",
    nullable: true,
    length: 200,
  })
  nomeInternoCategoriasOpcoes: string | null;

  @Column("int", {
    name: "ordemCategoriasOpcoes",
    nullable: true,
    unique: true,
  })
  ordemCategoriasOpcoes: number | null;

  @OneToMany(
    () => SaeItensformularios,
    (saeItensformularios) => saeItensformularios.codCategoriasListaOpcoesUu
  )
  saeItensformularios: SaeItensformularios[];

  @OneToMany(
    () => SaeItensopcoes,
    (saeItensopcoes) => saeItensopcoes.codCategoriasListaOpcoesUu
  )
  saeItensopcoes: SaeItensopcoes[];

  constructor () {
    if (!this.codCategoriasListaOpcoesUuId){
        this.codCategoriasListaOpcoesUuId = uuid();
    }
  }
}
