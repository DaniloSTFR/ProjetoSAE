import { Repository, EntityRepository } from "typeorm";
import { SaeCategoriasitens } from "../models/SaeCategoriasitens";

@EntityRepository(SaeCategoriasitens)
class CategoriasItensRepository extends Repository<SaeCategoriasitens> {

}
export {CategoriasItensRepository};