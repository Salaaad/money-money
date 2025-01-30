document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById('message-container');
    let allMessages = [];

    // Chargement initial
    container.innerHTML = '<span class="message">Chargement...</span>';

    try {
        const response = await fetch('messages.json');
        allMessages = (await response.json()).messages;
    } catch (error) {
        container.innerHTML = '<span class="message">Erreur</span>';
        return;
    }

    function generateRandomMessages() {
        const randomMessages = [];
        // Générer 50 messages avec répétitions aléatoires
        for (let i = 0; i < 50; i++) {
            const randomIndex = Math.floor(Math.random() * allMessages.length);
            randomMessages.push(allMessages[randomIndex]);
        }
        return randomMessages;
    }

    function createMessageElements() {
        const fragment = document.createDocumentFragment();
        const messages = generateRandomMessages();

        messages.forEach(msg => {
            const el = document.createElement('span');
            el.className = 'message';
            el.textContent = msg;
            fragment.appendChild(el);
        });

        return fragment;
    }

    function startAnimation() {
        // 1. Nettoyer et remplir avec de nouveaux messages aléatoires
        container.innerHTML = '';
        container.appendChild(createMessageElements());

        // 2. Calculer la durée de l'animation
        const totalWidth = Array.from(container.children)
            .reduce((acc, el) => acc + el.offsetWidth, 0);

        const duration = (totalWidth + window.innerWidth) / 150; // 50 pixels par seconde

        // 3. Lancer l'animation
        container.style.animation = `scrollMessage ${duration}s linear`;

        // 4. Redémarrer l'animation dès qu'elle est terminée
        container.addEventListener('animationend', () => {
            // Réinitialiser l'animation pour éviter les bugs
            container.style.animation = 'none';
            void container.offsetWidth; // Force un reflow pour réinitialiser l'animation

            // Redémarrer avec un nouveau shuffle
            startAnimation();
        }, { once: true }); // Utiliser { once: true } pour éviter les accumulations d'écouteurs
    }

    // Premier démarrage
    startAnimation();
});