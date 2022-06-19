import { createContext, ReactNode,useEffect,  useState } from "react";
import { useHistory } from 'react-router-dom'
import request from 'axios';
import { BASE_URL } from 'utils/resquests';
import { useCookies } from 'react-cookie';

type Usuario = {
  token?: string;
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
  signOutAction: () => Promise<void>;
  loadContext: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [usuario, setUsuario] = useState<Usuario>();
  const history = useHistory();
  const [cookies, setCookie] = useCookies(['token']);

useEffect(() => {
      console.log("UseEffect: ");
      console.log(cookies);
      const unsubscribe = async ()=>{
      if (cookies.token!==''){
        findUsuario();
      }else{
        console.log("Token Expirado!");
        history.push('/');
      }

    }
    unsubscribe();
    // eslint-disable-next-line 
  }, [cookies.token]); 

  async function findUsuario(){

    console.log("findUsuario");
    try {

      const responseget = await request.get(`${BASE_URL}/find/usuario`,
      {
        headers: {
          'Authorization': `token ${cookies.token}`
        }
      });
  
      await setUsuario({
        token: cookies.token,
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
  }

  async function signInAction(nomeUsuario: string, senhaUsuario: string) {

    const responseToken = await request.post<tokenAuth>(`${BASE_URL}/autenticarusuarios`, {
      usuario: nomeUsuario,
      senha: senhaUsuario
    });

    const token = responseToken.data.token;
    setCookie('token', token, { path: '/' });
    await findUsuario();
  }

  async function signOutAction() {
    await setCookie('token', '', { path: '/' });
    history.push('/');
  }

  async function loadContext() {
    await findUsuario();
  }
  
  /* findUsuario(); */
  return (
    <AuthContext.Provider value={{ usuario, signInAction, signOutAction, loadContext }}>
      {props.children}
    </AuthContext.Provider>
  );
}