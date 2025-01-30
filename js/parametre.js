// Charger les valeurs enregistrées
document.getElementById('monthlySalary').value = localStorage.getItem('monthlySalary') || '';
document.getElementById('workStart').value = localStorage.getItem('workStart') || '';
document.getElementById('workEnd').value = localStorage.getItem('workEnd') || '';

// Charger les jours de travail enregistrés
const savedWorkDays = JSON.parse(localStorage.getItem('workDays')) || [];
document.querySelectorAll('.form-check-input').forEach(input => {
    if (savedWorkDays.includes(input.value)) {
        input.checked = true;
    }
});

document.getElementById('salaryForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    const salary = document.getElementById('monthlySalary').value;
    const workStart = document.getElementById('workStart').value;
    const workEnd = document.getElementById('workEnd').value;

    // Vérification que l'heure de fin n'est pas avant l'heure de début
    const [startHours, startMinutes] = workStart.split(":").map(Number);
    const [endHours, endMinutes] = workEnd.split(":").map(Number);

    const startTimeInMinutes = startHours * 60 + startMinutes;
    const endTimeInMinutes = endHours * 60 + endMinutes;

    // Si l'heure de fin est avant l'heure de début, afficher le message d'erreur
    if (endTimeInMinutes < startTimeInMinutes) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = "L'heure de fin ne peut pas être avant l'heure de début.";
        errorMessage.style.display = 'block'; // Afficher le message d'erreur
        return; // Empêche la sauvegarde si l'heure de fin est incorrecte
    }

    // Si toutes les vérifications passent
    if (salary > 0 && workStart && workEnd) {
        localStorage.setItem('monthlySalary', salary);
        localStorage.setItem('workStart', workStart);
        localStorage.setItem('workEnd', workEnd);

        // Sauvegarder les jours de travail
        const selectedDays = [];
        document.querySelectorAll('.form-check-input:checked').forEach(input => {
            selectedDays.push(input.value);
        });
        localStorage.setItem('workDays', JSON.stringify(selectedDays));

        // Redirection vers la page principale
        window.location.href = "index.html?saved=true";
    } else {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = "Veuillez entrer des valeurs valides.";
        errorMessage.style.display = 'block'; // Afficher le message d'erreur
    }
});
