import { Repository, EntityRepository } from "typeorm";
import { EnfNumeroprontuario } from "../models/EnfNumeroprontuario";

@EntityRepository(EnfNumeroprontuario)
class NumeroprontuarioRepository extends Repository<EnfNumeroprontuario> {

}
export {NumeroprontuarioRepository};