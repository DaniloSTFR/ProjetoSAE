export type  DiagnosticosItensTypes = {
    _id: string;
    codigo_do_diagnostico: string,
    dominio: string,
    classe: string,
    definicao: string,
    keyword: string[],
    caracteristicas_definidoras : string[],
    condicoes_associadas : string[],
    fatores_relacionados : string[],
    populacao_em_risco : string[],
    fatores_de_risco : string[]
  }


export type SaeNicNocTypes = {
    uuid_diagnosticos: string,
    codigo_do_diagnostico: string,
    intervercoes_nic: string[],
    resultados_noc : string[]
  }

export type SaeIntervercoesNicTypes = {
    _id: string,
    uuid_diagnosticos: string,
    intervercoes_nic: string[],
  }

export type SaeResultadosNocTypes = {
    _id: string,
    uuid_diagnosticos: string,
    resultados_noc : string[]
  }

export type DiagnosticosSelectIdArr = {
    arr: string[]
  }

export type DiagnosticosItensTypesArr ={
    arr: DiagnosticosItensTypes[]
}