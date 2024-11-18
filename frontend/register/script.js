document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente carregado e analisado.");

  const registerForm = document.getElementById("registerForm");
  const errorMessage = document.getElementById("error-message");

  registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("Formulário de registro enviado.");

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      console.log("Dados do formulário capturados:", { email, password, confirmPassword });

      // Validação básica no frontend
      if (password !== confirmPassword) {
          errorMessage.textContent = "As senhas não coincidem.";
          errorMessage.style.display = "block";
          return;
      }

      try {
          const response = await fetch('/api/auth/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password, confirmPassword }),
              credentials: 'include' // Inclui cookies na requisição
          });

          console.log("Resposta recebida do servidor:", response);

          const data = await response.json();
          console.log("Dados da resposta:", data);

          if (response.ok && data.message === 'User registered successfully') {
              console.log("Registro e autenticação bem-sucedidos. Redirecionando para feed.html");
              window.location.href = "/feed";
          } else {
              console.warn("Erro retornado do servidor:", data.message);
              throw new Error(data.message || 'Erro no registro');
          }
      } catch (error) {
          console.error("Erro capturado:", error);
          errorMessage.textContent = error.message;
          errorMessage.style.display = "block";
      }
  });
});


// document.addEventListener("DOMContentLoaded", () => {
//     console.log("DOM completamente carregado e analisado.");
  
//     const registerForm = document.getElementById("registerForm");
//     const errorMessage = document.getElementById("error-message");
  
//     registerForm.addEventListener("submit", (event) => {
//       event.preventDefault();
//       console.log("Formulário de registro enviado.");
  
//       const email = document.getElementById("email").value.trim();
//       const password = document.getElementById("password").value.trim();
//       const confirmPassword = document.getElementById("confirmPassword").value.trim();
  
//       console.log("Dados do formulário capturados:", { email, password, confirmPassword });
  
//       // Validação básica no frontend
//       if (password !== confirmPassword) {
//         errorMessage.textContent = "As senhas não coincidem.";
//         errorMessage.style.display = "block";
//         return;
//       }
  
//       fetch('/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password, confirmPassword }),
//         credentials: 'include'
//       })
//       .then(response => {
//         console.log("Resposta recebida do servidor:", response);
//         return response.json();
//       })
//       .then(data => {
//         console.log("Dados da resposta:", data);
//         if (data.message === 'User registered successfully') {
//           console.log("Registro bem-sucedido.");
//           window.location.href = "/feed";
//           console.log("Redirecionando para feed.html");
//         } else {
//           console.warn("Erro retornado do servidor:", data.message);
//           throw new Error(data.message);
//         }
//       })
//       .catch(error => {
//         console.error("Erro capturado:", error);
//         errorMessage.textContent = error.message;
//         errorMessage.style.display = "block";
//       });
//     });
//   });
  