export interface IAlimento {
    nm_alimento: string;
    cd_alimento: number;
    sg_medida_alimento: string;
}

export interface IAlimentoLista {
    nm_tipo_alimento: string;
    cd_tipo_alimento: number;
    alimentos: IAlimento[]   
}

export interface IAlimentoDoado extends IAlimento {
    qt_alimento_meta: number,
    qt_alimento_doado: number,
}

