import mongoose, { Document, Schema, Model } from 'mongoose';

const SaeNandaSchema = new Schema({
  codigo_do_diagnostico: String,
  dominio: String,
  classe: String,
  definicao: String,
  keyword: [String],
    caracteristicas_definidoras : [String],
    condicoes_associadas : [String],
    fatores_relacionados : [String],
    populacao_em_risco : [String],
    fatores_de_risco : [String]
}, { collection: 'NANDA' });

export default mongoose.model('NANDA',SaeNandaSchema);


