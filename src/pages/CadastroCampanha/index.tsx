import React, { useState, useEffect, FormEvent, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { fetchEstadosCidades, campanhasIbgeApi } from '../../data/IbgeApi'

import axios from 'axios';
import { } from '../../'
import { IAlimento, IAlimentoLista } from '../../types/IAlimento';
import { IEstadoCidades } from '../../types/IEstadoCidade';
import { UserContext } from '../../contexts/userContext';

interface FoodProps {
    id: any;
    delFood: () => void;
}

const Food: React.FC<FoodProps> = ({ id, delFood }) => {
    const [listaCategoriaAlimentos, setListaCategoriaAlimentos] = useState<IAlimentoLista[]>([]);
    const [listaAlimentos, setListaAlimentos] = useState<IAlimento[]>([]);
    const [alimentoSelecionado, setAlimentoSelecionado] = useState<IAlimento>();

    useEffect(() => {
        axios.get<IAlimentoLista[]>('/api/alimentos')
            .then(response => setListaCategoriaAlimentos(response.data))
            .catch(err => console.log('Error: ' + err));
    }, []);

    useEffect(() => {
        if (listaCategoriaAlimentos.length > 0) {
            const alimentos = listaCategoriaAlimentos.find(alimentos => alimentos.cd_tipo_alimento === 1)?.alimentos || [];
            alimentos.sort((a, b) => a.id.localeCompare(b.id));
            setListaAlimentos(alimentos);
        }
    }, [listaCategoriaAlimentos]);

    useEffect(() => {
        if (listaAlimentos.length > 0) {
            const alimento = listaAlimentos.find(alimentos => alimentos.id);
            setAlimentoSelecionado(alimento);
        }
    }, [listaAlimentos]);

    const handleChangeTipoAlimentoSelecionado = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTipo = parseInt(event.target.value);
        const alimentos = listaCategoriaAlimentos.find(alimentos => alimentos.cd_tipo_alimento === selectedTipo)?.alimentos || [];
        alimentos.sort((a, b) => a.id.localeCompare(b.id));
        setListaAlimentos(alimentos);
    };

    const handleChangeAlimentoSelecionado = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selecteIdAlimento = event.target.value;
        const alimento = listaAlimentos.find(alimento => alimento.id === selecteIdAlimento);
        setAlimentoSelecionado(alimento);
    };

    return (
        <div className="alimento row" id={id}>
            <div className="tipo-input">
                <label>Tipo</label>
                <select className="input-form tpf" name="cd_tipo_alimento" onChange={handleChangeTipoAlimentoSelecionado}>
                    <option value="0" disabled>Selecione um tipo</option>
                    {listaCategoriaAlimentos.map(alimentos => (
                        <option key={alimentos.cd_tipo_alimento} value={alimentos.cd_tipo_alimento}>
                            {alimentos.nm_tipo_alimento}
                        </option>
                    ))}
                </select>
            </div>

            <div className="alimento-input">
                <label>Alimento</label>
                <select className="input-form alimentoInput" name="id" onChange={handleChangeAlimentoSelecionado}>
                    <option value="0" disabled>Selecione um alimento</option>
                    {listaAlimentos.map(alimento => (
                        <option key={alimento.id} value={alimento.id}>
                            {alimento.nm_alimento}
                        </option>
                    ))}
                </select>
            </div>

            <div className="quantidade-input">
                <label>Quantidade</label>
                <div className="qtdAl row">
                    <input className="input-form quantidade" type="number" min="1" name="qt_alimento_meta" />
                    <h1 className="sub titulo medidaAlimento">{alimentoSelecionado?.sg_medida_alimento}</h1>
                </div>
            </div>

            <button className="btn red excluir" type="button" onClick={delFood}>
                <img src="/assets/img/trash.svg" alt="excluir" />
            </button>
        </div>
    );
};

// interface ICidade {
//     "municipio-id": number,
//     "municipio-nome": string,
//     "microrregiao-id": number,
//     "microrregiao-nome": string,
//     "mesorregiao-id": number,
//     "mesorregiao-nome": string,
//     "regiao-imediata-id": number,
//     "regiao-imediata-nome": string,
//     "regiao-intermediaria-id": number,
//     "regiao-intermediaria-nome": string,
//     "UF-id": number,
//     "UF-sigla": string,
//     "UF-nome": string,
//     "regiao-id": number,
//     "regiao-sigla": string,
//     "regiao-nome": string,
// }

// interface IEstado {
//     "UF-id": number,
//     "UF-sigla": string,
//     "UF-nome": string,
//     "regiao-id": number,
//     "regiao-sigla": string,
//     "regiao-nome": string,
// }

export const CriacaoCampanha = () => {
    const [qtAlimentos, setQtAlimentos] = useState<number>(1);
    const [listaEstadosCidades, setListaEstadosCidades] = useState<IEstadoCidades[]>([]);
    const [listaCidades, setListaCidades] = useState<string[]>([]);
    const [cidadeSelecionada, setCidadeSelecionada] = useState<string>('');
    const user = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/estadosCidades')
            .then(response => setListaEstadosCidades(response.data))
            .catch(err => console.log('Error: ' + err));
    }, []);

    useEffect(() => {
        if (!user.user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // async function fetchStatesAndCities() {
    //     try {
    //         const estadosResponse = await axios.get<IEstado[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?view=nivelado&orderBy=nome');

    //         const estados = estadosResponse.data;

    //         const estadosCidades: IEstadoCidades[] = [];

    //         for (const state of estados) {
    //             const stateAbbreviation = state['UF-sigla'];
    //             const citiesResponse = await axios.get<ICidade[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateAbbreviation}/municipios?view=nivelado&orderBy=nome`);
    //             const cities = citiesResponse.data;

    //             estadosCidades.push({
    //                 sg_estado: state['UF-sigla'],
    //                 cidades: cities.map(city => city['municipio-nome'])
    //             });
    //         }

    //         return estadosCidades;
    //     } catch (error) {
    //         console.error('Erro ao buscar estados e cidades:', error);
    //         return null;
    //     }
    // }

    // (async () => {
    //     try {
    //         const estadosCidades = await fetchStatesAndCities();
    //         if (estadosCidades) {
    //             setListaEstadosCidades(estadosCidades)
    //             // Faça o que quiser com os dados obtidos
    //         }
    //     } catch (error) {
    //         console.error('Erro ao buscar estados e cidades:', error);
    //     }
    // })();

    const handleChangeEstadoSelecionado = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEstado = event.target.value;
        const estado = listaEstadosCidades.find(estado => estado.sg_estado === selectedEstado)?.cidades || [];
        setListaCidades(estado);
    };

    const handleChangeCidadeSelecionada = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectCidade = event.target.value;
        setCidadeSelecionada(selectCidade);
    };

    const validateCampanha = (event: any, qtAlimentos: number) => {
        if (!event.target.nm_titulo_campanha.value) {
            alert("Título da campanha é obrigatório");
            return false;
        }

        if (!event.target.dt_encerramento_campanha.value) {
            alert("Data de encerramento da campanha é obrigatória");
            return false;
        }

        if (!event.target.sg_estado_campanha.value) {
            alert("Estado de entrega é obrigatório");
            return false;
        }

        if (!event.target.nm_cidade_campanha.value) {
            alert("Cidade de entrega é obrigatória");
            return false;
        }

        if (qtAlimentos < 1) {
            alert("Deve haver pelo menos um alimento cadastrado");
            return false;
        }

        if (qtAlimentos === 1) {
            if (!event.target.id.value || !event.target.qt_alimento_meta.value) {
                alert("Todos os campos de alimento devem ser preenchidos");
                return false;
            }
        } else {
            for (let i = 0; i < qtAlimentos; i++) {
                if (!event.target.id[i].value || !event.target.qt_alimento_meta[i].value) {
                    alert("Todos os campos de alimento devem ser preenchidos");
                    return false;
                }
            }
        }
    
        return true;
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const qtAlimentos = parseInt(event.target.qt_alimentos.value);

        if (!validateCampanha(event, qtAlimentos)) {
            return;
        }

        const infos_campanha = {
            usuario_id: user.user.id,
            nm_titulo_campanha: event.target.nm_titulo_campanha.value,
            dt_encerramento_campanha: event.target.dt_encerramento_campanha.value,
            nm_cidade_campanha: event.target.nm_cidade_campanha.value,
            sg_estado_campanha: event.target.sg_estado_campanha.value,
            ds_acao_campanha: event.target.ds_acao_campanha.value,
            cd_imagem_campanha: event.target.cd_imagem_campanha.value || "1.png",
            fg_campanha_ativa: new Date(event.target.dt_encerramento_campanha.value) > new Date()
        };
        let alimentos_campanha: { id: string; qt_alimento_meta: number }[] = [];
        if (qtAlimentos === 1) {
            alimentos_campanha.push({
              id: event.target.id.value,
              qt_alimento_meta: parseInt(event.target.qt_alimento_meta.value),
            });
          } else {
            alimentos_campanha = Array.from({ length: qtAlimentos }, (_, index) => ({
              id: event.target.id[index].value,
              qt_alimento_meta: parseInt(event.target.qt_alimento_meta[index].value),
            }));
          }

        const dbInsert = async () => {
            try {
                const response = await axios.post('/api/campanhas', {
                    infos_campanha,
                    alimentos_campanha
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
                    console.log ('Sucesso ao salvar dados no banco ', responseData);
                    navigate('/descobrir');
                }
            } catch (error) {
                console.error('Erro ao inserir dados:', error);
            }
        };

        handleDBInsert();
    };

    const addFood = () => {
        if (qtAlimentos <= 10) {
            setQtAlimentos(qtAlimentos + 1);
        }
    };

    const delFood = () => {
        if (qtAlimentos > 1) {
            setQtAlimentos(qtAlimentos - 1);
        }
    };

    return (
        <>
            <Navbar />
            <main className="lyt_forms pg_cadastro-campanha">
                <div className="form-container column">
                    <h1 className="titulo">Cadastrar campanha</h1>
                    <form className="form-login column" id="formCampanha" method="POST" onSubmit={handleSubmit}>
                        <h2 className="sub titulo">Dados iniciais</h2>
                        <div className="dados-iniciais row">
                            <div>
                                <label htmlFor="titId">Título</label>
                                <input className="input-form" type="text" name="nm_titulo_campanha" id="titId" maxLength={30} />
                            </div>
                            <div>
                                <label htmlFor="dtCampanha">Data de encerramento</label>
                                <input className="input-form" type="date" name="dt_encerramento_campanha" id="dtCampanha" />
                            </div>
                        </div>

                        <h2 className="sub titulo">Local de entrega do alimento</h2>
                        <div className="local-entrega row">
                            <div className="column">
                                <label htmlFor="estadoCampanha">Estado</label>
                                <select name="sg_estado_campanha" className="input-form" id="estadoCampanha" onChange={handleChangeEstadoSelecionado}>
                                    <option value="0" disabled>Selecione o Estado</option>
                                    {listaEstadosCidades.map(estado => (
                                        <option key={estado.sg_estado} value={estado.sg_estado}>
                                            {estado.sg_estado}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="column">
                                <label htmlFor="cidadeCampanha">Cidade</label>
                                <select name="nm_cidade_campanha" className="input-form" id="cidadeCampanha" onChange={handleChangeCidadeSelecionada}>
                                    <option value="0" disabled>Selecione a Cidade</option>
                                    {listaCidades.map(cidade => (
                                        <option key={cidade} value={cidade}>
                                            {cidade}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <h2 className="sub titulo">Alimentos</h2>
                        <div className="alimentos-container">
                            <div className="alimentos-wrapper column">
                                    {Array.from({ length: qtAlimentos }, (_, index) => (
                                    <Food key={index + 1} id={index + 1} delFood={delFood} />
                                ))}
                                </div>
                            <input type="text" hidden name="qt_alimentos" value={qtAlimentos} />

                            <button className="btn blue-light2 adicionar" type="button" onClick={addFood}>
                                Adicionar mais um alimento
                            </button>
                        </div>

                        <h2 className="sub titulo">Dados finais</h2>
                        <div className="texts column">
                            <div className="column">
                                <label htmlFor="descCampanha">Adicionar descrição da sua ação social</label>
                                <textarea id="descCampanha" className="input-form" name="ds_acao_campanha" cols={30} rows={10}
                                    placeholder="Insira a relevância por trás da sua campanha, descrevendo-a com detalhes. Exemplo: Irei montar cestas básicas para distribuir para a comunidade do morro nova cintra no dia 7 de julho, preciso muito da sua ajuda com os alimentos! Me ajude com o que você puder."></textarea>
                            </div>

                            <label htmlFor="imageCampanha">Adicionar imagem de capa</label>
                            <input className="input-form imageCampanha" type="file" accept="image/*" name="cd_imagem_campanha" />

                            <input className="btn blue-light2" type="submit" value="Cadastrar campanha" />
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};
