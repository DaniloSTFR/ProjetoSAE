import request from 'axios';
import { BASE_URL } from 'utils/resquests';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Usuario } from 'types/Usuario';
import 'styles/prontuario.scss';

interface IFormProntuario {
    nomePaciente: string;
    dataNascimento: string;
    dataNascimentoDia: number;
    dataNascimentoMes: number;
    dataNascimentoAno: number;
    altura: string;
    peso: string;
    imc: string;
    glicemia: string;
    pressaoArterial: string;
    oximetria: string;

}

const schema = yup.object({

    nomePaciente: yup.string().required(" *Informe o nome completo do Paciente."),
    dataNascimentoDia: yup.string().required("*Obrigatório"),
    altura: yup.string().required("*Obrigatório"),
    peso: yup.string().required(" *Obrigatório."),
    //imc: yup.string().required(" *Obrigatório."),
    glicemia: yup.string().required(" *Obrigatório."),
    pressaoArterial: yup.string().required(" *Obrigatório."),
    oximetria: yup.string().required(" *Obrigatório."),
});

type Props = {
    usuarioContext: Usuario | undefined;
    toHomeComponent: Function;
}

const FormProntuario = ({ usuarioContext, toHomeComponent }: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormProntuario>({
        resolver: yupResolver(schema)
    });

    const [sucessoMessage, setSucessoMessage] = useState('');
    const [isOpened, setIsOpened] = useState(false);
    const [uuidProntuario, setUuidProntuario] = useState('');

    const [valDia, setValDia] = useState('');
    const [valMes, setValMes] = useState('');
    const [valAno, setValAno] = useState('');
    const [valAltura, setValAltura] = useState('');
    const [valPeso, setValPeso] = useState('');
    const [valIMC, setValIMC] = useState('');
    const [valGlicemia, setValGlicemia] = useState('');
    const [valPA, setValPA] = useState('');
    const [valOxi, setValOxi] = useState('');


    const cadastroAction = async (data: IFormProntuario) => {

        try {
            const imc = (Number(data.peso.replace(',', '.'))) / Math.pow(Number(data.altura.replace(',', '.')), 2);
            setValIMC((+(imc.toFixed(2))).toString());

            const pramsRequest = {
                codUsuarioUuId: usuarioContext?.codUsuarioUuId,
                nomePaciente: data.nomePaciente,
                dataNascimento: `${data.dataNascimentoAno}-${data.dataNascimentoMes}-${data.dataNascimentoDia}`,
                altura: Number(data.altura.replace(',', '.')),
                peso: Number(data.peso.replace(',', '.')),
                imc: (+(imc.toFixed(2))),
                glicemia: Number(data.glicemia.replace(',', '.')),
                pressaoArterial: data.pressaoArterial,
                oximetria: Number(data.oximetria.replace(',', '.'))
            };

            const response = await request.post(`${BASE_URL}/create/prontuarios`, pramsRequest,
                {
                    headers: {
                        'Authorization': `token ${usuarioContext?.token}`
                    }
                });

            setSucessoMessage(response.data.message);
            console.log(response.data);
            setUuidProntuario(response.data.novoNumeroprontuario.numeroprontuario);
            setIsOpened(true);

        } catch (err) {
            if (request.isAxiosError(err) && err.response) {
                console.log((err.response?.data).error);
            }
        }

    };

    return (
        <> 
            <div className="container" id="page-form">
                <div className="row align-items-end">
                    <div className=" mb-3 gap-2 col-xl-8 mx-auto aside">
                        <form className="row g-3 " onSubmit={handleSubmit(cadastroAction)}>

                            <div className="col-12">
                                <label htmlFor="inputNomePaciente" className="form-label">Nome completo do Paciente:</label>
                                <input type="text" className="form-control" id="inputNomePaciente" disabled={isOpened}
                                    {...register("nomePaciente", { required: true })} />
                                <h5>{errors.nomePaciente?.message}</h5>
                            </div>
                            <div className="row g-3 col-12">
                                <div className="col-md-2 inputWidthNascimento">
                                    <label htmlFor="inputDataNascimentoDia" className="form-label">Dia:</label>
                                    <input type="text" className="form-control" id="inputDataNascimentoDia" disabled={isOpened}
                                        pattern="(0?[1-9]|[12][0-9]|3[01])"
                                        value={valDia}
                                        {...register("dataNascimentoDia", {
                                            required: true,
                                            onChange: (e) => setValDia((v: any) => (e.target.validity.valid ? e.target.value : v))
                                        })
                                        }
                                    />
                                </div>
                                <div className="col-md-2 inputWidthNascimento">
                                    <label htmlFor="inputDataNascimentoMes" className="form-label">Mês:</label>
                                    <input type="text" className="form-control" id="inputDataNascimentoMes" disabled={isOpened}
                                        pattern="(0?[1-9]|1[012])"
                                        value={valMes}
                                        {...register("dataNascimentoMes", {
                                            required: true,
                                            onChange: (e) => setValMes((v: any) => (e.target.validity.valid ? e.target.value : v))
                                        })
                                        }
                                    />
                                </div>
                                <div className="col-md-2 inputWidthNascimento">
                                    <label htmlFor="inputDataNascimentoAno" className="form-label">Ano:</label>
                                    <input type="text" className="form-control" id="inputDataNascimentoAno" disabled={isOpened}
                                        pattern="(0?[1-9]|[1-2][0-9]|[1-2][0-9][0-9]|[1-2][0-9][0-9][0-9])"
                                        value={valAno}
                                        {...register("dataNascimentoAno", {
                                            required: true,
                                            onChange: (e) => setValAno((v: any) => (e.target.validity.valid ? e.target.value : v))
                                        })
                                        }
                                    />
                                </div>
                                <h5>{errors.dataNascimentoDia?.message}</h5>
                            </div>
                            <div className="col-md-4 inputWidth">
                                <label htmlFor="inputAltura" className="form-label">Altura(m):</label>
                                <input type="text" className="form-control" id="inputAltura" disabled={isOpened}
                                    pattern="\d+,?\d{0,4}|\d+.?\d{0,4}"
                                    value={valAltura}
                                    {...register("altura", {
                                        required: true,
                                        onChange: (e) => setValAltura((v: any) => (e.target.validity.valid ? e.target.value : v))
                                    })
                                    }
                                />
                                <h5>{errors.altura?.message}</h5>
                            </div>
                            <div className="col-md-4 inputWidth">
                                <label htmlFor="inputPeso" className="form-label">Peso(kg):</label>
                                <input type="text" className="form-control" id="inputPeso" disabled={isOpened}
                                    pattern="\d+,?\d{0,4}|\d+.?\d{0,4}"
                                    value={valPeso}
                                    {...register("peso", {
                                        required: true,
                                        onChange: (e) => setValPeso((v: any) => (e.target.validity.valid ? e.target.value : v))
                                    })
                                    }
                                />
                                <h5>{errors.peso?.message}</h5>
                            </div>
                            <div className="col-md-4 inputWidth">
                                <label htmlFor="inputIMC" className="form-label">IMC:</label>
                                <input type="text" className="form-control" id="inputIMC" disabled={true}
                                    pattern="\d+,?\d{0,4}|\d+.?\d{0,4}"
                                    value={valIMC}
                                    {...register("imc", {

                                        onChange: (e) => setValIMC((v: any) => (e.target.validity.valid ? e.target.value : v))
                                    })
                                    }
                                />

                            </div>

                            <div className="col-md-4 inputWidth">
                                <label htmlFor="inputGlicemia" className="form-label">Glicemia:</label>
                                <input type="text" className="form-control" id="inputGlicemia" disabled={isOpened}
                                    pattern="\d+,?\d{0,4}|\d+.?\d{0,4}"
                                    value={valGlicemia}
                                    {...register("glicemia", {
                                        required: true,
                                        onChange: (e) => setValGlicemia((v: any) => (e.target.validity.valid ? e.target.value : v))
                                    })
                                    }
                                />
                                <h5>{errors.glicemia?.message}</h5>
                            </div>
                            <div className="col-md-4 inputWidth">
                                <label htmlFor="inputPressaoArterial" className="form-label">Pressão arteria:</label>
                                <input type="text" className="form-control" id="inputPressaoArterial" disabled={isOpened}
                                    pattern="\d+/?\d{0,4}" placeholder="__/__"
                                    value={valPA}
                                    {...register("pressaoArterial", {
                                        required: true,
                                        onChange: (e) => setValPA((v: any) => (e.target.validity.valid ? e.target.value : v))
                                    })
                                    }
                                />
                                <h5>{errors.pressaoArterial?.message}</h5>
                            </div>
                            <div className="col-md-4 inputWidth">
                                <label htmlFor="inputOximetria" className="form-label">Oxímetria:</label>
                                <input type="text" className="form-control" id="inputOximetria" disabled={isOpened}
                                    pattern="\d+,?\d{0,4}|\d+.?\d{0,4}"
                                    value={valOxi}
                                    {...register("oximetria", {
                                        required: true,
                                        onChange: (e) => setValOxi((v: any) => (e.target.validity.valid ? e.target.value : v))
                                    })
                                    }
                                />
                                <h5>{errors.oximetria?.message}</h5>
                            </div>
                            <div className="d-grid gap-2 col-xl-12  mb-3 mx-auto">
                                <h5 className="goodmessage">{sucessoMessage}</h5>
                            </div>

                            {isOpened ?
                                <div className="d-grid gap-2 col-xl-3  mb-3 mx-auto">
                                    <button type="button" className="btn btn-success btn-lg" onClick={() => toHomeComponent("formulario",uuidProntuario)}>
                                        Avançar
                                    </button>
                                </div>
                                :
                                <div className="d-grid gap-2 col-xl-3  mb-3 mx-auto">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Cadastrar
                                    </button>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    );

}
export default FormProntuario;
