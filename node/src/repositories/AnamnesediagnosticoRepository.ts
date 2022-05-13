import { Repository, EntityRepository } from "typeorm";
import { EnfAnamnesediagnostico } from "../models/EnfAnamnesediagnostico";

@EntityRepository(EnfAnamnesediagnostico)
class AnamnesediagnosticoRepository extends Repository<EnfAnamnesediagnostico> {

}
export {AnamnesediagnosticoRepository};