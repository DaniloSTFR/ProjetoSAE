import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { EnfProntuario } from "./EnfProntuario";
import { EnfUsuario } from "./EnfUsuario";
import { v4 as uuid  } from "uuid";

@Index("fk_codUsuarioRascunhoUUId_idx", ["codUsuarioUuId"], {})
@Index("fk_codProntuarioRascunhoUUId_idx", ["codProntuarioUuId"], {})
@Entity("enf_rascunhoprontuario", { schema: "projetosae" })
export class EnfRascunhoprontuario {
  @Column("varchar", {
    primary: true,
    name: "codRascunhoProntuarioUUId",
    length: 45,
  })
  codRascunhoProntuarioUuId: string;

  @Column("varchar", { name: "codProntuarioUUId", length: 45 })
  codProntuarioUuId: string;

  @Column("varchar", { name: "codUsuarioUUId", length: 45 })
  codUsuarioUuId: string;

  @Column("json", { name: "formKeysRascunhoJSON", nullable: true })
  formKeysRascunhoJson: object | null;

  @Column("datetime", { name: "dataCriacao" })
  dataCriacao: Date;

  @ManyToOne(
    () => EnfProntuario,
    (enfProntuario) => enfProntuario.enfRascunhoprontuarios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "codProntuarioUUId", referencedColumnName: "codProntuarioUuId" },
  ])
  codProntuarioUu: EnfProntuario;

  @ManyToOne(
    () => EnfUsuario,
    (enfUsuario) => enfUsuario.enfRascunhoprontuarios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "codUsuarioUUId", referencedColumnName: "codUsuarioUuId" },
  ])
  codUsuarioUu: EnfUsuario;

  constructor () {
    if (!this.codRascunhoProntuarioUuId){
        this.codRascunhoProntuarioUuId = uuid();
    }
  }
}
