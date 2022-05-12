import mongoose, { Document, Schema, Model } from 'mongoose';

const SaeNicNocShema = new Schema({
  uuid_diagnosticos: String,
  codigo_do_diagnostico: String,
  intervercoes_nic: [String],
  resultados_noc : [String]
}, { collection: 'NICNOC' });

export default mongoose.model('NICNOC',SaeNicNocShema);

