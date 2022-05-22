import { Repository, EntityRepository } from "typeorm";
import { EnfComentarioprontuario } from "../models/EnfComentarioprontuario";

@EntityRepository(EnfComentarioprontuario)
class ComentarioProntuarioRepository extends Repository<EnfComentarioprontuario> {

}
export {ComentarioProntuarioRepository};