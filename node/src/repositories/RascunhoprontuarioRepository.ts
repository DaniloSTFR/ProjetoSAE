import { Repository, EntityRepository } from "typeorm";
import { EnfRascunhoprontuario } from "../models/EnfRascunhoprontuario";

@EntityRepository(EnfRascunhoprontuario)
class RascunhoprontuarioRepository extends Repository<EnfRascunhoprontuario> {

}
export {RascunhoprontuarioRepository};