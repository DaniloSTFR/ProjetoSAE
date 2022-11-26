import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { EnfProntuario } from "./EnfProntuario";
import { EnfUsuario } from "./EnfUsuario";
import { EnfNotificacaousuario } from "./EnfNotificacaousuario";
import { v4 as uuid  } from "uuid";

@Index("fk_codProntuarioComentarioUUId_idx", ["codProntuarioUuId"], {})
@Index("fk_codUsuarioComentarioUUId_idx", ["codUsuarioUuId"], {})
@Entity("enf_comentarioprontuario", { schema: "projetosae" })
export class EnfComentarioprontuario {
  @Column("varchar", {
    primary: true,
    name: "codComentarioProntuarioUUId",
    length: 45,
  })
  codComentarioProntuarioUuId: string;

  @Column("varchar", { name: "codProntuarioUUId", length: 45 })
  codProntuarioUuId: string;

  @Column("varchar", { name: "codUsuarioUUId", length: 45 })
  codUsuarioUuId: string;

  @Column("varchar", {
    name: "comentarioProntuario",
    nullable: true,
    length: 1000,
  })
  comentarioProntuario: string | null;

  @Column("datetime", { name: "dataCriacao" })
  dataCriacao: Date;

  @ManyToOne(
    () => EnfProntuario,
    (enfProntuario) => enfProntuario.enfComentarioprontuarios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "codProntuarioUUId", referencedColumnName: "codProntuarioUuId" },
  ])
  codProntuarioUu: EnfProntuario;

  @ManyToOne(
    () => EnfUsuario,
    (enfUsuario) => enfUsuario.enfComentarioprontuarios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "codUsuarioUUId", referencedColumnName: "codUsuarioUuId" },
  ])
  codUsuarioUu: EnfUsuario;

  @OneToMany(
    () => EnfNotificacaousuario,
    (enfNotificacaousuario) => enfNotificacaousuario.codComentarioProntuarioUu
  )
  enfNotificacaousuarios: EnfNotificacaousuario[];

  constructor () {
    if (!this.codComentarioProntuarioUuId){
        this.codComentarioProntuarioUuId = uuid();
    }
  }
}
