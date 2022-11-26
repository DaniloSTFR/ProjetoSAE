import { Repository, EntityRepository } from "typeorm";
import { EnfNotificacaousuario } from "../models/EnfNotificacaousuario";

@EntityRepository(EnfNotificacaousuario)
class NotificacaousuarioRepository extends Repository<EnfNotificacaousuario> {

}
export {NotificacaousuarioRepository};