import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { EnfAnamnesediagnostico } from "./EnfAnamnesediagnostico";
import { EnfComentarioprontuario } from "./EnfComentarioprontuario";
import { EnfNumeroprontuario } from "./EnfNumeroprontuario";
import { EnfUsuario } from "./EnfUsuario";
import { EnfRascunhoprontuario } from "./EnfRascunhoprontuario";

@Index("fk_codUsuarioProntuarioUUId_idx", ["codUsuarioUuId"], {})
@Entity("enf_prontuario", { schema: "projetosae" })
export class EnfProntuario {
  @Column("varchar", { primary: true, name: "codProntuarioUUId", length: 45 })
  codProntuarioUuId: string;

  @Column("varchar", { name: "codUsuarioUUId", length: 45 })
  codUsuarioUuId: string;

  @Column("varchar", { name: "nomePaciente", length: 250 })
  nomePaciente: string;

  @Column("datetime", { name: "dataNascimento" })
  dataNascimento: Date;

  @Column("float", { name: "altura", nullable: true, precision: 12 })
  altura: number | null;

  @Column("float", { name: "peso", nullable: true, precision: 12 })
  peso: number | null;

  @Column("float", { name: "imc", nullable: true, precision: 12 })
  imc: number | null;

  @Column("float", { name: "glicemia", nullable: true, precision: 12 })
  glicemia: number | null;

  @Column("float", { name: "pressaoArterial", nullable: true, precision: 12 })
  pressaoArterial: number | null;

  @Column("float", { name: "oximetria", nullable: true, precision: 12 })
  oximetria: number | null;

  @Column("datetime", { name: "dataCriacao" })
  dataCriacao: Date;

  @Column("datetime", { name: "dataAlteracao", nullable: true })
  dataAlteracao: Date | null;

  @Column("datetime", { name: "dataExclusao", nullable: true })
  dataExclusao: Date | null;

  @OneToMany(
    () => EnfAnamnesediagnostico,
    (enfAnamnesediagnostico) => enfAnamnesediagnostico.codProntuarioUu
  )
  enfAnamnesediagnosticos: EnfAnamnesediagnostico[];

  @OneToMany(
    () => EnfComentarioprontuario,
    (enfComentarioprontuario) => enfComentarioprontuario.codProntuarioUu
  )
  enfComentarioprontuarios: EnfComentarioprontuario[];

  @OneToMany(
    () => EnfNumeroprontuario,
    (enfNumeroprontuario) => enfNumeroprontuario.codProntuarioUu
  )
  enfNumeroprontuarios: EnfNumeroprontuario[];

  @ManyToOne(() => EnfUsuario, (enfUsuario) => enfUsuario.enfProntuarios, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "codUsuarioUUId", referencedColumnName: "codUsuarioUuId" },
  ])
  codUsuarioUu: EnfUsuario;

  @OneToMany(
    () => EnfRascunhoprontuario,
    (enfRascunhoprontuario) => enfRascunhoprontuario.codProntuarioUu
  )
  enfRascunhoprontuarios: EnfRascunhoprontuario[];
}
