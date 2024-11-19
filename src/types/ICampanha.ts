import { IAlimentoDoado } from "./IAlimento";

export interface ICampanha {
    cd_campanha: number;
    cd_usuario_campanha: number;
    nm_titulo_campanha: string;
    dt_encerramento_campanha: string;
    ts_criacao_campanha: string;
    nm_cidade_campanha: string;
    sg_estado_campanha: string;
    ds_acao_campanha: string;
    cd_deletado_campanha: number;
    qt_total_campanha: number;
    cd_imagem_campanha: string;
    qt_doacoes_campanha: number;
    minutos_restantes: number,
    horas_restantes: number,
    dias_restantes: number,
    meses_restantes: number,
    anos_restantes: number,
}

export interface ICampanhaAlimento extends ICampanha {
    nm_usuario: string;
    cd_foto_usuario: string;
    alimentos: IAlimentoDoado[]
}

export interface ICampanhaNova {
    cd_campanha: number;
    cd_usuario_campanha: number;
    nm_titulo_campanha: string;
    dt_encerramento_campanha: string;
    nm_cidade_campanha: string;
    sg_estado_campanha: string;
    ds_acao_campanha: string;
    qt_total_campanha: number;
    cd_imagem_campanha: string;
}