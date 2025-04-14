import React, { useState, useEffect } from "react";
import {
  getClassificados,
  getClassificadosPorTag,
  getClassificadosPorTermo,
  criarClassificado,
} from "./api/classificados.js";
import { getTags } from "./api/tags.js";
import {
  Card,
  InputFilter,
  InputModal,
  Modal,
  Button,
  InputDropDown,
} from "./components/components.jsx";

import "./homePage.css";

export default function HomePage() {
  //Variaveis para os endpoints
  const [classificados, setClassificados] = useState([]);
  const [tagsDisponiveis, setTagsDisponiveis] = useState([]);
  const [filtroTag, setFiltroTag] = useState("");
  const [filtroTermo, setFiltroTermo] = useState("");

  //Variaveis para os modais
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState({});

  // Carregar classificados e tags ao iniciar
  useEffect(() => {
    carregarClassificados();
    carregarTags();
  }, []);

  //Função para abrir o modal quando Card for clicado
  const handleCardClick = (cardData) => {
    setSelectedCardData(cardData);
    setModalVisible(true);
  };

  //Puxar classificados do banco sem filtro
  const carregarClassificados = async () => {
    try {
      const dados = await getClassificados();
      setClassificados(dados);
      // console.log("Tipo de dados:", typeof dados);
      // console.log("Verificar se é array: ", Array.isArray(dados));
      // console.log("Conteúdo:", dados);
    } catch (error) {
      console.error("Erro ao carregar classificados:", error);
    }
  };

  //Carregar tags do banco para os inputs
  const carregarTags = async () => {
    try {
      const tags = await getTags();
      setTagsDisponiveis(tags);
    } catch (error) {
      console.error("Erro ao carregar tags:", error);
    }
  };

  //Carregar filtro por termos(palavra chave)
  const buscarPorTermo = async (termo) => {
    if (!termo) {
      carregarClassificados();
      return;
    }
    try {
      const dados = await getClassificadosPorTermo(termo);
      setClassificados(dados);
    } catch (error) {
      console.error("Erro ao buscar por termo:", error);
    }
  };

  //Carregar filtro por tags
  const buscarPorTag = async (tag) => {
    if (!tag) {
      carregarClassificados();
      return;
    }
    try {
      const dados = await getClassificadosPorTag(tag);
      setClassificados(dados);
    } catch (error) {
      console.error("Erro ao buscar por tag:", error);
    }
  };

  //Função para realizar um Post de um novo classificado
  const handleCreateClassificado = async (classificado) => {
    try {
      await criarClassificado(classificado);
      carregarClassificados();
    } catch (error) {
      console.error("Erro ao criar classificado:", error);
    }
  };

  return (
    <div>
      <h1>Classificados</h1>
      <div className="header">
        <Button onClick={() => setShowModal(true)}>Novo Classificado</Button>

        <InputDropDown
          options={tagsDisponiveis}
          placeholder="Escolha um filtro"
          onChange={(e) => {
            const valor = e.target.value;
            setFiltroTag(valor);
            buscarPorTag(valor);
          }}
        />

        <InputFilter
          placeholder="Filtrar por palavra-chave"
          onChange={(e) => {
            const valor = e.target.value;
            setFiltroTermo(valor);
            buscarPorTermo(valor);
          }}
        />
      </div>

      <div className="cards-container">
        {classificados.map((c) => (
          <Card
            key={c.id}
            title={c.titulo}
            legend={c.descricao}
            onClick={() =>
              handleCardClick({
                title: c.titulo,
                legend: c.descricao,
                tags: c.tags.map((tag) => tag.nome),
              })
            }
          />
        ))}
      </div>
      <h2>Total de classificados: {classificados.length}</h2>

      <Modal
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        title={selectedCardData.title}
        date={selectedCardData.date}
        legend={selectedCardData.legend}
        tags={selectedCardData.tags}
      />

      <InputModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleCreateClassificado}
        tags={tagsDisponiveis}
      />
    </div>
  );
}
