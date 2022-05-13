import { Repository, EntityRepository } from "typeorm";
import { EnfProntuario } from "../models/EnfProntuario";

@EntityRepository(EnfProntuario)
class ProntuarioRepository extends Repository<EnfProntuario> {

}
export {ProntuarioRepository};