document.addEventListener("DOMContentLoaded", function () {
    // Récupération des informations dans le localStorage
    const monthlySalary = parseFloat(localStorage.getItem('monthlySalary'));
    const workStart = localStorage.getItem('workStart');
    const workEnd = localStorage.getItem('workEnd');
    const lunchStart = localStorage.getItem('lunchStart');
    const lunchEnd = localStorage.getItem('lunchEnd');
    const workDays = JSON.parse(localStorage.getItem('workDays')) || [];

    // Tableau des jours de la semaine en anglais
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Fonction pour calculer le nombre d'heures de travail par jour (en excluant la pause déjeuner)
    function calculateWorkingHoursPerDay(startTime, endTime, lunchStart, lunchEnd) {
        const [startHours, startMinutes] = startTime.split(":").map(Number);
        const [endHours, endMinutes] = endTime.split(":").map(Number);
        const [lunchStartHours, lunchStartMinutes] = lunchStart.split(":").map(Number);
        const [lunchEndHours, lunchEndMinutes] = lunchEnd.split(":").map(Number);

        // Convertir les heures et minutes en minutes totales
        const startTimeInMinutes = startHours * 60 + startMinutes;
        const endTimeInMinutes = endHours * 60 + endMinutes;
        const lunchStartTimeInMinutes = lunchStartHours * 60 + lunchStartMinutes;
        const lunchEndTimeInMinutes = lunchEndHours * 60 + lunchEndMinutes;

        // Calcul des heures de travail
        const workDurationInMinutes = endTimeInMinutes - startTimeInMinutes;
        let effectiveWorkDurationInMinutes = workDurationInMinutes;

        // Exclure les heures de déjeuner
        if (lunchStartTimeInMinutes < endTimeInMinutes && lunchEndTimeInMinutes > startTimeInMinutes) {
            const lunchBreakDurationInMinutes = Math.min(lunchEndTimeInMinutes, endTimeInMinutes) - Math.max(lunchStartTimeInMinutes, startTimeInMinutes);
            effectiveWorkDurationInMinutes -= lunchBreakDurationInMinutes;
        }

        const effectiveWorkDurationInHours = effectiveWorkDurationInMinutes / 60; // Conversion en heures

        return effectiveWorkDurationInHours;
    }

    // Fonction pour calculer le nombre de jours de travail dans le mois
    function calculateWorkingDaysInMonth() {
        const now = new Date();
        const currentMonth = now.getMonth(); // Mois actuel (0 = Janvier, 1 = Février, ...)
        const currentYear = now.getFullYear();
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0); // Dernier jour du mois
        const totalDaysInMonth = lastDayOfMonth.getDate(); // Nombre de jours dans le mois

        let workingDays = 0;

        // Vérification de chaque jour du mois pour savoir s'il est un jour de travail
        for (let day = 1; day <= totalDaysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const dayOfWeek = date.getDay(); // Jour de la semaine (0 = Dimanche, 1 = Lundi, ..., 6 = Samedi)

            if (workDays.includes(daysOfWeek[dayOfWeek])) {
                workingDays++;
            }
        }

        return workingDays;
    }

    // Calcul des heures de travail par jour en excluant la pause déjeuner
    const hoursPerDay = calculateWorkingHoursPerDay(workStart, workEnd, lunchStart, lunchEnd);

    // Calcul du salaire horaire basé sur le nombre de jours de travail réels dans le mois
    const workingDaysInMonth = calculateWorkingDaysInMonth();
    const salaryPerHour = (monthlySalary / workingDaysInMonth / hoursPerDay); // Utilise le nombre exact de jours dans le mois

    // Fonction pour vérifier si nous sommes dans les horaires de travail
    function isWithinWorkTime() {
        const now = new Date();  // Obtenir l'heure actuelle
        const currentDay = now.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();

        // Convertir les heures de début, de fin et de déjeuner en minutes
        const [startHours, startMinutes] = workStart.split(":").map(Number);
        const [endHours, endMinutes] = workEnd.split(":").map(Number);
        const [lunchStartHours, lunchStartMinutes] = lunchStart.split(":").map(Number);
        const [lunchEndHours, lunchEndMinutes] = lunchEnd.split(":").map(Number);

        const currentTime = currentHours * 60 + currentMinutes; // Temps actuel en minutes
        const startTime = startHours * 60 + startMinutes; // Heure de début en minutes
        const endTime = endHours * 60 + endMinutes; // Heure de fin en minutes
        const lunchStartTime = lunchStartHours * 60 + lunchStartMinutes;
        const lunchEndTime = lunchEndHours * 60 + lunchEndMinutes;

        // Vérification si le jour actuel est dans les jours de travail et si l'heure actuelle est dans l'intervalle
        const isInWorkDay = workDays.includes(daysOfWeek[currentDay]);
        const isInWorkTime = currentTime >= startTime && currentTime <= endTime;
        const isInLunchBreak = currentTime >= lunchStartTime && currentTime <= lunchEndTime;

        return isInWorkDay && isInWorkTime && !isInLunchBreak; // Retourne true si c'est un jour de travail et dans les horaires (hors pause déjeuner)
    }

    // Fonction pour calculer le nombre total d'heures travaillées dans le mois
    function calculateTotalWorkingHours() {
        const totalWorkingHours = workingDaysInMonth * hoursPerDay; // Total des heures de travail dans le mois
        return totalWorkingHours;
    }

    function startEarningsCounter(updateInterval = 1000) {
        let totalEarnings = 0; // Total des gains accumulés
        const earningsElement = document.getElementById("earningsDisplay"); // Élément où afficher les gains
        let lastUpdateTime = Date.now(); // Temps initial de mise à jour

        setInterval(function () {
            const currentTime = Date.now();
            const elapsedTime = (currentTime - lastUpdateTime) / 1000; // Temps écoulé en secondes depuis la dernière mise à jour

            let earningsForThisInterval = 0;

            if (isWithinWorkTime()) {
                earningsForThisInterval = (salaryPerHour / 3600) * elapsedTime;
                totalEarnings += earningsForThisInterval;
            }

            if (earningsElement) {
                // Mettre à jour seulement si on est dans les horaires de travail ou si le montant est déjà supérieur à 0
                if (isWithinWorkTime() || totalEarnings > 0) {
                    earningsElement.textContent = `${totalEarnings.toFixed(4)} €`;

                    // Appliquer l'animation uniquement si on est dans les horaires de travail
                    if (isWithinWorkTime()) {
                        earningsElement.style.animation = 'none';
                        earningsElement.offsetHeight;
                        earningsElement.style.animation = 'bubblePop 0.1s ease-out';
                    }
                }
            }

            lastUpdateTime = currentTime;

        }, updateInterval);
    

    }

    // Démarrer le compteur avec un intervalle de mise à jour de 1 seconde (1000ms)
    startEarningsCounter(1000);

    // Affichage des valeurs récupérées pour le débogage
    console.log("Salaire Mensuel : " + monthlySalary + " €");
    console.log("Heure de début : " + workStart);
    console.log("Heure de fin : " + workEnd);
    console.log("Jours de travail : " + workDays.join(', '));
    console.log("Salaire horaire approximatif : " + salaryPerHour.toFixed(2) + " €");
    console.log(`Total des heures de travail dans le mois : ${calculateTotalWorkingHours()} heures`);
    console.log("Est-ce dans les horaires de travail ? " + (isWithinWorkTime() ? "Oui" : "Non"));
    console.log("Heure de début de pause déjeuner : " + lunchStart);
    console.log("Heure de fin de pause déjeuner : " + lunchEnd);
});
