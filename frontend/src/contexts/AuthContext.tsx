import { createContext, ReactNode,useEffect,  useState } from "react";
import { useHistory } from 'react-router-dom'
import request from 'axios';
import { BASE_URL } from 'utils/resquests';

type Usuario = {
  token: string;
	codUsuarioUuId: string;
	nomeUsuario: string;
	nomePessoa: string;
	email: string;
	dataCadastro: Date;
	dataExclusao?: Date;
	tagUsuario: string;
}

interface tokenAuth {
  token: string;
}

type AuthContextType = {
  usuario: Usuario | undefined;
  signInAction: (nomeUsuario: string, senha: string) => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [usuario, setUsuario] = useState<Usuario>();
  const history = useHistory();

useEffect(() => {
    const unsubscribe = async ()=>{
      console.log("No unsubscribe!");
      if (usuario){
        
        try {

          const responseget = await request.get(`${BASE_URL}/find/usuario`,
          {
            headers: {
              'Authorization': `token ${usuario.token}`
            }
          });
      
          await setUsuario({
            token: usuario.token,
            codUsuarioUuId: responseget.data.codUsuarioUuId,
            nomeUsuario: responseget.data.nomeUsuario,
            nomePessoa: responseget.data.nomePessoa,
            email: responseget.data.email,
            dataCadastro: responseget.data.dataCadastro,
            dataExclusao: responseget.data.dataExclusao,
            tagUsuario: responseget.data.tagUsuario
          })
            
        } catch (err) {
            if (request.isAxiosError(err) && err.response) {
                console.log((err.response?.data).error);
                history.push('/');
          }
      }

      }else{
        console.log("Token Expirado!");
        history.push('/');
      }

    }
    return () => {
      unsubscribe();
    }
    // eslint-disable-next-line 
  }, []) 

  async function signInAction(nomeUsuario: string, senhaUsuario: string) {

    const responseToken = await request.post<tokenAuth>(`${BASE_URL}/autenticarusuarios`, {
      usuario: nomeUsuario,
      senha: senhaUsuario
    });

    const token = responseToken.data.token;

    /******************************************************************/

    const responseget = await request.get(`${BASE_URL}/find/usuario`,
    {
      headers: {
        'Authorization': `token ${token}`
      }
    });

    await setUsuario({
      token: token,
      codUsuarioUuId: responseget.data.codUsuarioUuId,
      nomeUsuario: responseget.data.nomeUsuario,
      nomePessoa: responseget.data.nomePessoa,
      email: responseget.data.email,
      dataCadastro: responseget.data.dataCadastro,
      dataExclusao: responseget.data.dataExclusao,
      tagUsuario: responseget.data.tagUsuario
    })
  }
  
  return (
    <AuthContext.Provider value={{ usuario, signInAction }}>
      {props.children}
    </AuthContext.Provider>
  );
}