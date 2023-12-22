// Fonction pour gérer la soumission du formulaire
function Login(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)

    // Récupérer les valeurs des champs email et mot de passe
    let email = document.getElementById('email').value;
    let password = document.getElementById('mdp').value;

    // Vérifier les identifiants (exemple simple, à remplacer par une vérification côté serveur)
    if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
        // Authentification réussie
        alert('Connexion réussie !');

        // Rediriger vers la page du site avec des boutons d'actions
        window.location.href = 'index.html';
    } else {
        // Afficher un message d'erreur si les identifiants sont incorrects
        alert('Erreur dans l’identifiant ou le mot de passe');
    }
}

// Ajouter un écouteur d'événements pour le formulaire
document.getElementById('Login').addEventListener('submit', Login);