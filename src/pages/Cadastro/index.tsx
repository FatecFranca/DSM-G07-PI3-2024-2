import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import axios from 'axios';
import { IEstadoCidades } from '../../types/IEstadoCidade';

export const Cadastro = () => {
    const [tipo_usuario, setTipoUsuario] = useState<string>('pf');
    const [nm_usuario, setNmUsuario] = useState<string>('');
    const [ch_documento_usuario, setChDocumentoUsuario] = useState<string>('');
    const [cd_email_usuario, setCdEmailUsuario] = useState<string>('');
    const [nr_celular_usuario, setNrCelularUsuario] = useState<string>('');
    const [dt_nascimento_usuario, setDtNascimentoUsuario] = useState<string>('');
    const [cd_senha_usuario, setCdSenhaUsuario] = useState<string>('');
    const [cd_senha_usuario_confirmacao, setCdSenhaUsuarioConfirmacao] = useState<string>('');
    const [sg_estado_usuario, setSgEstadoUsuario] = useState<string>('');
    const [nm_cidade_usuario, setNmCidadeUsuario] = useState<string>('');

    const navigate = useNavigate();
    const [listaEstadosCidades, setListaEstadosCidades] = useState<IEstadoCidades[]>([]);
    const [listaCidades, setListaCidades] = useState<string[]>([]);
    const [cidadeSelecionada, setCidadeSelecionada] = useState<string>('');

    useEffect(() => {
        axios.get('/api/estadosCidades').then((response) => {
            setListaEstadosCidades(response.data);
        }).catch((err) => {
            console.log('Error: ' + err);
        });
    }, []);

    const handleChangeEstadoSelecionado = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEstado = event.target.value;
        const estado = listaEstadosCidades.find(estado => estado.sg_estado === selectedEstado)!.cidades;
        setListaCidades(estado);
        setSgEstadoUsuario(selectedEstado);
    };

    const handleChangeCidadeSelecionada = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectCidade = event.target.value;
        setCidadeSelecionada(selectCidade);
        setNmCidadeUsuario(selectCidade);
    };

    const validateForm = (event: any, tipo_usuario: string) => {
        if (!nm_usuario) {
            alert("Nome é obrigatório");
            return false;
        }

        if (!ch_documento_usuario) {
            alert(tipo_usuario === 'pf' ? "CPF é obrigatório" : "CNPJ é obrigatório");
            return false;
        }

        if (!cd_email_usuario) {
            alert("Email é obrigatório");
            return false;
        }

        if (!nr_celular_usuario) {
            alert("Celular é obrigatório");
            return false;
        }

        if (!cd_senha_usuario) {
            alert("Senha é obrigatória");
            return false;
        }

        if (!cd_senha_usuario_confirmacao) {
            alert("Confirme sua senha");
            return false;
        }

        if (cd_senha_usuario_confirmacao !== cd_senha_usuario) {
            alert('A confirmação da senha deve ser igual à senha');
            return false;
        }

        if (!sg_estado_usuario) {
            alert("Estado é obrigatório");
            return false;
        }

        if (!nm_cidade_usuario) {
            alert("Cidade é obrigatória");
            return false;
        }

        return true;
    };
    let user_infos = {}
    const handleSubmit = (event: any) => {
        event.preventDefault();

        const tipo_usuario = event.target.tipo_usuario.value;

        if (!validateForm(event, tipo_usuario)) {
            return;
        }

        if(tipo_usuario === "pf"){
            user_infos = {
                tipo_usuario: tipo_usuario,
                nm_usuario: nm_usuario,
                ch_cpf_usuario: ch_documento_usuario,
                cd_email_usuario: cd_email_usuario,
                nr_celular_usuario: nr_celular_usuario,
                dt_nascimento_usuario: new Date(dt_nascimento_usuario),
                cd_senha_usuario: cd_senha_usuario,
                sg_estado_usuario: sg_estado_usuario,
                nm_cidade_usuario: nm_cidade_usuario,
                cd_foto_usuario: "default.png",
                fg_admin: 0,
                qt_advertencias_usuario: 0,
                fg_usuario_deletado: 0
            };
        }
        else {
            user_infos = {
                tipo_usuario: tipo_usuario,
                nm_usuario: nm_usuario,
                ch_cnpj_usuario: ch_documento_usuario,
                cd_email_usuario: cd_email_usuario,
                nr_celular_usuario: nr_celular_usuario,
                cd_senha_usuario: cd_senha_usuario,
                sg_estado_usuario: sg_estado_usuario,
                nm_cidade_usuario: nm_cidade_usuario,
                cd_foto_usuario: "default.png",
                fg_admin: 0,
                qt_advertencias_usuario: 0,
                fg_usuario_deletado: 0
            };
        }


        const dbInsert = async () => {
            try {
                const response = await axios.post('/api/usuarioCadastro', {
                    user_infos: user_infos,
                });
                return [response.status, response.data];
            } catch (error) {
                console.error('Erro:', error);
                throw error;
            }
        };

        const handleDBInsert = async () => {
            try {
                const [responseStatus, responseData] = await dbInsert();
                if (responseStatus !== 200) {
                    console.log('Erro ao salvar dados no banco');
                } else {
                    console.log('Sucesso ao salvar dados no banco ', responseData);
                    navigate('/login');
                }
            } catch (error) {
                console.error('Erro ao inserir dados:', error);
            }
        };

        handleDBInsert();
    };

    const handleTipoUsuarioChange = (value: string) => {
        setTipoUsuario(value);
    };

    return (
        <>
            <Navbar page='Cadastro' />
            <main className="lyt_forms pg_cadastro">
                <div className="form-container column">
                    <p className="sub titulo">Cadastrar-se</p>
                    <form className="form-login column" method="POST" onSubmit={handleSubmit}>
                        <div className="row cpfj">
                            <div className="row">
                                <input
                                    type="radio"
                                    name="tipo_usuario"
                                    id="pf"
                                    value="pf"
                                    checked={tipo_usuario === 'pf'}
                                    onChange={() => handleTipoUsuarioChange('pf')}
                                />
                                <label htmlFor="pf">Pessoa Física</label>
                            </div>
                            <div className="row">
                                <input
                                    type="radio"
                                    name="tipo_usuario"
                                    id="pj"
                                    value="pj"
                                    checked={tipo_usuario === 'pj'}
                                    onChange={() => handleTipoUsuarioChange('pj')}
                                />
                                <label htmlFor="pj">Pessoa Jurídica</label>
                            </div>
                        </div>
                        <label className="lblNome" htmlFor="">
                            {tipo_usuario === 'pf' ? 'Nome completo' : 'Nome da instituição'}
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            name="nm_usuario"
                            value={nm_usuario}
                            onChange={(e) => setNmUsuario(e.target.value)}
                        />

                        <label className="lblCpf" htmlFor="">
                            {tipo_usuario === 'pf' ? 'CPF' : 'CNPJ'}
                        </label>
                        <input
                            className="input-form"
                            type="text"
                            name='ch_documento_usuario'
                            value={ch_documento_usuario}
                            onChange={(e) => setChDocumentoUsuario(e.target.value)}
                        />

                        <label htmlFor="">Email</label>
                        <input
                            className="input-form"
                            type="email"
                            name="cd_email_usuario"
                            placeholder="exemplo@email.com"
                            value={cd_email_usuario}
                            onChange={(e) => setCdEmailUsuario(e.target.value)}
                        />

                        <label htmlFor="">Celular</label>
                        <input
                            className="input-form"
                            type="tel"
                            name="nr_celular_usuario"
                            value={nr_celular_usuario}
                            onChange={(e) => setNrCelularUsuario(e.target.value)}
                        />

                        {tipo_usuario === 'pf' && (
                            <div className="column nascWrapper">
                                <label className="lblDtNasc" htmlFor="">
                                    Data de nascimento
                                </label>
                                <input
                                    className="input-form"
                                    type="date"
                                    name="dt_nascimento_usuario"
                                    value={dt_nascimento_usuario}
                                    onChange={(e) => setDtNascimentoUsuario(e.target.value)}
                                />
                            </div>
                        )}

                        <div className="column passWrapper">
                            <label htmlFor="">Senha</label>
                            <input
                                className="input-form"
                                type="password"
                                name="cd_senha_usuario"
                                value={cd_senha_usuario}
                                onChange={(e) => setCdSenhaUsuario(e.target.value)}
                            />
                        </div>

                        <label htmlFor="">Confirme sua senha</label>
                        <input
                            className="input-form"
                            type="password"
                            name="cd_senha_usuario_confirmacao"
                            value={cd_senha_usuario_confirmacao}
                            onChange={(e) => setCdSenhaUsuarioConfirmacao(e.target.value)}
                        />

                        <div className="row">
                            <div className="column">
                                <label htmlFor="">Estado</label>
                                <select
                                    name="sg_estado_usuario"
                                    className="input-form"
                                    id="estadoCampanha"
                                    value={sg_estado_usuario}
                                    onChange={handleChangeEstadoSelecionado}
                                >
                                    <option value="0" disabled={true}>Selecione o Estado</option>
                                    {listaEstadosCidades.map((estado, index) => (
                                        <option key={index} value={estado.sg_estado}>
                                            {estado.sg_estado}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="column">
                                <label htmlFor="">Cidade</label>
                                <select
                                    name="nm_cidade_usuario"
                                    className="input-form"
                                    id="cidadeCampanha"
                                    value={nm_cidade_usuario}
                                    onChange={handleChangeCidadeSelecionada}
                                >
                                    <option value="0" disabled={true}>Selecione a Cidade</option>
                                    {listaCidades.map((cidade, index) => (
                                        <option key={index} value={cidade}>
                                            {cidade}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <input className="btn btn blue" type="submit" value="Cadastrar" />
                    </form>
                </div>
            </main>
        </>
    );
};

export default Cadastro;
