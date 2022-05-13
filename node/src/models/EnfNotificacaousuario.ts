import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { EnfComentarioprontuario } from "./EnfComentarioprontuario";
import { EnfUsuario } from "./EnfUsuario";
import { v4 as uuid  } from "uuid";

@Index("fk_codUsuarioNotificacaoUUId_idx", ["codUsuarioUuId"], {})
@Index(
  "fk_codComentarioProntuarioNotificacaoUUId_idx",
  ["codComentarioProntuarioUuId"],
  {}
)
@Entity("enf_notificacaousuario", { schema: "projetosae" })
export class EnfNotificacaousuario {
  @Column("varchar", {
    primary: true,
    name: "codNotificacaoUsuarioUUId",
    length: 45,
  })
  codNotificacaoUsuarioUuId: string;

  @Column("varchar", { name: "codUsuarioUUId", length: 45 })
  codUsuarioUuId: string;

  @Column("varchar", { name: "codComentarioProntuarioUUId", length: 45 })
  codComentarioProntuarioUuId: string;

  @Column("varchar", { name: "usuarioAlvo", length: 45 })
  usuarioAlvo: string;

  @Column("varchar", { name: "notificacaoVista", length: 5 })
  notificacaoVista: string;

  @Column("datetime", { name: "dataCriacao" })
  dataCriacao: Date;

  @ManyToOne(
    () => EnfComentarioprontuario,
    (enfComentarioprontuario) => enfComentarioprontuario.enfNotificacaousuarios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    {
      name: "codComentarioProntuarioUUId",
      referencedColumnName: "codComentarioProntuarioUuId",
    },
  ])
  codComentarioProntuarioUu: EnfComentarioprontuario;

  @ManyToOne(
    () => EnfUsuario,
    (enfUsuario) => enfUsuario.enfNotificacaousuarios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "codUsuarioUUId", referencedColumnName: "codUsuarioUuId" },
  ])
  codUsuarioUu: EnfUsuario;

  constructor () {
    if (!this.codNotificacaoUsuarioUuId){
        this.codNotificacaoUsuarioUuId = uuid();
    }
  }
}
