// Fonction pour récupérer le salaire horaire depuis le localStorage
function getHourlySalary() {
    return parseFloat(localStorage.getItem('hourlySalary')) || 0;
}

// Affichage du montant gagné
function updateEarnings() {
    const hourlySalary = getHourlySalary(); // Récupère la valeur actuelle du salaire horaire
    if (hourlySalary > 0) {
        const now = new Date();
        const hoursElapsed = (now.getTime() - startTime) / (1000 * 60 * 60); // Temps en heures
        const earnedMoney = (hourlySalary * hoursElapsed).toFixed(2);
        document.getElementById('moneyDisplay').innerText = earnedMoney + " €";
    } else {
        document.getElementById('moneyDisplay').innerText = "0.00 €";
    }
}

// Initialise le temps de départ (lorsque la page est chargée)
const startTime = new Date().getTime();

// Met à jour le montant gagné toutes les secondes
setInterval(updateEarnings, 100);

// Fonction pour sauvegarder le salaire horaire
document.getElementById('saveButton')?.addEventListener('click', function () {
    const salary = document.getElementById('hourlySalary')?.value;
    if (salary > 0) {
        localStorage.setItem('hourlySalary', salary);
        alert("Salaire horaire sauvegardé !");
        // Force la mise à jour de l'affichage après la sauvegarde
        updateEarnings();
    } else {
        alert("Veuillez entrer un salaire valide.");
    }
});

// Écouteur d'événement pour détecter les changements dans le localStorage
window.addEventListener('storage', function (event) {
    if (event.key === 'hourlySalary') {
        // Mettre à jour l'affichage si le salaire horaire change
        updateEarnings();
    }
});