// Fonction pour charger des messages aléatoires à partir du fichier JSON
function loadRandomMessages() {
    fetch('messages.json')
        .then(response => response.json())
        .then(data => {
            // Sélectionner plusieurs messages aléatoires
            let messages = data.messages;
            if (messages.length > 0) {
                const randomMessages = getRandomMessages(messages, 50); // Afficher 5 messages à la fois
                // Afficher les messages dans la barre de défilement
                displayMessages(randomMessages);
            }
        })
        .catch(error => {
            console.error("Erreur lors du chargement des messages:", error);
        });
}

// Fonction pour sélectionner des messages aléatoires
function getRandomMessages(messages, count) {
    const shuffledMessages = [...messages].sort(() => Math.random() - 0.5); // Mélanger les messages
    return shuffledMessages.slice(0, count); // Sélectionner les premiers `count` messages
}

// Fonction pour afficher les messages dans la barre de défilement
function displayMessages(messages) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = ''; // Réinitialiser le conteneur

    // Dupliquer les messages pour un défilement infini
    const duplicatedMessages = [...messages, ...messages]; // Dupliquer les messages

    // Ajouter les messages dans le conteneur
    duplicatedMessages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message;
        messageContainer.appendChild(messageElement);
    });

    // Déterminer la largeur totale des messages et ajuster l'animation
    const totalWidth = Array.from(messageContainer.children).reduce((sum, element) => sum + element.offsetWidth, 0);
    const screenWidth = window.innerWidth;
    const animationDuration = ((totalWidth + screenWidth) / 100) * 0.25; // Ajustez le coefficient (0.5) pour contrôler la vitesse
    messageContainer.style.animationDuration = `${animationDuration}s`;
}

// Charger des messages aléatoires au démarrage
loadRandomMessages();