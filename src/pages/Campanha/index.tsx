import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/Navbar'

import axios from 'axios'

import { ICampanhaAlimento } from '../../types/ICampanha';
import { UserContext } from '../../contexts/userContext';


export const Campanha = () => {
  const navigate = useNavigate()
  const [campanha, setCampanha] = useState<ICampanhaAlimento | null>(null);
  const user = useContext(UserContext)

  const { _id } = useParams();
  const url = `/api/campanhas/${_id}`;

  useEffect(() => {
    if(_id){
    axios.get<ICampanhaAlimento>(url).then((response) => {

      let campanhaData = response.data;
      campanhaData.alimentos = Array.isArray(campanhaData.alimentos) ? campanhaData.alimentos : [campanhaData.alimentos];
      console.log("campanhaData: ", campanhaData)
      setCampanha(campanhaData)
    }).catch((err) => {
      console.log('Error: ' + err)
    })
  }}, [_id])

  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(!modalVisible);
  };


  const replaceSpace = (str: string) => {
    return str.replace(/\s+/g, '');
  };

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

  function handleSubmit(event: any) {
    event.preventDefault();
    if (user.user.id === "") {
      alert("Por favor, faça login");
      return
    }
    let infos_doacao = {
      usuario_doacao: user.user.id,
      cd_campanha_doacao: _id,
    }
  
    console.log("infos_doacao: ", infos_doacao)

    let lengthAlimentos = campanha?.alimentos?.length || 0;

    let alimentos_doacao = Array.isArray(campanha?.alimentos) 
      ? Array.from({ length: lengthAlimentos }, (_, index) => {
        const alimento_id = event.target._id[index]?.value || event.target._id.value;
        const qt_alimento_doacao = parseInt(event.target.qt_alimento_doacao[index]?.value || event.target.qt_alimento_doacao.value);

      if (qt_alimento_doacao > 0) {
        return { alimento_id, qt_alimento_doacao };
      }
      return null;
      }).filter(item => item !== null)
      : [];

      if (!alimentos_doacao || (Array.isArray(alimentos_doacao) && alimentos_doacao.length === 0)) {
        alert("Doação vazia.");
        return;
      }



    const dbInsert = async () => {
      try {
        const response = await axios.post('/api/doacoes', {
          infos_doacao: infos_doacao,
          alimentos_doacao: alimentos_doacao
        });
        return [response.status, response.data];
      } catch (error) {
        console.error('Erro:', error);
        throw error;
      }
    }

    const handleDBInsert = async () => {
      try {
        const [responseStatus, responseData] = await dbInsert();
        if (responseStatus != 200) {
          console.log('Erro ao salvar dados no banco')
        } else {
          console.log('Sucesso ao salvar dados no banco ', responseData)
          window.location.reload();
        }
      } catch (error) {
        console.error('Erro ao inserir dados:', error);
      }
    }

    handleDBInsert();
  }


  return (
    campanha && campanha && campanha.alimentos &&
    <>
      <Navbar />

      <div className={`lyt_denuncia pg_contribuir campanha ${modalVisible ? 'visible' : ''}`}>
        <div className="form-container campanha column">
          <div className="closeWrapper">
            <img className="closeModal" src="/assets/img/icone_times_black.svg" alt="" onClick={handleCloseModal} />
          </div>
          <p className="sub titulo">Informe a quantidade da doação:</p>
          <form className="form-login column" method="POST" onSubmit={handleSubmit}>
            <div className="alimento column">
              <div className="desc row">
                <label>Alimento</label>
                <label>Quantidade</label>
              </div>
              <div className="qtdAlimentos">
                {campanha.alimentos.map((alimento, index) => (
                  <div key={index} className="row">
                    <div className="alimento-campanha">
                      <input
                        className="input-form nmAl"
                        type="text"
                        name={`nm_alimento`}
                        value={alimento.nm_alimento}
                        readOnly
                      />
                    </div>
                    <div className="alimento-quantidade">
                      <div className="qtdAl">
                        <input className="input-form" type="number" name={`qt_alimento_doacao`} min="0" />
                        <input type="hidden" name={`_id`} value={alimento.alimento_id} />
                        <h1 className="sub titulo">{alimento.sg_medida_alimento}</h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="comentario column">
              <label>Adicione um comentário (opcional)</label>
              <textarea className="input-form" name="descricao"></textarea>
            </div>
            <input className="btn blue" type="submit" value="Enviar" />
          </form>
        </div>
      </div>

      <main className="pg_campanha">
        <div className="container-campanha column">
          <div key={campanha.nm_titulo_campanha}>
            <h1 className="titulo black">{campanha.nm_titulo_campanha}</h1>
            <div className="subcontainer-campanha row">
              <div className="container-descricao">
                <div className="container-img">
                  <img src={`/assets/campanhas/${campanha.cd_imagem_campanha}`} alt="" />
                </div>
                <div className="descricao">
                  <h1 className="sub titulo black">Descrição</h1>
                  <p>{campanha.ds_acao_campanha}</p>
                  <div className="denunciar">
                    <Link className="row" to={`#`}>
                      <img src="/assets/img/icone_denounce_black.svg" alt="Denunciar" />
                      <span>Denunciar campanha</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="container-alimentos column">
                <header className="header-alimentos row">
                  <div className="usuario row">
                    <div className="img-wrapper">
                      <img src={`/assets/profile/${campanha.cd_foto_usuario}`} alt="Foto do usuário" />
                    </div>
                    <div>
                      <h2>{campanha.nm_usuario}</h2>
                      <p className="titulo-gray cidadeEstado">{`${campanha.nm_cidade_campanha}, ${campanha.sg_estado_campanha}`}</p>
                    </div>
                  </div>
                  <div className="header-campanha">
                    <div>
                      <img src="/assets/img/icone_pin.svg" alt="Icone pin" />
                      <p className="cidadeEstado">{`${campanha.nm_cidade_campanha}, ${campanha.sg_estado_campanha}`}</p>
                    </div>
                    <div>
                      <img src="/assets/img/icone_relogio.svg" alt="Icone relógio" />
                      <p>{contarTempoRestante(campanha.anos_restantes, campanha.meses_restantes, campanha.dias_restantes, campanha.horas_restantes, campanha.minutos_restantes)}</p>
                    </div>
                  </div>
                </header>
                <div className="main-alimentos column">
                  <h2 className="titulo black">Alimentos:</h2>
                  <div className="alimento-container column">
                    {campanha.alimentos.map((alimento) => (
                      <div key={alimento.nm_alimento} className="alimento column">
                        <h2 className="sub titulo">{alimento.nm_alimento}</h2>
                        <div className="progresso-container row">
                          <div className="arrecadado">
                            <p><span className={`arrecadado-${replaceSpace(alimento.nm_alimento)}`}>{contarProgresso(alimento.qt_alimento_doado, alimento.qt_alimento_meta)}</span></p>
                          </div>
                          <div className="porcentagem">
                            <div className="progresso-barra">
                              <div style={{ width: contarProgresso(alimento.qt_alimento_doado, alimento.qt_alimento_meta) }} className={`progresso-atual progresso-atual-${replaceSpace(alimento.nm_alimento)}`}></div>
                            </div>
                          </div>
                        </div>
                        <div className="meta row">
                          <p>{`Arrecadado: ${alimento.qt_alimento_doado} ${alimento.sg_medida_alimento}`}</p>
                          <p>{`Meta: ${alimento.qt_alimento_meta} ${alimento.sg_medida_alimento}`}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn blue-light2 openModal" onClick={handleCloseModal}>Doar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </>

  );
};
