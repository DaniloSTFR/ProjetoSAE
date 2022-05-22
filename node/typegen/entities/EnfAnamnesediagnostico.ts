import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { EnfProntuario } from "./EnfProntuario";

@Index("fk_codProntuarioAnamneseUUId_idx", ["codProntuarioUuId"], {})
@Entity("enf_anamnesediagnostico", { schema: "projetosae" })
export class EnfAnamnesediagnostico {
  @Column("varchar", {
    primary: true,
    name: "codAnamneseDiagnosticoUUId",
    length: 45,
  })
  codAnamneseDiagnosticoUuId: string;

  @Column("varchar", { name: "codProntuarioUUId", length: 45 })
  codProntuarioUuId: string;

  @Column("json", { name: "diagnosticosJSON", nullable: true })
  diagnosticosJson: object | null;

  @Column("json", { name: "intervencoesJSON", nullable: true })
  intervencoesJson: object | null;

  @Column("json", { name: "resultadosJSON", nullable: true })
  resultadosJson: object | null;

  @Column("datetime", { name: "dataCriacao" })
  dataCriacao: Date;

  @ManyToOne(
    () => EnfProntuario,
    (enfProntuario) => enfProntuario.enfAnamnesediagnosticos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "codProntuarioUUId", referencedColumnName: "codProntuarioUuId" },
  ])
  codProntuarioUu: EnfProntuario;
}
