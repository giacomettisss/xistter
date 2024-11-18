document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente carregado e analisado.");

  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Formulário de login enviado.");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Dados do formulário capturados:", { email, password });

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })
    .then(response => {
      console.log("Resposta recebida do servidor:", response);
      return response.json();
    })
    .then(data => {
      console.log("Dados da resposta:", data);
      if (data.message === 'Login realizado com sucesso') {
        console.log("Login bem-sucedido.");
        window.location.href = "/feed";
        console.log("Redirecionando para feed.html");
      } else {
        console.warn("Erro retornado do servidor:", data.message);
        throw new Error(data.message);
      }
    })
    .catch(error => {
      console.error("Erro capturado:", error);
      errorMessage.textContent = error.message;
      errorMessage.style.display = "block";
    });
  });
});
