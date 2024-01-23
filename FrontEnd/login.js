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
      localStorage.setItem('loginToken', data.token);
    
    };
async function Login(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)

    // Récupérer les valeurs des champs email et mot de passe
    let email = document.getElementById('email').value;
    let password = document.getElementById('mdp').value;

  
    try {
        await loginUser(email, password);
        window.location.href = "index.html"; // redirige l'utilisateur vers la page d'accueil
      } catch (error) {
        document.querySelector('.login-error').textContent = error.message;
      }

}

// Ajouter un écouteur d'événements pour le formulaire
document.getElementById('Login-button').addEventListener('click', Login);