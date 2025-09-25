// Sélectionnez le formulaire
const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Préparation des données du formulaire
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Envoi des données à Web3Forms
    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: json
        });

        const result = await response.json();

        // Affichage de la pop-up Bootstrap
        if (result.success) {
            const myModal = new bootstrap.Modal(document.getElementById('successModal'));
            myModal.show();
            form.reset(); // Réinitialise les champs du formulaire
        } else {
            // Optionnel : Gérer les erreurs avec une autre pop-up ou une alerte
            alert("Une erreur est survenue lors de l'envoi du message.");
            console.log(result);
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert("Une erreur de connexion est survenue.");
    }
});