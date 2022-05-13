import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SaeCategoriaslistaopcoes } from "./SaeCategoriaslistaopcoes";

@Index("fk_codCategoriasListaOpcoesUUId", ["codCategoriasListaOpcoesUuId"], {})
@Entity("sae_itensopcoes", { schema: "projetosae" })
export class SaeItensopcoes {
  @PrimaryGeneratedColumn({ type: "int", name: "codItensOpcoes" })
  codItensOpcoes: number;

  @Column("varchar", { name: "descricaoOpcoes", length: 500 })
  descricaoOpcoes: string;

  @Column("int", { name: "ordemOpcoes", nullable: true })
  ordemOpcoes: number | null;

  @Column("varchar", { name: "codCategoriasListaOpcoesUUId", length: 45 })
  codCategoriasListaOpcoesUuId: string;

  @Column("json", { name: "listaOpcoesJSON", nullable: true })
  listaOpcoesJson: object | null;

  @ManyToOne(
    () => SaeCategoriaslistaopcoes,
    (saeCategoriaslistaopcoes) => saeCategoriaslistaopcoes.saeItensopcoes,
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
