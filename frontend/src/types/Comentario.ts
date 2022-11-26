import { Usuario } from 'types/Usuario';

export type EnfComentarioProntuarios = {
    codComentarioProntuarioUuId: string,
    codProntuarioUuId: string,
    codUsuarioUuId: string,
    comentarioProntuario: string,
    dataCriacao: Date,
    codUsuarioUu: Usuario
}