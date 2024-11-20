import axios from 'axios';
import { IEstadoCidades } from '../types/IEstadoCidade';

interface ICidade {
    "municipio-id": number,
    "municipio-nome": string,
    "microrregiao-id": number,
    "microrregiao-nome": string,
    "mesorregiao-id": number,
    "mesorregiao-nome": string,
    "regiao-imediata-id": number,
    "regiao-imediata-nome": string,
    "regiao-intermediaria-id": number,
    "regiao-intermediaria-nome": string,
    "UF-id": number,
    "UF-sigla": string,
    "UF-nome": string,
    "regiao-id": number,
    "regiao-sigla": string,
    "regiao-nome": string,
}

interface IEstado {
    "UF-id": number,
    "UF-sigla": string,
    "UF-nome": string,
    "regiao-id": number,
    "regiao-sigla": string,
    "regiao-nome": string,
}

export async function fetchEstadosCidades() {
    try {
        const estadosResponse = await axios.get<IEstado[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?view=nivelado&orderBy=nome');

        const estados = estadosResponse.data;

        const estadosCidades: IEstadoCidades[] = [];

        for (const state of estados) {
            const stateAbbreviation = state['UF-sigla'];
            const citiesResponse = await axios.get<ICidade[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateAbbreviation}/municipios?view=nivelado&orderBy=nome`);
            const cities = citiesResponse.data;

            estadosCidades.push({
                sg_estado: state['UF-sigla'],
                cidades: cities.map(city => city['municipio-nome'])
            });
        }

        return estadosCidades;
    } catch (error) {
        console.error('Erro ao buscar estados e cidades:', error);
        return [];
    }
}

export const campanhasIbgeApi = fetchEstadosCidades()