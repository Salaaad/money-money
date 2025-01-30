const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('saved')) {
    const notification = document.getElementById('notification');

    // Ajouter la classe 'show' pour afficher la notification avec l'effet de fade
    notification.classList.add('show');

    // Après 2 secondes, commencer à masquer la notification
    setTimeout(() => {
        notification.classList.remove('show'); // Retirer la classe 'show'
        notification.classList.add('hide'); // Ajouter la classe 'hide' pour l'effet de disparition
    }, 2000); // Délai de 2 secondes avant de commencer à masquer

    // Après l'animation de disparition (500ms), réinitialiser l'état de la notification
    setTimeout(() => {
        notification.classList.remove('hide'); // Retirer la classe 'hide' pour réinitialiser
    }, 2500); // Attendre 2.5 secondes avant de réinitialiser (2000ms + 500ms d'animation)
}
