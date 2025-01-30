document.addEventListener("DOMContentLoaded", function () {
    // Charger les valeurs enregistrées
    document.getElementById('monthlySalary').value = localStorage.getItem('monthlySalary') || '';
    document.getElementById('workStart').value = localStorage.getItem('workStart') || '';
    document.getElementById('workEnd').value = localStorage.getItem('workEnd') || '';
    document.getElementById('lunchStart').value = localStorage.getItem('lunchStart') || '';
    document.getElementById('lunchEnd').value = localStorage.getItem('lunchEnd') || '';

    // Charger les jours de travail enregistrés
    const savedWorkDays = JSON.parse(localStorage.getItem('workDays')) || [];
    document.querySelectorAll('.form-check-input').forEach(input => {
        if (savedWorkDays.includes(input.value)) {
            input.checked = true;
        }
    });

    // Gérer l'enregistrement des données
    document.getElementById('salaryForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche la soumission du formulaire

        const salary = document.getElementById('monthlySalary').value;
        const workStart = document.getElementById('workStart').value;
        const workEnd = document.getElementById('workEnd').value;
        const lunchStart = document.getElementById('lunchStart').value;
        const lunchEnd = document.getElementById('lunchEnd').value;

        // Vérification que l'heure de fin de travail n'est pas avant l'heure de début
        const [startHours, startMinutes] = workStart.split(":").map(Number);
        const [endHours, endMinutes] = workEnd.split(":").map(Number);
        const [lunchStartHours, lunchStartMinutes] = lunchStart.split(":").map(Number);
        const [lunchEndHours, lunchEndMinutes] = lunchEnd.split(":").map(Number);

        const startTimeInMinutes = startHours * 60 + startMinutes;
        const endTimeInMinutes = endHours * 60 + endMinutes;
        const lunchStartTimeInMinutes = lunchStartHours * 60 + lunchStartMinutes;
        const lunchEndTimeInMinutes = lunchEndHours * 60 + lunchEndMinutes;

        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.display = 'none'; // Cacher le message d'erreur par défaut
        errorMessage.textContent = "";

        // Vérification de l'ordre des horaires
        if (endTimeInMinutes <= startTimeInMinutes) {
            errorMessage.textContent = "L'heure de fin ne peut pas être avant ou égale à l'heure de début.";
            errorMessage.style.display = 'block';
            return;
        }

        if (lunchStartTimeInMinutes <= startTimeInMinutes || lunchEndTimeInMinutes >= endTimeInMinutes) {
            errorMessage.textContent = "Les heures de déjeuner doivent être comprises dans les heures de travail.";
            errorMessage.style.display = 'block';
            return;
        }

        if (lunchEndTimeInMinutes <= lunchStartTimeInMinutes) {
            errorMessage.textContent = "L'heure de fin de la pause déjeuner doit être après l'heure de début.";
            errorMessage.style.display = 'block';
            return;
        }

        // Si toutes les vérifications passent
        if (salary > 0 && workStart && workEnd && lunchStart && lunchEnd) {
            localStorage.setItem('monthlySalary', salary);
            localStorage.setItem('workStart', workStart);
            localStorage.setItem('workEnd', workEnd);
            localStorage.setItem('lunchStart', lunchStart);
            localStorage.setItem('lunchEnd', lunchEnd);

            // Sauvegarder les jours de travail
            const selectedDays = [];
            document.querySelectorAll('.form-check-input:checked').forEach(input => {
                selectedDays.push(input.value);
            });
            localStorage.setItem('workDays', JSON.stringify(selectedDays));

            // Redirection vers la page principale
            window.location.href = "index.html?saved=true";
        } else {
            errorMessage.textContent = "Veuillez entrer des valeurs valides.";
            errorMessage.style.display = 'block';
        }
    });
});
