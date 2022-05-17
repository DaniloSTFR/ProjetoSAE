import { Repository, EntityRepository } from "typeorm";
import { EnfNumeroprontuario } from "../models/EnfNumeroprontuario";

@EntityRepository(EnfNumeroprontuario)
class NumeroProntuarioRepository extends Repository<EnfNumeroprontuario> {

}
export {NumeroProntuarioRepository};