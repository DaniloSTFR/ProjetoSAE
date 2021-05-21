import { Repository, EntityRepository } from "typeorm";
import { SaeItensformularios } from "../models/SaeItensformularios";

@EntityRepository(SaeItensformularios)
class ItensFormulariosRepository extends Repository<SaeItensformularios> {

}
export {ItensFormulariosRepository};