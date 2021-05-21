import { Repository, EntityRepository } from "typeorm";
import { SaeItensopcoes } from "../models/SaeItensopcoes";

@EntityRepository(SaeItensopcoes)
class ItensOpcoesRepository extends Repository<SaeItensopcoes> {

}
export {ItensOpcoesRepository};