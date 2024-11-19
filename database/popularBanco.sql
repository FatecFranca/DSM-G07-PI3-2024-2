-- Criação da base de dados

create database nacao_nutrida;

use nacao_nutrida;


-- Tabela alimento

CREATE TABLE `alimento` (
  `cd_alimento` int NOT NULL AUTO_INCREMENT,
  `nm_alimento` varchar(90) NOT NULL,
  `sg_medida_alimento` varchar(10) NOT NULL,
  `nm_tipo_alimento` varchar(45) NOT NULL,
  `cd_tipo_alimento` int NOT NULL,
  PRIMARY KEY (`cd_alimento`)
)

INSERT INTO alimento (nm_alimento, sg_medida_alimento, nm_tipo_alimento, cd_tipo_alimento) 
VALUES
('Leite', 'L', 'Mais doados', 1),
('Leite em pó', 'KG', 'Mais doados', 1),
('Macarrão', 'KG', 'Mais doados', 1),
('Café', 'KG', 'Mais doados', 1),
('Açúcar', 'KG', 'Mais doados', 1),
('Óleo', 'L', 'Mais doados', 1),
('Ovos', 'DZ', 'Mais doados', 1),
('Azeite', 'L', 'Mais doados', 1),
('Sal', 'KG', 'Mais doados', 1),
('Farinha de trigo', 'KG', 'Mais doados', 1),
('Fubá', 'KG', 'Mais doados', 1),
('Carne Bovina', 'KG', 'Carnes', 2),
('Linguiça', 'KG', 'Carnes', 2),
('Carne de Porco', 'KG', 'Carnes', 2),
('Bisteca', 'KG', 'Carnes', 2),
('Mortadela', 'KG', 'Carnes', 2),
('Carne de Frango', 'KG', 'Carnes', 2),
('Carne de Peixe', 'KG', 'Carnes', 2),
('Alface', 'KG', 'Verduras e Legumes', 3),
('Tomate', 'KG', 'Verduras e Legumes', 3),
('Alho', 'KG', 'Verduras e Legumes', 3),
('Cebola', 'KG', 'Verduras e Legumes', 3),
('Batata', 'KG', 'Verduras e Legumes', 3),
('Cenoura', 'KG', 'Verduras e Legumes', 3),
('Pimentão', 'KG', 'Verduras e Legumes', 3),
('Abóbora', 'KG', 'Verduras e Legumes', 3),
('Aveia', 'KG', 'Verduras e Legumes', 3),
('Batata-doce', 'KG', 'Verduras e Legumes', 3),
('Beterraba', 'KG', 'Verduras e Legumes', 3),
('Brócolis', 'KG', 'Verduras e Legumes', 3),
('Cebolinha', 'KG', 'Verduras e Legumes', 3),
('Couve', 'KG', 'Verduras e Legumes', 3),
('Ervilha', 'KG', 'Verduras e Legumes', 3),
('Espinafre', 'KG', 'Verduras e Legumes', 3),
('Lentilha', 'KG', 'Verduras e Legumes', 3),
('Mandioca', 'KG', 'Verduras e Legumes', 3),
('Milho', 'KG', 'Verduras e Legumes', 3),
('Pepino', 'KG', 'Verduras e Legumes', 3),
('Rúcula', 'KG', 'Verduras e Legumes', 3),
('Repolho', 'KG', 'Verduras e Legumes', 3),
('Salsa', 'KG', 'Verduras e Legumes', 3),
('Laranja', 'KG', 'Frutas', 4),
('Mamão', 'KG', 'Frutas', 4),
('Maçã', 'KG', 'Frutas', 4),
('Melancia', 'KG', 'Frutas', 4),
('Limão', 'KG', 'Frutas', 4),
('Tangerina', 'KG', 'Frutas', 4),
('Manga', 'KG', 'Frutas', 4),
('Abacaxi', 'KG', 'Frutas', 4),
('Pêra', 'KG', 'Frutas', 4),
('Melão', 'KG', 'Frutas', 4),
('Banana', 'KG', 'Frutas', 4),
('Uva', 'KG', 'Frutas', 4),
('Maracujá', 'KG', 'Frutas', 4),
('Abacate', 'KG', 'Frutas', 4),
('Coco', 'KG', 'Frutas', 4),
('Caqui', 'KG', 'Frutas', 4),
('Ameixa', 'KG', 'Frutas', 4),
('Mexerica', 'KG', 'Frutas', 4),
('Pêssego', 'KG', 'Frutas', 4),
('Queijo', 'KG', 'Derivados do leite', 5),
('Margarina', 'KG', 'Derivados do leite', 5),
('Leite sem lactose', 'L', 'Derivados do leite', 5),
('Manteiga', 'KG', 'Derivados do leite', 5),
('Creme de leite', 'KG', 'Derivados do leite', 5),
('Requeijão', 'KG', 'Derivados do leite', 5),
('Iogurte', 'L', 'Derivados do leite', 5),
('Maionese', 'L', 'Derivados do leite', 5);


-- Tabela usuario

CREATE TABLE `usuario` (
  `cd_usuario` int NOT NULL AUTO_INCREMENT,
  `nm_usuario` varchar(45) NOT NULL,
  `ch_cpf_usuario` varchar(11) DEFAULT NULL,
  `ch_cnpj_usuario` varchar(14) DEFAULT NULL,
  `dt_nascimento_usuario` date DEFAULT NULL,
  `nr_celular_usuario` varchar(11) NOT NULL,
  `sg_estado_usuario` varchar(2) NOT NULL,
  `nm_cidade_usuario` varchar(80) NOT NULL,
  `cd_foto_usuario` varchar(200) DEFAULT 'default.png',
  `cd_senha_usuario` varchar(200) NOT NULL,
  `cd_email_usuario` varchar(75) NOT NULL,
  `fg_admin` tinyint NOT NULL DEFAULT '0',
  `qt_advertencias_usuario` int NOT NULL DEFAULT '0',
  `fg_usuario_deletado` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`cd_usuario`)
)

INSERT INTO usuario (nm_usuario, ch_cpf_usuario, ch_cnpj_usuario, dt_nascimento_usuario, nr_celular_usuario, sg_estado_usuario, nm_cidade_usuario, cd_foto_usuario, cd_senha_usuario, cd_email_usuario, fg_admin, qt_advertencias_usuario, fg_usuario_deletado) 
VALUES
('Yago Silva', '12345678901', NULL, '1990-05-15', '11987654321', 'SP', 'São Paulo', '1.png', '$2a$12$qYnfcan1eAudlxLP0mfxVeNk8Qnu8PHwhirai94t1F8ppGtG3eNw2', 'yago@email.com', 0, 0, 0),
('Maria Santos', '98765432109', NULL, '1985-12-10', '11901234567', 'RJ', 'Rio de Janeiro', '2.png', '$2a$12$qYnfcan1eAudlxLP0mfxVeNk8Qnu8PHwhirai94t1F8ppGtG3eNw2', 'maria@example.com', 0, 0, 0),
('Pedro Oliveira', '45678901234', NULL, '1978-08-20', '11955556666', 'MG', 'Belo Horizonte', '3.png', '$2a$12$qYnfcan1eAudlxLP0mfxVeNk8Qnu8PHwhirai94t1F8ppGtG3eNw2', 'pedro@example.com', 0, 0, 0),
('Empresa ABC Ltda', NULL, '12345678901234', NULL, '11999998888', 'SP', 'São Paulo', '4.png', '$2a$12$qYnfcan1eAudlxLP0mfxVeNk8Qnu8PHwhirai94t1F8ppGtG3eNw2', 'empresa@example.com', 0, 0, 0),
('Comércio XYZ Ltda', NULL, '98765432109876', NULL, '11888887777', 'RJ', 'Rio de Janeiro', 'default.png', '$2a$12$qYnfcan1eAudlxLP0mfxVeNk8Qnu8PHwhirai94t1F8ppGtG3eNw2', 'comercio@example.com', 0, 0, 0);


-- Tabela campanha

CREATE TABLE `campanha` (
  `cd_campanha` int NOT NULL AUTO_INCREMENT,
  `cd_usuario_campanha` int DEFAULT NULL,
  `nm_titulo_campanha` varchar(45) NOT NULL,
  `dt_encerramento_campanha` datetime NOT NULL,
  `ts_criacao_campanha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `nm_cidade_campanha` varchar(45) NOT NULL,
  `sg_estado_campanha` varchar(2) NOT NULL,
  `ds_acao_campanha` text NOT NULL,
  `cd_imagem_campanha` varchar(255) NOT NULL DEFAULT 'default.png',
  `fg_campanha_deletada` tinyint DEFAULT '0',
  PRIMARY KEY (`cd_campanha`),
  KEY `fk_campanha_usuario` (`cd_usuario_campanha`),
  CONSTRAINT `fk_campanha_usuario` FOREIGN KEY (`cd_usuario_campanha`) REFERENCES `usuario` (`cd_usuario`) ON DELETE SET NULL
)

INSERT INTO campanha 
(cd_usuario_campanha, nm_titulo_campanha, dt_encerramento_campanha, ts_criacao_campanha, nm_cidade_campanha, sg_estado_campanha, ds_acao_campanha, cd_imagem_campanha, fg_campanha_deletada) 
VALUES
(1, 'Campanha da Solidariedade', '2024-10-10 00:00:00', '2024-03-15 19:59:04', 'São Paulo', 'SP', 'Esta campanha visa arrecadar alimentos para famílias em situação de vulnerabilidade social. Junte-se a nós e faça a diferença na vida de quem mais precisa.', '1.png', 0),
(2, 'Ajude a Alimentar Famílias', '2024-08-15 00:00:00', '2024-03-15 19:59:04', 'Rio de Janeiro', 'RJ', 'Nossa missão é garantir que ninguém passe fome. Com sua doação, podemos proporcionar refeições nutritivas e esperança para aqueles que enfrentam dificuldades.', '2.png', 0),
(5, 'Unidos Pela Nutrição', '2024-07-20 00:00:00', '2024-03-15 19:59:04', 'Belo Horizonte', 'MG', 'A pandemia afetou muitas pessoas, e agora mais do que nunca, é importante estender a mão para ajudar. Participe desta campanha e faça parte da mudança positiva.', '3.png', 0),
(1, 'Doação de Alimentos Essenciais', '2024-06-25 00:00:00', '2024-03-15 19:59:04', 'Franca', 'SP', 'Juntos podemos fazer a diferença! Com sua contribuição, podemos distribuir cestas básicas para comunidades carentes, proporcionando alívio imediato e esperança para o futuro.', '4.png', 0),
(2, 'Compaixão em Ação', '2024-06-30 00:00:00', '2024-03-15 19:59:04', 'Franca', 'SP', 'A fome não espera. É por isso que estamos mobilizando recursos e voluntários para garantir que todos tenham acesso a alimentos nutritivos. Faça parte desta iniciativa transformadora.', '5.png', 0),
(5, 'Alimentando o Futuro', '2025-04-05 00:00:00', '2024-03-15 19:59:04', 'Franca', 'SP', 'Cada doação conta! Ao participar desta campanha, você está ajudando a garantir que as crianças tenham comida na mesa e a construir um futuro mais brilhante para elas.', '6.png', 0),
(1, 'Juntos Contra a Fome', '2025-04-10 00:00:00', '2024-03-15 19:59:04', 'Franca', 'SP', 'Nossa comunidade está unida na luta contra a fome. Junte-se a nós e faça sua parte para garantir que todos tenham acesso a alimentos adequados e saudáveis.', '7.png', 0),
(2, 'Cesta Básica de Esperança', '2025-04-15 00:00:00', '2024-03-15 19:59:04', 'Franca', 'SP', 'Esta campanha busca fornecer cestas básicas para famílias em situação de extrema pobreza. Sua generosidade pode fazer toda a diferença na vida de alguém.', '1.png', 0),
(5, 'Cuidando dos Nossos Vizinhos', '2025-04-20 00:00:00', '2024-03-15 19:59:04', 'São Paulo', 'SP', 'Cada gesto de solidariedade conta. Ao participar desta campanha, você está ajudando a construir uma comunidade mais forte e resiliente.', '2.png', 0);



-- Tabela alimento_campanha

CREATE TABLE `alimento_campanha` (
  `cd_alimento_campanha` int NOT NULL AUTO_INCREMENT,
  `cd_alimento` int NOT NULL,
  `cd_campanha` int NOT NULL,
  `qt_alimento_meta` int NOT NULL,
  PRIMARY KEY (`cd_alimento_campanha`),
  KEY `fk_campanha_alimento_meta` (`cd_campanha`),
  KEY `fk_alimento_meta` (`cd_alimento`),
  CONSTRAINT `fk_alimento_meta` FOREIGN KEY (`cd_alimento`) REFERENCES `alimento` (`cd_alimento`),
  CONSTRAINT `fk_campanha_alimento_meta` FOREIGN KEY (`cd_campanha`) REFERENCES `campanha` (`cd_campanha`)
)

INSERT INTO alimento_campanha (cd_alimento, cd_campanha, qt_alimento_meta) 
VALUES
(1, 1, 100),
(2, 1, 50),
(3, 1, 200),
(4, 2, 150),
(5, 2, 80),
(6, 2, 120),
(7, 3, 120),
(8, 3, 90),
(9, 3, 180),
(10, 4, 100),
(11, 4, 50),
(12, 4, 200),
(4, 5, 150),
(5, 5, 80),
(6, 5, 120);


-- Tabela alimento_doacao

CREATE TABLE `alimento_doacao` (
  `cd_alimento_doacao` int NOT NULL AUTO_INCREMENT,
  `cd_usuario` int NOT NULL,
  `cd_alimento` int NOT NULL,
  `cd_campanha` int NOT NULL,
  `qt_alimento_doado` int NOT NULL,
  PRIMARY KEY (`cd_alimento_doacao`),
  KEY `fk_campanha_alimento_doado` (`cd_campanha`),
  KEY `fk_usuario_alimento_doado` (`cd_usuario`),
  KEY `fk_alimento_doado` (`cd_alimento`),
  CONSTRAINT `fk_alimento_doado` FOREIGN KEY (`cd_alimento`) REFERENCES `alimento` (`cd_alimento`),
  CONSTRAINT `fk_campanha_alimento_doado` FOREIGN KEY (`cd_campanha`) REFERENCES `campanha` (`cd_campanha`),
  CONSTRAINT `fk_usuario_alimento_doado` FOREIGN KEY (`cd_usuario`) REFERENCES `usuario` (`cd_usuario`)
)

INSERT INTO alimento_doacao (cd_usuario, cd_alimento, cd_campanha, qt_alimento_doado) 
VALUES
(4, 1, 1, 100),
(4, 2, 1, 50),
(4, 3, 1, 200),
(4, 4, 2, 20),
(4, 5, 2, 200),
(4, 6, 2, 15),
(4, 7, 3, 15),
(4, 8, 3, 15),
(4, 9, 3, 20),
(4, 10, 4, 20),
(4, 11, 4, 200),
(4, 12, 4, 20),
(4, 4, 5, 60),
(4, 5, 5, 20),
(4, 6, 5, 20);


