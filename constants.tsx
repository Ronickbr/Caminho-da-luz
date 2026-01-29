
import { Affirmation } from './types';

export const AFFIRMATIONS_SEED: Affirmation[] = Array.from({ length: 63 }, (_, i) => {
  const week = Math.floor(i / 7) + 1;
  const day = (i % 7) + 1;
  const texts = [
    "Eu sou um canal de luz e paz divina.",
    "A abundância do universo flui livremente para mim.",
    "Eu confio no processo da vida e sigo com coragem.",
    "Meu coração está aberto para dar e receber amor incondicional.",
    "Eu libero todo o medo e abraço a minha verdade.",
    "A cada respiração, sinto-me mais conectado com o sagrado.",
    "Sou grato por todas as experiências que moldam minha alma.",
    "A paz começa comigo e se estende a todos ao meu redor.",
    "Eu escolho a alegria e a compaixão em todos os momentos.",
    "Minha intuição me guia com clareza e sabedoria.",
    "Eu sou digno de todas as bênçãos que o hoje me traz.",
    "Perdoo a mim mesmo e aos outros, libertando meu passado.",
    "A força divina me sustenta e me protege sempre.",
    "Minha mente é um jardim de pensamentos positivos e férteis.",
    "Eu honro o templo que é o meu corpo.",
    "A luz interior brilha através de mim, iluminando o mundo.",
    "Sou um ser de energia infinita e criatividade ilimitada.",
    "Onde quer que eu vá, levo harmonia e bondade.",
    "Estou em sintonia com os ritmos naturais do universo.",
    "Cada desafio é uma oportunidade de crescimento espiritual.",
    "Eu aceito o agora com serenidade e presença.",
    "Minha vida é uma manifestação de propósito e graça.",
    "Sou co-criador da minha realidade com o Divino.",
    "A verdade me liberta e me empodera.",
    "Eu sou a personificação da saúde e do vigor.",
    "O amor dissolve todas as barreiras em meu caminho.",
    "Sinto a presença divina em cada detalhe da criação.",
    "Eu descanso na certeza de que tudo está bem.",
    "Minha alma é vasta, eterna e radiante.",
    "Manifesto milagres através da fé e da ação inspirada.",
    "Sou um farol de esperança e integridade.",
    "Minhas palavras curam e elevam aqueles que ouvem.",
    "Eu celebro a beleza da vida em todas as suas formas.",
    "Estou alinhado com o bem maior de todos os seres.",
    "A sabedoria dos ancestrais flui através do meu ser.",
    "Eu sou paciente, resiliente e pleno.",
    "Minha fé é inabalável e minha visão é clara.",
    "Agradeço pela abundância que já existe em minha vida.",
    "Eu atraio relacionamentos que nutrem minha alma.",
    "Sou livre para ser quem eu realmente sou.",
    "O silêncio me traz as respostas que busco.",
    "Cada dia é um novo começo cheio de possibilidades divinas.",
    "Eu transformo sombra em luz com a força do meu amor.",
    "Sou um instrumento de cura no mundo.",
    "Minha vontade está em harmonia com a vontade superior.",
    "Eu caminho com confiança e humildade.",
    "O sucesso é o resultado natural do meu alinhamento.",
    "Sinto-me seguro e amparado pelo Universo.",
    "Minha presença é um presente para o mundo.",
    "Eu cultivo a paz interior acima de todas as coisas.",
    "Sou um ser de luz em uma experiência humana sagrada.",
    "A gratidão é a chave que abre todas as portas.",
    "Eu vejo a divindade em cada pessoa que encontro.",
    "Minha jornada é única, preciosa e divinamente guiada.",
    "Eu me abro para as infinitas surpresas do bem.",
    "Sou mestre das minhas emoções e capitão da minha alma.",
    "O amor é a minha bússola e a verdade o meu norte.",
    "Eu reflito a perfeição e a ordem do cosmos.",
    "Sinto-me renovado a cada novo amanhecer.",
    "A generosidade flui de mim naturalmente.",
    "Eu sou um oceano de tranquilidade e sabedoria.",
    "A vida me ama e eu amo a vida.",
    "Eu sou UM com o Criador, hoje e sempre."
  ];
  return {
    id: `aff-${i + 1}`,
    week,
    day,
    text: texts[i] || `Afirmação do Dia ${i + 1}: Eu estou evoluindo em amor e luz.`,
    completed: false
  };
});

export const OPENING_CONTENT = `
Bem-vindo ao seu Programa Espiritual de 9 Semanas. Este é um convite para uma jornada de auto-descoberta, cura e conexão profunda com o Divino. Durante os próximos 63 dias, você dedicará alguns minutos por dia para alinhar seus pensamentos e seu coração com frequências elevadas de paz, gratidão e propósito.

Nossa meta é transformar sua realidade interna através da repetição consciente de afirmações positivas, orações sinceras e reflexões pessoais. A consistência é o segredo da transformação.
`;

export const GUIDELINES_CONTENT = [
  "Encontre um lugar calmo onde você possa ficar em silêncio por pelo menos 10 minutos.",
  "Faça três respirações profundas antes de iniciar sua prática diária.",
  "Leia a afirmação do dia em voz alta, sentindo cada palavra vibrar em seu ser.",
  "Use a ferramenta de áudio para ouvir a afirmação se preferir meditar com os olhos fechados.",
  "Realize as orações da manhã ao acordar e as da noite antes de dormir.",
  "Escreva no seu Diário Espiritual suas percepções, sentimentos ou insights do dia.",
  "Seja gentil consigo mesmo. Se perder um dia, apenas retome de onde parou."
];

export const PRAYER_MORNING = `
Divino Criador, ao abrir os olhos para este novo dia, elevo meu coração em gratidão. Agradeço pelo sopro da vida, pela oportunidade de recomeçar e pela luz que ilumina meu caminho.

Peço que minha mente seja clara, que minhas palavras sejam de bondade e que minhas mãos sejam instrumentos de paz. Guia-me em cada decisão e protege-me de todo pensamento de escassez ou medo.

Que eu possa ver o melhor em cada ser humano e que eu seja capaz de servir com amor e alegria. Que este dia seja produtivo, harmonioso e divinamente abençoado.

Amém.
`;

export const PRAYER_EVENING = `
Ao final deste dia, volto-me para o silêncio do meu ser. Agradeço por todas as experiências vividas, pelos aprendizados colhidos e pelos desafios superados.

Entrego ao Universo qualquer preocupação ou cansaço. Peço perdão pelas falhas cometidas e libero qualquer ressentimento, escolhendo dormir em paz com o mundo e comigo mesmo.

Que o meu sono seja reparador e que meus sonhos tragam mensagens de sabedoria e cura. Descanso na certeza de que estou seguro e amparado pelo amor infinito.

Que amanhã eu desperte com vigor e renovada esperança.

Gratidão, Gratidão, Gratidão.
`;
