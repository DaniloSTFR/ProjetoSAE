import { useState } from 'react';
import { Link } from "react-router-dom"
import { Modal, Button } from 'react-bootstrap';


import request from 'axios';
import { BASE_URL } from 'utils/resquests';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


import back from 'assets/images/back.svg';
import sucesso from 'assets/images/vsucesso.svg';
import falha from 'assets/images/xfalha.svg';
import 'styles/cadastrar.scss';
import 'styles/modal.scss';

interface IFormCadastro {
    nomeUsuario: string;
    nomePessoa: string;
    email: string;
    senha: string;
    senha_confirma: string;
}

const schema = yup.object({

    nomeUsuario: yup.string().lowercase().required(" *Informe de usuário."),
    nomePessoa: yup.string().required(" *Informe o nome completo."),
    email: yup.string().email("E-mail inválido.").required("Informe o e-mail."),
    senha: yup.string().min(6, " *Informe a senha, ela deve ter ao menos 6 dígitos.").required("Informe a senha."),
    senha_confirma: yup.string().oneOf([yup.ref('senha'), null], "*A senha de confirmação não confere").required("*Repita a senha.")
});



const Cadastrar = () => {

    const [showSucesso, setShowSucesso] = useState(false);
    const handleCloseSucesso = () => setShowSucesso(false);
    const handleShowSucesso = () => setShowSucesso(true);

    const [showFalha, setShowFalha] = useState(false);
    const handleCloseFalha = () => setShowFalha(false);
    const handleShowFalha = () => setShowFalha(true);

    const { register, handleSubmit, formState: { errors } } = useForm<IFormCadastro>({
        resolver: yupResolver(schema)
    });

    const cadastroAction = async (data: IFormCadastro) => {

        try {
            const response = await request.post(`${BASE_URL}/create/usuarios`, data);
            console.log(response.data);
            handleShowSucesso();
            //history.push('/formulario');//redirect aqui ou
        } catch (err) {
            if (request.isAxiosError(err) && err.response) {
                console.log((err.response?.data).error);
                handleShowFalha();
                //setErrorMessage((err.response?.data).error);
            }
        }

    };

    return (
        <div>
            <div className="container" id="page-header">
                <div className="row align-items-end">
                    <div className=" mb-3 gap-2 col-xl-6 mx-auto aside">
                        <Link to="/">
                            <img src={back} alt="Voltar" />
                        </Link>
                    </div>
                </div>
                <div className="row align-items-end">
                    <div className=" mb-3 gap-2 col-xl-6 mx-auto aside">
                        <h1>Cadastrar</h1>
                    </div>
                </div>
            </div>

            <div className="container" id="page-form">
                <div className="row align-items-end">
                    <div className=" mb-3 gap-2 col-xl-8 mx-auto aside">
                        <form className="row g-3 " onSubmit={handleSubmit(cadastroAction)}>

                            <div className="col-12">
                                <label htmlFor="inputNomeCompleto" className="form-label">Nome completo</label>
                                <input type="text" className="form-control" id="inputNomeCompleto"
                                    {...register("nomePessoa", { required: true })} />
                                <h5>{errors.nomePessoa?.message}</h5>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputEmail" className="form-label">E-mail</label>
                                <input type="email" className="form-control" id="inputEmail"
                                    {...register("email", { required: true })} />
                                <h5>{errors.email?.message}</h5>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputUsuario" className="form-label">Usuário</label>
                                <input type="text" className="form-control" id="inputUsuario"
                                    {...register("nomeUsuario", { required: true })} />
                                <h5>{errors.nomeUsuario?.message}</h5>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputSenha" className="form-label">Senha</label>
                                <input type="password" className="form-control" id="inputSenha"
                                    {...register("senha", { required: true })} />
                                <h5>{errors.senha?.message}</h5>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputSenhaRepetir" className="form-label">Repetir senha</label>
                                <input type="password" className="form-control" id="inputSenhaRepetir"
                                    {...register("senha_confirma", { required: true })} />
                                <h5>{errors.senha_confirma?.message}</h5>
                            </div>

                            <div className="d-grid gap-2 col-xl-3  mb-3 mx-auto">
                                <button type="submit" className="btn btn-primary btn-lg">
                                    Cadastrar
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            <div>
                <Modal show={showSucesso} onHide={handleCloseSucesso}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered >
                    <Modal.Body>
                        <p><img src={sucesso} alt="Sucesso" /></p>
                        <h2>Sucesso!</h2>
                        <p>Usuário cadastrado com sucesso, agora realize o login.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link className="btn btn-primary btn-lg" to="/">
                            Avançar
                        </Link>
                    </Modal.Footer>
                </Modal>
            </div>

            <div>
                <Modal show={showFalha} onHide={handleCloseFalha}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered >
                    <Modal.Body>
                        <p><img src={falha} alt="Falha" /></p>
                        <h2>Usuário já cadastrado!</h2>
                        <p>Esse usuário já foi cadastrado anteriormente.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" size="lg" onClick={handleCloseFalha}>
                            Voltar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );

}

export default Cadastrar;
