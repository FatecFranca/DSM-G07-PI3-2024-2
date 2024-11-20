import { Navbar } from '../../components/Navbar'

import { Link, useNavigate } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { UserContext } from '../../contexts/userContext';
import { IUsuario } from '../../types/IUsuario';
import axios from 'axios';

export const Login = () => {
    const [visiblePass, setVisiblePass] = useState(false)
    const { authenticated, setAuthenticated } = useContext(AuthContext)
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const value: IUsuario = {
        'id': '',
        'nm_usuario': '',
        'ch_cpf_usuario': '',
        'ch_cnpj_usuario': '',
        'dt_nascimento_usuario': '',
        'nr_celular_usuario': '',
        'sg_estado_usuario': '',
        'nm_cidade_usuario': '',
        'cd_foto_usuario': '1.png',
        'cd_senha_usuario': '',
        'cd_email_usuario': '',
        'fg_admin': 0,
        'qt_advertencias_usuario': 0,
        'fg_usuario_deletado': 0
    }


    type responseUserData = {
        user: IUsuario,
        authenticated: Boolean,
        message: String
    }


    type responseLogin = {
        data: responseUserData,
        status: Number
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const user_email = event.target.email.value;
        const user_password = event.target.password.value;

        if (!user_email || !user_password) {
            alert('Por favor, preencha todos os campos.');
            return;
    }
        const userLogin = async () => {
            try {
                const response = await axios.post<responseUserData>('/api/usuarioLogin', {
                    user_email: user_email,
                    user_password: user_password,
                });
                const responseLogin: responseLogin = {
                    "status": response.status,
                    "data": {
                        user: response.data.user,
                        authenticated: response.data.authenticated,
                        message: response.data.message
                    },
                }
                return responseLogin
            } catch (error) {
                console.error('Erro:', error);
                throw error;
            }
        }

        const handleUserLogin = async () => {
            try {
                const { status, data } = await userLogin();
                if (status != 200) {
                    console.log('Erro ao fazer login')
                } else {
                    if (data.authenticated) {
                        console.log('Login realizado com sucesso', data)
                        setAuthenticated(true)
                        setUser(data.user)
                        navigate('/descobrir')
                    } else {
                        console.log('Usuario ou senha inválidos', data)
                        alert('Usuario ou senha inválidos. Por favor, tente novamente.');
                    }
                }
            } catch (error) {
                console.error('Erro ao fazer login', error);
                alert('Usuario ou senha inválidos. Por favor, tente novamente.');
            }
        }

        handleUserLogin();

        event.target.reset();
    }

    function showPassword() {
        setVisiblePass(!visiblePass)
    }

    return (
        <>
            <Navbar page='Login' />

            <main className="lyt_forms pg_login">
                <div className="form-container column">
                    <p className="sub titulo">Login</p>
                    <form className="form-login column" method="POST" onSubmit={handleSubmit}>
                        <label htmlFor="">Email</label>
                        <input className="input-form" type="email" name="email" />
                        <div className="chkbx-container exibir row" id="">
                            <input className="checkbox-form" type="checkbox" name="" id="ckbExibir" onChange={showPassword} />
                            <label className="" htmlFor="ckbExibir">Exibir senha</label>
                        </div>
                        <label htmlFor="">Senha</label>
                        <input className="input-form pass" type={visiblePass ? 'text' : 'password'} name="password" />
                        <Link className="titulo-link" to="#">Esqueci minha senha</Link>
                        <input className="btn btn blue" type="submit" value="Entrar" />
                    </form>
                </div>
            </main>

        </>
    );
};