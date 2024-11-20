import { useEffect, useState } from 'react';
import axios from 'axios';
import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/Navbar'

import { Link } from 'react-router-dom';
import { ICampanhaAlimento } from '../../types/ICampanha';
import { IEstadoCidades } from '../../types/IEstadoCidade';


export const Descobrir = () => {
  const [campanhas, setCampanhas] = useState<ICampanhaAlimento[]>([])
  const [qtAlimentos, setQtAlimentos] = useState<number>(1)
  const [listaEstadosCidades, setListaEstadosCidades] = useState<IEstadoCidades[]>([])
  const [listaCidades, setListaCidades] = useState<string[]>([])
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>('')

  useEffect(() => {
    axios.get<IEstadoCidades[]>('/api/estadosCidades').then((response) => {
      setListaEstadosCidades(response.data)
    }).catch((err) => {
      console.log('Error: ' + err)
    })
  }, [])

  useEffect(() => {
    if (listaEstadosCidades.length > 0) {
      const cidades = listaEstadosCidades[0]!.cidades;
      setListaCidades(cidades);
    }
  }, [listaEstadosCidades]);

  useEffect(() => {
    if (listaCidades.length > 0) {
      const cidade = listaCidades[0]!;
      setCidadeSelecionada(cidade);
    }
  }, [listaEstadosCidades]);

  const handleChangeEstadoSelecionado = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEstado = event.target.value;
    const estado = listaEstadosCidades.find(estado => estado.sg_estado === selectedEstado)!.cidades;
    setListaCidades(estado);
  };

  const handleChangeCidadeSelecionada = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectCidade = event.target.value;
    const cidade = listaCidades.find(cidade => cidade === selectCidade)!;
    setCidadeSelecionada(cidade);
  };

  useEffect(() => {
    axios.get('/api/campanhas').then((response) => {
      setCampanhas(response.data)
    }).catch((err) => {
      console.log('Error: ' + err)
    })
  }, [])


  function contarProgresso(qt_doacoes_campanha: number, qt_total_campanha: number) {
    let percentage = Math.floor((qt_doacoes_campanha * 100) / qt_total_campanha) || 0

    if (percentage > 100) {
      return `100%`
    } else {
      return `${percentage}%`
    }
  }

  function contarTempoRestante(anos: number, meses: number, dias: number, horas: number, minutos: number) {
    if (anos > 0) {
      return `Expira em: ${anos} anos`
    } else if (meses > 0) {
      return `Expira em: ${meses} meses`
    } else if (dias > 0) {
      return `Expira em: ${dias} dias`
    } else if (horas > 0) {
      return `Expira em: ${horas} horas`
    } else if (minutos > 0) {
      return `Expira em: ${minutos} minutos`
    } else {
      return 'Campanha encerrada'
    }
  }

  return (
    campanhas &&
    <>
      <Navbar />
      <main className="pg_descobrir">

        <div className="background">
          <form className="filtro-campanhas column" action="/descobrir/" method="GET">
            <h1 className="titulo white">Insira o estado e a cidade</h1>
            <h2 className="sub titulo white">Encontre campanhas de combate à fome perto de você</h2>
            <div className="row">
              <select name="estado" className="input-form" id="estadoCampanha">
                <option value="0">Selecione o Estado</option>
              </select>
              <input type="hidden" name="state" />
              <select name="cidade" className="input-form" id="cidadeCampanha">
                <option value="0">Seleciona a Cidade</option>
              </select>
              <button className="btn yellow" type="submit">
                Procurar
              </button>
            </div>
          </form>
        </div>

        <div className="campanhas-container column">
          <h1 className="titulo black">Campanhas mais recentes</h1>
          <div className="campanhas row">
            {campanhas.map((campanha) => (
              <Link key={campanha.id} className="campanha-link" to={`/campanhas/${campanha.id}`}>
                <div className="campanha">
                  <div className="imagem-campanha">
                    <img src={`/assets/campanhas/${campanha.cd_imagem_campanha}`} alt="" />
                  </div>

                  <div className="informacoes-campanha column">
                    <div className="descricao-campanha">
                      <h1 className="titulo ped">{campanha.nm_titulo_campanha}</h1>

                      <div className="titulo-wrapper row">
                        <h1 className="sub titulo row master">
                          Alimentos:
                          <h2 className="sub titulo row titulo-link">
                            {campanha.alimentos.map((alimento, index) => (
                              <span key={index}>{alimento.nm_alimento} - </span>
                            ))}
                          </h2>
                        </h1>
                      </div>
                    </div>

                    <div className="progresso-container column">
                      <div className="porcentagem">
                        <div className="progresso-barra">
                          <div style={{ width: contarProgresso(campanha.qt_doacoes_campanha, campanha.qt_total_campanha) }} className={`progresso-atual progresso-atual-${campanha.id}`}></div>
                        </div>
                      </div>
                      <div className="arrecadado">
                        <p>
                          <span className={`arrecadado-${campanha.id}`}>{contarProgresso(campanha.qt_doacoes_campanha, campanha.qt_total_campanha)}</span> arrecadado
                        </p>
                      </div>
                    </div>

                    <div className="rodape-campanha">
                      <div className="row">
                        <div className="usuario row">
                          <div className="img-wrapper">
                            <img src={`/assets/profile/${campanha.cd_foto_usuario}`} alt="Foto do usuário" />
                          </div>
                          <div className="column">
                            <h2 className="nomeUsuario">{campanha.nm_usuario}</h2>
                            <p className="titulo-gray cidadeEstado">
                              {campanha.nm_cidade_campanha}, {campanha.sg_estado_campanha}
                            </p>
                          </div>
                        </div>

                        <div className="column">
                          <div>
                            <img className="svg-campanha" src="/assets/img/icone_relogio.svg" alt="Icone relógio" />
                            <p className="expiraEm">{contarTempoRestante(campanha.anos_restantes, campanha.meses_restantes, campanha.dias_restantes, campanha.horas_restantes, campanha.minutos_restantes)}</p>
                          </div>

                          <div>
                            <img className="svg-campanha" src="/assets/img/icone_pin.svg" alt="Icone pin" />
                            <p className="cidadeEstado">
                              {campanha.nm_cidade_campanha}, {campanha.sg_estado_campanha}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="numeracao-paginas">
          <ul className="paginas">
            <Link key="1" to={`/descobrir`}>
              <li className="num cont-pagina">1</li>
            </Link>
          </ul>
          <Link to="#">
            <div className="cont-pagina">Seguinte &#62;</div>
          </Link>
        </div>
      </main>

      <Footer></Footer>
    </>

  );
};