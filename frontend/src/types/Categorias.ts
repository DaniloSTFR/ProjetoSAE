export type  CategoriasItensTypes = {
    codCategoriasItensUuId: string,
    descricaoCategoriasItens: string,
    nomeInternoCategoriasItens: string,
    ordemCategoriaItens: number
  }

export type Valores = 
    {
      chave: string,
      descricao: string
    }

export type OpcoesItensFormJson =
 {
      tipo: string,
      valores: Valores[]
    }


export type SaeItensformularios = 
      {
        codItensFormularios: number,
        descricaoItem: string,
        ordemItem: number,
        codCategoriasItensUuId: string,
        codCategoriasListaOpcoesUuId: string,
        opcoesItensFormJson: OpcoesItensFormJson
      }

export type Showcategoriasitens =
      {
        codCategoriasItensUuId: string,
        descricaoCategoriasItens: string,
        nomeInternoCategoriasItens: string,
        ordemCategoriaItens: number,
        saeItensformularios: SaeItensformularios[]  
      }    
