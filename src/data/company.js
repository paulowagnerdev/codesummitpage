/**
 * Conteúdo do site — fonte única de verdade.
 * Apenas informações reais da Code Summit. Para adicionar e-mail,
 * LinkedIn ou Instagram, preencha os campos em `contact` / `social`.
 */

const WHATSAPP_NUMBER = "5547988129920";

export const whatsappLink = (message = "Olá! Gostaria de falar sobre um projeto.") =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const company = {
    name: "Code Summit",
    tagline: "Código é o que fazemos. Pessoas é o que somos.",
    description:
        "Empresa de desenvolvimento de software focada em criar soluções inovadoras e eficientes.",
    about:
        "A Code Summit nasceu para transformar desafios em soluções digitais escaláveis, seguras e inovadoras. Unimos tecnologia e estratégia para entregar softwares que impulsionam negócios.",
    contact: {
        phoneDisplay: "(47) 98812-9920",
        phoneHref: "tel:+5547988129920",
        city: "Jaraguá do Sul, SC",
        email: null, // ex.: "contato@codesummit.com.br"
    },
    social: [
        // TODO: preencher o link do Instagram (ex.: "https://instagram.com/codesummit")
        { label: "Instagram", href: "", display: "Seguir no Instagram" },
        // { label: "LinkedIn", href: "" },
    ],
};

export const navItems = [
    { id: "solucoes", label: "Soluções" },
    { id: "processo", label: "Processo" },
    { id: "sobre", label: "Sobre" },
    { id: "contato", label: "Contato" },
];

export const services = [
    {
        id: "web",
        title: "Desenvolvimento Web",
        short: "Aplicações modernas, responsivas e de alta performance.",
        body: "Sites institucionais, portais e aplicações web construídos para carregar rápido, funcionar bem em qualquer tela e crescer junto com o seu negócio.",
        visual: "web",
    },
    {
        id: "mobile",
        title: "Aplicações Mobile",
        short: "Aplicativos nativos e híbridos com excelente experiência de uso.",
        body: "Aplicativos pensados a partir de quem vai usá-los: fluxos claros, interfaces fluidas e uma base de código preparada para evoluir.",
        visual: "mobile",
    },
    {
        id: "corporativo",
        title: "Soluções Corporativas",
        short: "Sistemas robustos para otimizar processos e ganhar eficiência.",
        body: "Sistemas sob medida que organizam a operação, eliminam tarefas repetitivas e colocam as informações certas nas mãos de quem decide.",
        visual: "corporate",
    },
    {
        id: "integracoes",
        title: "Integrações e APIs",
        short: "Conectamos sistemas e criamos experiências completas.",
        body: "Fazemos as ferramentas que você já usa conversarem entre si, com APIs bem definidas e dados fluindo sem retrabalho.",
        visual: "api",
    },
    {
        id: "suporte",
        title: "Manutenção e suporte",
        short: "Seu software seguro, estável e sempre atualizado.",
        body: "Acompanhamento contínuo depois da entrega: correções, atualizações e melhorias para que o sistema continue servindo bem ao negócio.",
        visual: "support",
    },
];

export const process = [
    {
        title: "Entendimento",
        text: "Conversamos sobre o seu negócio, os objetivos e os desafios antes de escrever qualquer linha de código.",
    },
    {
        title: "Planejamento",
        text: "Definimos escopo, arquitetura e prioridades, para que todos saibam o que será entregue e em que ordem.",
    },
    {
        title: "Desenvolvimento",
        text: "Construímos a solução com entregas que você acompanha e valida ao longo do caminho.",
    },
    {
        title: "Entrega e evolução",
        text: "Publicamos o sistema e seguimos ao seu lado com manutenção, suporte e melhorias.",
    },
];

export const values = [
    { title: "Escalável", text: "Pensado para acompanhar o crescimento do seu negócio." },
    { title: "Seguro", text: "Boas práticas aplicadas desde a primeira versão." },
    { title: "Inovador", text: "Tecnologia escolhida pelo problema, não pela moda." },
];
