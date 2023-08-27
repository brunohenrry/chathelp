const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector("#send-btn");

const inputInitHeight = chatInput.scrollHeight;
let unknownCount = 0;

const responses = {
    greetings: [
        "Olá! Como posso ajudar você hoje?",
        "Oi! Como posso ser útil?",
        "Olá! Estou aqui para responder às suas perguntas.",
        "Oi! Bem-vindo(a) ao nosso assistente virtual."
    ],
    hours: [
        "Nosso horário de atendimento é das 9h às 18h, de segunda a sexta-feira.",
        "Estamos disponíveis das 9h às 18h durante a semana.",
        "Você pode entrar em contato conosco entre as 9h e as 18h, de segunda a sexta-feira."
    ],
    website: [
        "Visite nosso site em <a href='https://www.exemplo.com' target='_blank'>www.exemplo.com</a> para obter mais informações.",
        "Para saber mais, acesse <a href='https://www.exemplo.com' target='_blank'>www.exemplo.com</a>.",
        "Todas as informações que você precisa estão em <a href='https://www.exemplo.com' target='_blank'>www.exemplo.com</a>."
    ],
    contact: [
        "Entre em contato conosco pelo email <a href='mailto:suporte@exemplo.com'>suporte@exemplo.com</a>.",
        "Você pode nos enviar um email para <a href='mailto:suporte@exemplo.com'>suporte@exemplo.com</a>.",
        "Para falar conosco, envie uma mensagem para <a href='mailto:suporte@exemplo.com'>suporte@exemplo.com</a>."
    ],
    thanks: [
        "Obrigado por entrar em contato conosco!",
        "Agradecemos sua pergunta! Estamos aqui para ajudar.",
        "Obrigado por conversar com nosso assistente virtual."
    ],
    news: [
        "As últimas notícias são sempre interessantes. Gostaria de ver as principais manchetes?",
        "Fique por dentro das últimas notícias. Posso mostrar algumas manchetes atuais.",
        "Notícias fresquinhas! Posso te mostrar algumas das notícias mais recentes."
    ],
    help: [
        "Bem-vindo(a) ao nosso assistente virtual! Aqui estão algumas dicas para você:",
        "- Pergunte sobre nosso horário de atendimento, localização e mais.",
        "- Quer saber as últimas notícias? Digite 'notícias'.",
        "- Precisa de informações de contato? Pergunte sobre email e telefone.",
        "- Quer conhecer nossos produtos e serviços? Digite 'produtos' ou 'serviços'.",
        "- Tem alguma pergunta? Tente 'perguntas frequentes'.",
        "- Quer nos dar feedback? Digite 'feedback' ou 'avaliação'.",
        "- Digite 'ajuda' a qualquer momento para ver estas instruções novamente.",
        "- Estou aqui para ajudar! 😊"
    ],
    productsServicesInfo: [
        "Nós oferecemos uma variedade de produtos e serviços para atender às suas necessidades.",
        "Nossos produtos e serviços são projetados para proporcionar a melhor experiência possível.",
        "Se você está procurando por produtos ou serviços de alta qualidade, você veio ao lugar certo."
    ],
    faqs: [
        "Aqui estão algumas perguntas frequentes que nossos clientes costumam fazer:",
        "1. Como faço para fazer uma reserva?",
        "2. Qual é a política de cancelamento?",
        "3. Vocês oferecem descontos para clientes regulares?",
        "4. Quanto tempo leva para receber meus produtos?",
        "5. Como posso acompanhar o status do meu pedido?"
    ],
    feedbackPrompt: [
        "Valorizamos sua opinião! Se você tiver um momento, ficaríamos felizes em ouvir o que você achou da nossa assistente virtual.",
        "Seu feedback nos ajuda a melhorar continuamente nossos serviços. Por favor, compartilhe suas impressões conosco!"
    ],
    unknown: [
        "Peço desculpas, mas não entendi sua pergunta. Poderia reformulá-la?",
        "Desculpe, não tenho certeza do que você está perguntando. Poderia tentar novamente?",
        "Não consegui compreender o que você disse. Poderia ser mais claro?"
    ]
};

const getRandomResponse = (responseArray) => {
    const randomIndex = Math.floor(Math.random() * responseArray.length);
    return responseArray[randomIndex];
};

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    const chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
};

const generateProductsServicesInfo = () => {
    return getRandomResponse(responses.productsServicesInfo);
};

const generateFAQResponse = () => {
    return responses.faqs.join("<br>");
};

const generateFeedbackPrompt = () => {
    return getRandomResponse(responses.feedbackPrompt);
};

const generateResponse = async (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes("horário") || lowerCaseMessage.includes("atendimento")) {
        return getRandomResponse(responses.hours);
    } else if (lowerCaseMessage.includes("nome") || lowerCaseMessage.includes("empresa")) {
        return getRandomResponse(responses.greetings);
    } else if (lowerCaseMessage.includes("website") || lowerCaseMessage.includes("site")) {
        return getRandomResponse(responses.website);
    } else if (lowerCaseMessage.includes("contato") || lowerCaseMessage.includes("email")) {
        return getRandomResponse(responses.contact);
    } else if (lowerCaseMessage.includes("obrigado") || lowerCaseMessage.includes("agradecimento")) {
        return getRandomResponse(responses.thanks);
    } else if (lowerCaseMessage.includes("notícias") || lowerCaseMessage.includes("novidades")) {
        return getRandomResponse(responses.news);
    } else if (lowerCaseMessage.includes("ajuda")) {
        return getRandomResponse(responses.help);
    } else if (lowerCaseMessage.includes("produtos") || lowerCaseMessage.includes("serviços")) {
        return generateProductsServicesInfo();
    } else if (lowerCaseMessage.includes("perguntas frequentes")) {
        return generateFAQResponse();
    } else if (lowerCaseMessage.includes("feedback") || lowerCaseMessage.includes("avaliação")) {
        return generateFeedbackPrompt();
    } else {
        unknownCount++;
        if (unknownCount === 2) {
            unknownCount = 0;
            return `Peço desculpas, mas não consegui entender sua pergunta duas vezes seguidas. Digite "ajuda" para ver as instruções novamente ou entre em contato conosco para assistência personalizada.`;
        } else {
            return getRandomResponse(responses.unknown);
        }
    }
};

const typeMessage = async (message) => {
    const responseLi = createChatLi("", "incoming");
    chatbox.appendChild(responseLi);

    const typingSpeed = 10;

    let i = 0;
    const typingInterval = setInterval(() => {
        if (i <= message.length) {
            responseLi.querySelector("p").innerHTML = message.substr(0, i);
            i++;
            chatbox.scrollTo(0, chatbox.scrollHeight);
        } else {
            clearInterval(typingInterval);
        }
    }, typingSpeed);
};

const handleChat = async () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await generateResponse(userMessage);
    await typeMessage(response);
};

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        await handleChat();
    }
});

sendChatBtn.addEventListener("click", async () => {
    await handleChat();
});

closeBtn.addEventListener("click", () => {
    document.body.classList.remove("show-chatbot");
});

chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
});
