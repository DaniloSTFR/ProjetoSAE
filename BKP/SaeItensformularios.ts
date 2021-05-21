import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SaeCategoriasitens } from "./SaeCategoriasitens";
import { SaeCategoriaslistaopcoes } from "./SaeCategoriaslistaopcoes";

@Index("ordemCategoria_UNIQUE", ["ordemItem"], { unique: true })
@Index("fk_codCategoriasItensUUIdIDX", ["codCategoriasItensUuId"], {})
@Index(
  "fk_codCategoriasListaOpcoesUUIdIDX",
  ["codCategoriasListaOpcoesUuId"],
  {}
)
@Entity("sae_itensformularios", { schema: "projetosae" })
export class SaeItensformularios {
  @PrimaryGeneratedColumn({ type: "int", name: "codItensFormularios" })
  codItensFormularios: number;

  @Column("varchar", { name: "descricaoItem", length: 500 })
  descricaoItem: string;

  @Column("int", { name: "ordemItem", nullable: true, unique: true })
  ordemItem: number | null;

  @Column("varchar", { name: "codCategoriasItensUUId", length: 45 })
  codCategoriasItensUuId: string;

  @Column("varchar", {
    name: "codCategoriasListaOpcoesUUId",
    nullable: true,
    length: 45,
  })
  codCategoriasListaOpcoesUuId: string | null;

  @Column("json", { name: "opcoesItensFormJSON", nullable: true })
  opcoesItensFormJson: object | null;

  @ManyToOne(
    () => SaeCategoriasitens,
    (saeCategoriasitens) => saeCategoriasitens.saeItensformularios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    {
      name: "codCategoriasItensUUId",
      referencedColumnName: "codCategoriasItensUuId",
    },
  ])
  codCategoriasItensUu: SaeCategoriasitens;

  @ManyToOne(
    () => SaeCategoriaslistaopcoes,
    (saeCategoriaslistaopcoes) => saeCategoriaslistaopcoes.saeItensformularios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    {
      name: "codCategoriasListaOpcoesUUId",
      referencedColumnName: "codCategoriasListaOpcoesUuId",
    },
  ])
  codCategoriasListaOpcoesUu: SaeCategoriaslistaopcoes;
}
