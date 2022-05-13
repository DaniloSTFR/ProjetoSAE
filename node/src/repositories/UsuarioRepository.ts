import { Repository, EntityRepository } from "typeorm";
import { EnfUsuario } from "../models/EnfUsuario";

@EntityRepository(EnfUsuario)
class UsuarioRepository extends Repository<EnfUsuario> {

}
export {UsuarioRepository};