// Fonction pour charger un message aléatoire à partir du fichier JSON
function loadRandomMessage() {
    fetch('messages.json')
        .then(response => response.json())
        .then(data => {
            // Sélectionner un message aléatoire
            let messages = data.messages;
            if (messages.length > 0) {
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                // Afficher le message dans la barre de défilement
                displayMessage(randomMessage);
            }
        })
        .catch(error => {
            console.error("Erreur lors du chargement des messages:", error);
        });
}

// Fonction pour afficher le message dans la barre de défilement
function displayMessage(message) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = ''; // Réinitialiser le conteneur

    // Créer un élément div pour le message
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);

    // Déterminer la largeur du message et ajuster l'animation
    const messageWidth = messageElement.offsetWidth;
    const animationDuration = (messageWidth / 10) * 0.1; // Ajuste la durée de l'animation en fonction de la largeur du message
    messageContainer.style.animationDuration = `${animationDuration}s`;
}

// Charger un message aléatoire au démarrage
loadRandomMessage();
