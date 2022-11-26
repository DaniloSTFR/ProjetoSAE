import { Usuario } from 'types/Usuario';
import { EnfComentarioProntuarios } from 'types/Comentario';
import { DiagnosticosItensTypes, SaeIntervercoesNicTypes, SaeResultadosNocTypes } from 'types/Diagnosticos';

export type EnfNumeroProntuario = {
    numeroprontuario: number,
    codProntuarioUuId: string
}

export type EnfProntuarioComplete = {
    codProntuarioUuId: string,
    codUsuarioUuId: string,
    nomePaciente: string,
    dataNascimento: Date,
    altura: number,
    peso: number,
    imc: number,
    glicemia: number,
    pressaoArterial: string,
    oximetria: number,
    dataCriacao: Date,
    dataAlteracao: Date,
    dataExclusao: Date,
    codUsuarioUu: Usuario[],
    enfComentarioprontuarios: EnfComentarioProntuarios[]
}

export type EnfAnamneseComplete = {
    codAnamneseDiagnosticoUuId: string,
    codProntuarioUuId: string,
    dataCriacao: Date,
    diagnosticosJson: DiagnosticosItensTypes[];
    intervencoesJson: SaeIntervercoesNicTypes[];
    resultadosJson: SaeResultadosNocTypes[];
}