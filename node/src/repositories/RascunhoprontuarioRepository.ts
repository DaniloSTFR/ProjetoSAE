import { Repository, EntityRepository } from "typeorm";
import { EnfRascunhoprontuario } from "../models/EnfRascunhoprontuario";

@EntityRepository(EnfRascunhoprontuario)
class RascunhoProntuarioRepository extends Repository<EnfRascunhoprontuario> {

}
export {RascunhoProntuarioRepository};