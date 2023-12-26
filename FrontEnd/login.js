// Fonction pour gérer la soumission du formulaire
async function loginUser(paramemail, parampassword) {
    const url = 'http://localhost:5678/api/users/login';
      // Crée une requête POST pour se connecter à l'API
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: paramemail, password: parampassword}),
        
        
      };
    
      // Envoie la requête POST et attend la réponse
      const response = await fetch(url, options);
    
      // Vérifie si la réponse est ok
      if (!response.ok) {
        throw new Error('Identifiants de connexion invalides');
      }
    
      // Récupère le token d'authentification et le stocke dans le localStorage
      const data = await response.json();
      console.log(data)
      //localStorage.setItem('authToken', data.token);
    
    };
async function Login(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)

    // Récupérer les valeurs des champs email et mot de passe
    let email = document.getElementById('email').value;
    let password = document.getElementById('mdp').value;

    console.log(email);
    console.log(password);
    try {
        await loginUser(email, password);
        window.location.href = "index.html"; // redirige l'utilisateur vers la page d'accueil
      } catch (error) {
        document.querySelector('.login-error').textContent = error.message;
      }
    // Vérifier les identifiants (exemple simple, à remplacer par une vérification côté serveur)
   /* if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
        // Authentification réussie
        alert('Connexion réussie !');

        // Rediriger vers la page du site avec des boutons d'actions
        window.location.href = 'index.html';
    } else {
        // Afficher un message d'erreur si les identifiants sont incorrects
        alert('Erreur dans l’identifiant ou le mot de passe');
    }*/
}

// Ajouter un écouteur d'événements pour le formulaire
document.getElementById('Login-button').addEventListener('click', Login);