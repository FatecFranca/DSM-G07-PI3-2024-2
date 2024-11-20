import { createContext, ReactNode, useState } from 'react'

import { IUsuario, IUsuarioContext } from '../types/IUsuario'

const user: IUsuario = {
    'id': '',
    'nm_usuario': '',
    'ch_cpf_usuario': '',
    'ch_cnpj_usuario': '',
    'dt_nascimento_usuario': '',
    'nr_celular_usuario': '',
    'sg_estado_usuario': '',
    'nm_cidade_usuario': '',
    'cd_foto_usuario': 'default.png',
    'cd_senha_usuario': '',
    'cd_email_usuario': '',
    'fg_admin': 0,
    'qt_advertencias_usuario': 0,
    'fg_usuario_deletado': 0
}

const initialValue: IUsuarioContext = {
    user: user,
    setUser: (user: IUsuario) => {}
}


const UserContext = createContext<IUsuarioContext>(initialValue)

const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState<IUsuario>(initialValue.user)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider }