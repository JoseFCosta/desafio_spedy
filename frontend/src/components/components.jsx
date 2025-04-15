import React from "react";
import { useState, useEffect } from "react";
import "./components.css";
import "../App.css";

export const Button = ({ children, onClick, type = "button" }) => {
  return (
    <button className="Button" onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export const InputFilter = ({ placeholder, onChange }) => {
  return (
    <input
      className="Input-Filter"
      type="text"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export const InputDropDown = ({ options, placeholder, onChange }) => {
  return (
    <select className="Input-DropDown" onChange={onChange} defaultValue="">
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export const Modal = ({ show, onClose, title, date, legend, tags = [] }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-close" onClick={onClose}>
          X
        </div>
        <div className="modal-title">{title}</div>
        <div className="modal-date">{formatarData(date)}</div>
        <div className="modal-legend">{legend}</div>

        <div className="modal-tags">
          <div className="boxes-container">
            {["box1", "box2", "box3"].map((_, index) => (
              <div
                key={index}
                className={`tag-box ${tags[index] ? "preenchido" : ""}`}
              >
                {tags[index] || "Vazio"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const InputModal = ({
  show,
  onClose,
  onConfirm,
  title,
  date,
  legend,
  tags,
  teste,
}) => {
  if (!show) return null;

  const [inputTitle, setInputTitle] = useState(title || "");
  const [inputDate, setInputDate] = useState(date || "");
  const [inputLegend, setInputLegend] = useState(legend || "");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    setInputDate(formattedDate);
  }, []);

  const handleConfirm = () => {
    onConfirm({
      title: inputTitle,
      date: inputDate,
      legend: inputLegend,
      tags: selectedTags,
    });
    onClose();
  };

  // Função para adicionar tags
  const handleTagSelect = (event) => {
    const tag = event.target.value;
    if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Função para remover tags
  const handleRemoveTag = (index) => {
    const updatedTags = selectedTags.filter((_, i) => i !== index);
    setSelectedTags(updatedTags);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-input">
        <div className="modal-close" onClick={onClose}>
          X
        </div>
        <input
          className="modal-title-input"
          type="text"
          value={inputTitle}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 60) {
              setInputTitle(e.target.value);
            }
          }}
          placeholder="Titulo"
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Input Date */}
      
        <input
          className="modal-date-input"
          type="date"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
          readOnly
          disabled
        />
        
        <div className={`contador ${inputTitle.length >= 60 ? "limit" : ""}`}>
          {inputTitle.length}/60
        </div>
        </div>
        {/* Textarea Legend */}
        <textarea
          className="modal-legend-input"
          value={inputLegend}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 300) {
              setInputLegend(e.target.value);
            }
          }}
          placeholder="Escreva aqui sua descrição!"
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          *Para retirar uma tag basta clicar nela
          <div
            className={`contador ${inputLegend.length >= 300 ? "limit" : ""}`}
          >
            {inputLegend.length}/300
          </div>
        </div>
        <div className="tag-form">
          <div className="dropdown-container">
            {selectedTags.length === 3 ? (
              <button className="confirm-btn" onClick={handleConfirm}>
                Confirmar
              </button>
            ) : (
              <select onChange={handleTagSelect} defaultValue="">
                <option value="" disabled>
                  Selecione uma tag
                </option>
                {tags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="boxes-container">
            {["box1", "box2", "box3"].map((_, index) => (
              <div
                key={index}
                className={`tag-box ${selectedTags[index] ? "preenchido" : ""}`}
                onMouseEnter={(e) => e.target.classList.add("hover")}
                onMouseLeave={(e) => e.target.classList.remove("hover")}
                onClick={() => selectedTags[index] && handleRemoveTag(index)}
              >
                {selectedTags[index] || "Vazio"}
              </div>
            ))}
            <div
              className={`contador ${selectedTags.length >= 3 ? "limit" : ""} `}
            >
              {selectedTags.length}/3
            </div>
          </div>
          {selectedTags.length < 3 && selectedTags.length > 0 && (
            <button className="confirm-btn" onClick={handleConfirm}>
              Confirmar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const Card = ({ title, date, legend, onClick }) => {
  return (
    <div className="card-wrapper">
    <div className="card" onClick={onClick}>
      <div className="card-title">{title}</div>
      <div className="card-date">{formatarData(date)}</div>
      <div className="card-legend">{legend}</div>
    </div>
    </div>
  );
};

export const TagForm = ({ tags }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  // Função para adicionar tags
  const handleTagSelect = (event) => {
    const tag = event.target.value;
    if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Função para remover tags
  const handleRemoveTag = (index) => {
    const updatedTags = selectedTags.filter((_, i) => i !== index);
    setSelectedTags(updatedTags);
  };

  const handleConfirm = () => {
    console.log({ tags: selectedTags });
    return selectedTags;
  };

  return (
    <div className="tag-form">
      <div className="dropdown-container">
        {selectedTags.length === 3 ? (
          <button className="confirm-btn" onClick={handleConfirm}>
            Confirmar
          </button>
        ) : (
          <select onChange={handleTagSelect} defaultValue="">
            <option value="" disabled>
              Selecione uma tag
            </option>
            {tags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="boxes-container">
        {["box1", "box2", "box3"].map((_, index) => (
          <div
            key={index}
            className={`tag-box ${selectedTags[index] ? "preenchido" : ""}`}
            onMouseEnter={(e) => e.target.classList.add("hover")}
            onMouseLeave={(e) => e.target.classList.remove("hover")}
            onClick={() => selectedTags[index] && handleRemoveTag(index)}
          >
            {selectedTags[index] || "Vazio"}
          </div>
        ))}
      </div>
    </div>
  );
};

//Funções uteis

function formatarData(dataISO) {
  const data = new Date(dataISO);
  const dataFormatada = data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
}
