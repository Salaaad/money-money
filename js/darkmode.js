document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Vérifier si le mode sombre est activé dans localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        document.documentElement.classList.add("dark-mode"); // Applique le mode sombre
        darkModeToggle.checked = true; // Cocher le switch
        console.log("Mode sombre activé"); // Message de débogage
    }

    // Écouteur d'événement pour activer/désactiver le mode sombre
    darkModeToggle.addEventListener("change", function () {
        if (darkModeToggle.checked) {
            document.documentElement.classList.add("dark-mode"); // Applique le mode sombre
            localStorage.setItem("darkMode", "enabled"); // Sauvegarde dans localStorage
            console.log("Mode sombre activé"); // Message de débogage
        } else {
            document.documentElement.classList.remove("dark-mode"); // Retire le mode sombre
            localStorage.setItem("darkMode", "disabled"); // Sauvegarde dans localStorage
            console.log("Mode sombre désactivé"); // Message de débogage
        }
    });
});