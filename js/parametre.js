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
    event.preventDefault();
    const salary = document.getElementById('monthlySalary').value;
    const workStart = document.getElementById('workStart').value;
    const workEnd = document.getElementById('workEnd').value;

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
        alert("Veuillez entrer des valeurs valides.");
    }
});
