export interface IUsuario {
    cd_usuario: Number,
    nm_usuario: String,
    ch_cpf_usuario: String,
    ch_cnpj_usuario: String,
    dt_nascimento_usuario: String,
    nr_celular_usuario: String,
    sg_estado_usuario: String,
    nm_cidade_usuario: String,
    cd_foto_usuario: String,
    cd_senha_usuario: String,
    cd_email_usuario: String,
    fg_admin: Number,
    qt_advertencias_usuario: Number,
    fg_usuario_deletado: Number,
}

export interface IUsuarioInsert {
    cd_usuario: Number,
    nm_usuario: String,
    ch_documento_usuario: String,
    dt_nascimento_usuario: String,
    nr_celular_usuario: String,
    sg_estado_usuario: String,
    nm_cidade_usuario: String,
    cd_senha_usuario: String,
    cd_email_usuario: String,
}

export interface IUsuarioContext {
    user: IUsuario,
    setUser: (user: IUsuario) => void
}