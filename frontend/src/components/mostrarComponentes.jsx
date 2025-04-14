import React, { useState } from "react";
import {
  Button,
  InputDropDown,
  InputFilter,
  Modal,
  InputModal,
  Card,
  TagForm,
} from "./components.jsx";

export default function MostrarComponentes() {
  const [selectedValue, setSelectedValue] = useState("");

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [showInputModal, setShowInputModal] = useState(false);

  const toggleInputModal = () => {
    setShowInputModal(!showInputModal);
  };

  const tags = ["React", "JavaScript", "CSS", "HTML", "Node", "Python"];

  const static_tags = ["React", "JavaScript", "CSS"];

  const title = "Este é um exemplo de titulo";

  const date = "21 de janeiro";

  const legend_300 = `A vida é feita de momentos, alguns breves e silenciosos, outros intensos e marcantes. Cada instante traz consigo a possibilidade de mudança, aprendizado e crescimento. Às vezes, seguimos em linha reta, confiantes no caminho escolhido. Em outras, nos vemos em encruzilhadas, tentando entender qual direção tomar. O importante é não parar, mesmo quando o medo aparece ou a dúvida nos alcança. Afinal, é caminhando que descobrimos nossas forças, testamos nossos limites e construímos nossa história.

  As pessoas que encontramos também deixam marcas. Algumas permanecem, oferecendo apoio e carinho, enquanto outras passam apenas por um capítulo. Mesmo assim, todas têm um papel no nosso enredo. A gratidão por cada experiência, boa ou ruim, nos ajuda a evoluir.
  
  A vida não é perfeita, mas é cheia de possibilidades. Sonhar, recomeçar, perdoar, amar — tudo isso faz parte do que somos. No fim, o que realmente importa é viver com autenticidade, buscando sentido em cada passo dado."
  `;

  const legend_500 = `A vida é uma jornada imprevisível, feita de encontros, despedidas, surpresas e descobertas. Cada dia nasce como uma página em branco, oferecendo a oportunidade de escrevermos uma nova história. Às vezes, os capítulos são leves, repletos de alegrias e risos sinceros. Em outras, enfrentamos tempestades, momentos em que tudo parece desabar e as certezas se desfazem no vento. Mas mesmo nesses períodos difíceis, há algo precioso a ser aprendido. Cada desafio tem o potencial de nos moldar, nos tornar mais fortes e conscientes de quem realmente somos.

  Vivemos em um mundo acelerado, onde tudo acontece depressa e onde a pressão por resultados, sucesso e perfeição muitas vezes nos sufoca. Mas é preciso lembrar que a vida não é uma corrida — é uma caminhada. E como toda boa caminhada, ela exige pausas. Pausas para respirar, para observar o caminho, para perceber as flores que crescem na beira da estrada. Pausas para sentir. Porque é no sentir que nos conectamos com o que realmente importa.
  
  As pessoas que cruzam nosso caminho desempenham papéis essenciais nesse processo. Algumas chegam como luzes, iluminando nossas sombras. Outras vêm como espelhos, refletindo aspectos de nós mesmos que precisamos enxergar. Há também aquelas que partem antes do que gostaríamos, deixando saudade, mas também lembranças e lições. Nenhuma relação é em vão. Todas contribuem, de alguma forma, para o nosso crescimento.
  
  É comum querermos controlar tudo — o futuro, os sentimentos, os outros. Mas a verdade é que muito do que nos acontece está além do nosso controle. E talvez o segredo da paz esteja justamente em aceitar isso. Em aprender a confiar no fluxo da vida, mesmo quando ele nos leva por caminhos inesperados. Confiar que, mesmo quando não entendemos, há um propósito em cada acontecimento.
  
  Sonhar é fundamental. São os sonhos que nos impulsionam, que nos fazem levantar mesmo depois de cair. Mas tão importante quanto sonhar é agir. Cada pequeno passo conta. Cada tentativa, cada esforço, cada recomeço. O progresso nem sempre é visível de imediato, mas ele acontece. Crescer dói, sim, mas também liberta. E nos aproxima da nossa essência, do nosso verdadeiro eu.
  
  O tempo é o nosso bem mais precioso. Por isso, é importante gastá-lo com o que realmente faz sentido: estar com quem amamos, fazer o que nos apaixona, cuidar de nós mesmos, cultivar a gratidão. A vida é feita de instantes, e cada instante pode ser especial se vivermos com presença.
  
  No fim das contas, o que fica não são os bens materiais ou os títulos conquistados. O que permanece é o amor que damos e recebemos, as memórias que criamos, a forma como tocamos a vida das pessoas ao nosso redor. Viver com propósito, com empatia e com coragem é o que dá sentido à existência.`;

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    console.log("Selecionado:", e.target.value);
  };

  //Para o card com modal funcionar
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState({});

  const handleCardClick = (cardData) => {
    setSelectedCardData(cardData);
    setModalVisible(true);
  };

  return (
    <>
      <div className="Mostrar">
        <h2>Botão</h2>
        <Button
          children="Botão"
          onClick={() => console.log("Botão clicado!")}
        />
        <br />
      </div>
      <h2>Selecione uma opção (dropdown)</h2>
      <InputDropDown
        options={tags}
        placeholder="Escolha uma opção"
        onChange={handleChange}
      />
      <br />
      <h2>Input</h2>
      <InputFilter />

      <h3>Valor selecionado: {selectedValue}</h3>
      <Button children="Abrir o Modal" onClick={toggleModal} />
      <Modal
        show={showModal}
        onClose={toggleModal}
        title={title}
        date={date}
        legend={legend_300}
        tags={static_tags}
      />
      <br />
      <br />
      <Button children="Abrir o InputModal" onClick={toggleInputModal} />

      <InputModal
        show={showInputModal}
        onConfirm={(data) => console.log(data)}
        onClose={toggleInputModal}
        tags={tags}
      />

      <br />
      <br />
      <h1>Card clicavel</h1>
      <Card
        title={title}
        date={date}
        legend={legend_300}
        onClick={() =>
          handleCardClick({
            title: title,
            date: date,
            legend: legend_300,
            tags: static_tags,
          })
        }
      />

      <Modal
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        title={selectedCardData.title}
        date={selectedCardData.date}
        legend={selectedCardData.legend}
        tags={selectedCardData.tags}
      />

      <br />
      <br />

      <h1>Formulário de Tags</h1>
      <TagForm tags={tags} />
    </>
  );
}
