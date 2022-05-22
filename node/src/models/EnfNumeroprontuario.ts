import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EnfProntuario } from "./EnfProntuario";

@Index("fk_codProntuarioNumeroUUId_idx", ["codProntuarioUuId"], {})
@Entity("enf_numeroprontuario", { schema: "projetosae" })
export class EnfNumeroprontuario {
  @PrimaryGeneratedColumn({ type: "int", name: "numeroprontuario" })
  numeroprontuario: number;

  @Column("varchar", { name: "codProntuarioUUId", length: 45 })
  codProntuarioUuId: string;

  @ManyToOne(
    () => EnfProntuario,
    (enfProntuario) => enfProntuario.enfNumeroprontuarios,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "codProntuarioUUId", referencedColumnName: "codProntuarioUuId" },
  ])
  codProntuarioUu: EnfProntuario;
}
