import React from 'react';

import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/Navbar'
import { Link } from 'react-router-dom';

interface ProcessoProps {
    src: string;
    alt: string;
    titulo: string;
    descricao: string;
}

const Processo: React.FC<ProcessoProps> = ({ src, alt, titulo, descricao }) => (
    <div className="processo column">
        <img className="svg-processo" src={src} alt={alt} />
        <h2 className="titulo-descricao">{titulo}</h2>
    </div>
);

export const Home: React.FC = () => {
    return (
        <>
            <title>Página inicial</title>
            <Navbar />
            <main className="pg_index">
                <section className="section arrecade">
                    <div className="wrapper arrecade">
                        <div className="wrapper-cta">
                            <div className="column">
                                <h1 className="titulo black">
                                    Arrecade alimentos para sua campanha
                                </h1>
                                <h2 className="sub titulo black">
                                    Alcance mais pessoas e transforme mais vidas
                                </h2>
                            </div>
                            <div className="buttons row">
                                <Link to="/campanhas/criar">
                                    <button className="btn yellow" type="button">
                                        Cadastrar Campanha
                                    </button>
                                </Link>
                                <Link to="/descobrir">
                                    <button className="btn blue-light2" type="button">
                                        Fazer Doação
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="wrapper-svg">
                            <img src="/assets/img/illustrate-person.svg" alt="Ilustração" />
                        </div>
                    </div>
                </section>

                <section className="section processos acoes">
                    <div className="wrapper acoes column">
                        <h1 className="titulo white">Para campanhas</h1>
                        <div className="wrapper-processos row">
                            <Processo
                                src="/assets/img/icone_caixa_alimentos.svg"
                                alt="Icone de uma caixa com alimentos"
                                titulo="Criar uma campanha para sua ação social"
                                descricao="Criar uma campanha para sua ação social"
                            />
                            <Processo
                                src="/assets/img/icone_loading.svg"
                                alt="Icone de carregando"
                                titulo="Aguardar as solicitações de doação"
                                descricao="Aguardar as solicitações de doação"
                            />
                            <Processo
                                src="/assets/img/icone_chat.svg"
                                alt="Icone de chat"
                                titulo="Combinar a entrega por meio do chat"
                                descricao="Combinar a entrega por meio do chat"
                            />
                            <Processo
                                src="/assets/img/icone_caixa_coracoes.svg"
                                alt="Icone de uma caixa com corações"
                                titulo="Receber os alimentos e ser feliz"
                                descricao="Receber os alimentos e ser feliz"
                            />
                        </div>
                    </div>
                </section>

                <section className="section processos doadores">
                    <div className="wrapper doadores column">
                        <h1 className="titulo white">Para doadores</h1>
                        <div className="wrapper-processos row">
                            <Processo
                                src="/assets/img/icone_lupa_pin.svg"
                                alt="Icone de lupa"
                                titulo="Procurar campanhas de combate à fome"
                                descricao="Procurar campanhas de combate à fome"
                            />
                            <Processo
                                src="/assets/img/icone_like.svg"
                                alt="Icone de like"
                                titulo="Enviar uma solicitação de ajuda e esperar"
                                descricao="Enviar uma solicitação de ajuda e esperar"
                            />
                            <Processo
                                src="/assets/img/icone_chat.svg"
                                alt="Icone de chat"
                                titulo="Combinar a entrega por meio do chat"
                                descricao="Combinar a entrega por meio do chat"
                            />
                            <Processo
                                src="/assets/img/icone_caixa_coracoes.svg"
                                alt="Icone de uma caixa com corações"
                                titulo="Entregar os alimentos e ser feliz"
                                descricao="Entregar os alimentos e ser feliz"
                            />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};
