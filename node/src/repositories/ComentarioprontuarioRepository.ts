import { Repository, EntityRepository } from "typeorm";
import { EnfComentarioprontuario } from "../models/EnfComentarioprontuario";

@EntityRepository(EnfComentarioprontuario)
class ComentarioprontuarioRepository extends Repository<EnfComentarioprontuario> {

}
export {ComentarioprontuarioRepository};