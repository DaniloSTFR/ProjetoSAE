import { Column, Entity, Index, OneToMany } from "typeorm";
import { SaeItensformularios } from "./SaeItensformularios";

@Index("ordemCategoriaItens_UNIQUE", ["ordemCategoriaItens"], { unique: true })
@Entity("sae_categoriasitens", { schema: "projetosae" })
export class SaeCategoriasitens {
  @Column("varchar", {
    primary: true,
    name: "codCategoriasItensUUId",
    length: 45,
  })
  codCategoriasItensUuId: string;

  @Column("varchar", { name: "descricaoCategoriasItens", length: 200 })
  descricaoCategoriasItens: string;

  @Column("varchar", {
    name: "nomeInternoCategoriasItens",
    nullable: true,
    length: 200,
  })
  nomeInternoCategoriasItens: string | null;

  @Column("int", { name: "ordemCategoriaItens", nullable: true, unique: true })
  ordemCategoriaItens: number | null;

  @OneToMany(
    () => SaeItensformularios,
    (saeItensformularios) => saeItensformularios.codCategoriasItensUu
  )
  saeItensformularios: SaeItensformularios[];
}
