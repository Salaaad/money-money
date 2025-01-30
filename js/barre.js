let messages = [];

// Fonction pour charger les messages à partir du fichier JSON
function loadMessages() {
    fetch('messages.json')
        .then(response => response.json())
        .then(data => {
            // Sélectionner des messages
            messages = data.messages;
            if (messages.length > 0) {
                // Mélanger les messages de manière aléatoire
                shuffleArray(messages);
                // Afficher les messages dans la barre
                displayMessages(messages);
            }
        })
        .catch(error => {
            console.error("Erreur lors du chargement des messages:", error);
        });
}

// Fonction pour mélanger un tableau de messages
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Echange des éléments
    }
}

// Fonction pour afficher les messages dans la barre de défilement
function displayMessages(messages) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = ''; // Réinitialiser le conteneur

    // Ajouter les messages dans le conteneur
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message;
        messageContainer.appendChild(messageElement);
    });

    // Dupliquer les messages pour un effet de défilement continu
    for (let i = 0; i < 2; i++) {
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.textContent = message;
            messageContainer.appendChild(messageElement);
        });
    }
}

// Charger les messages au démarrage
loadMessages();
