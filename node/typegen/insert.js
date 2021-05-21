var matriz =
[
    [	'Condição Moradia',	'MORADIA_PROPRIA',	'MORADIA_CEDIDA',	'MORADIA_ALUGADA'],
    [	'Tem Energia elétrica',	'TEM_ENERGIA_ELETRICA_SIM',	'TEM_ENERGIA_ELETRICA_NAO'],
    [	'Tem Água tratada',	'TEM_AGUA_TRATADA_SIM',	'TEM_AGUA_TRATADA_NAO'],
    [	'Tem Coleta de lixo',	'TEM_COLETA_DE_LIXO_SIM',	'TEM_COLETA_DE_LIXO_NAO']
      
    
]	

let nomeInternoCategoriasItens = 'Moradia';
let ordemItem = 1;
let arr = [];
let str = "";

console.log(matriz.length)

for (let j = 0; j < matriz.length; j++){

    arr = matriz[j];

    let values = '"valores": [\n';
    for(let i=1; i<arr.length; i++){
        values += '            {\n';

        values += i==2 ? '                "descricao": "Não",\n':'                "descricao": "Sim",\n';

        values +=    `                "chave": "${arr[i]}" \n`+
        '            },\n';
    }
    values = removeLastComma(values);
    values = values +'\n          ]';

    //console.log(values)

    str +=
    `{ \n`+
    `    "descricaoItem":"${arr[0]}",  \n`+
    `    "ordemItem" : ${ordemItem},  \n`+
    `    "opcoesItensFormJson":{  \n`+
    `    "tipo" : "unica", \n`+
    `    ${values}`+
    `  }, \n`+
    `    "nomeInternoCategoriasItens":"${nomeInternoCategoriasItens}",  \n`+
    `  "nomeInternoCategoriasOpcoes" : "" \n`+
    `} \n`+
    `, \n`;

    ordemItem++;

}


console.log(str)

document.querySelector("p#inserts").innerHTML= str;



function removeLastComma(strng){        
    var n=strng.lastIndexOf(",");
    var a=strng.substring(0,n) 
    return a;
}
