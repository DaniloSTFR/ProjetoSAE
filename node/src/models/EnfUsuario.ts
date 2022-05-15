import { Column, Entity, OneToMany } from "typeorm";
import { EnfComentarioprontuario } from "./EnfComentarioprontuario";
import { EnfNotificacaousuario } from "./EnfNotificacaousuario";
import { EnfProntuario } from "./EnfProntuario";
import { EnfRascunhoprontuario } from "./EnfRascunhoprontuario";
import { v4 as uuid  } from "uuid";
import { Expose, Exclude } from "class-transformer";

@Entity("enf_usuario", { schema: "projetosae" })
export class EnfUsuario {
  @Column("varchar", { primary: true, name: "codUsuarioUUId", length: 45 })
  codUsuarioUuId: string;

  @Column("varchar", { name: "nomeUsuario", length: 100 })
  nomeUsuario: string;

  @Column("varchar", { name: "nomePessoa", length: 250 })
  nomePessoa: string;

  @Column("varchar", { name: "email", length: 100 })
  email: string;

  @Exclude()
  @Column("varchar", { name: "senha", length: 100 })
  senha: string;

  @Column("datetime", { name: "dataCadastro" })
  dataCadastro: Date;

  @Column("datetime", { name: "dataExclusao", nullable: true })
  dataExclusao: Date | null;

  @OneToMany(
    () => EnfComentarioprontuario,
    (enfComentarioprontuario) => enfComentarioprontuario.codUsuarioUu
  )
  enfComentarioprontuarios: EnfComentarioprontuario[];

  @OneToMany(
    () => EnfNotificacaousuario,
    (enfNotificacaousuario) => enfNotificacaousuario.codUsuarioUu
  )
  enfNotificacaousuarios: EnfNotificacaousuario[];

  @OneToMany(() => EnfProntuario, (enfProntuario) => enfProntuario.codUsuarioUu)
  enfProntuarios: EnfProntuario[];

  @OneToMany(
    () => EnfRascunhoprontuario,
    (enfRascunhoprontuario) => enfRascunhoprontuario.codUsuarioUu
  )
  enfRascunhoprontuarios: EnfRascunhoprontuario[];

  @Expose({name:"tagUsuario"})
  tagUsuario(): string {
    return `@${this.nomeUsuario}`;
  }

  constructor () {
    if (!this.codUsuarioUuId){
        this.codUsuarioUuId = uuid();
    }
  }
}
