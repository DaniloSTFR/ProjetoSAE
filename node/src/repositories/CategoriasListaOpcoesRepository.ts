import { Repository, EntityRepository } from "typeorm";
import { SaeCategoriaslistaopcoes } from "../models/SaeCategoriaslistaopcoes";

@EntityRepository(SaeCategoriaslistaopcoes)
class CategoriasListaOpcoesRepository extends Repository<SaeCategoriaslistaopcoes> {

}
export {CategoriasListaOpcoesRepository};