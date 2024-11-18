// Navegação por Abas
const tabs = document.querySelectorAll('.tab');
const feed = document.querySelector('.feed');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove a classe active de todas as abas
        tabs.forEach(item => item.classList.remove('active'));
        // Adiciona a classe active na aba clicada
        tab.classList.add('active');

        // Filtra os posts com base na aba selecionada
        const selectedTab = tab.getAttribute('data-tab');
        filterPosts(selectedTab);
    });
});

// Função para filtrar posts (Simulação)
function filterPosts(tab) {
    // Aqui você pode implementar a lógica para filtrar os posts
    // Por enquanto, vamos apenas exibir um alerta
    alert(`Aba selecionada: ${tab}`);
}

// Botão de Ação Flutuante
// const fab = document.querySelector('.fab');
// fab.addEventListener('click', () => {
//     // Implementar a lógica para criar uma nova postagem
//     // Por enquanto, apenas um alerta
//     // alert('Botão de nova postagem clicado!');
// });



/* MODAL POST */

document.addEventListener("DOMContentLoaded", () => {
    const fab = document.querySelector(".fab");
    const modal = document.getElementById("modal");
    const closeButton = document.querySelector(".close-button");
    const postForm = document.getElementById("postForm");
    const postContentInput = document.getElementById("postContent");

    function openModal() {
        modal.style.display = "block";
        postContentInput.focus();
        history.pushState({ modalOpen: true }, null, "");
    }

    function closeModal() {
        modal.style.display = "none";
        if (history.state && history.state.modalOpen) {
            history.back();
        }
    }

    fab.addEventListener("click", () => {
        openModal();
    });

    closeButton.addEventListener("click", () => {
        closeModal();
    });

    // Fecha a modal ao clicar fora do conteúdo da modal
    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    // Lida com o evento de 'popstate' (quando o usuário pressiona o botão "Voltar")
    window.addEventListener("popstate", (event) => {
        if (modal.style.display === "block") {
            // Evita loop infinito
            closeModal();
        }
    });

    // Lida com o envio do formulário
    postForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const postContent = document.getElementById("postContent").value.trim();

        if (postContent) {
            // Envie o post para o backend aqui
            fetch('/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Se estiver usando tokens no header (caso contrário, remova esta linha)
                    // 'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ content: postContent }),
                // As credenciais serão enviadas automaticamente se o cookie tiver o atributo 'SameSite' adequado
                credentials: 'include' // Incluir cookies na requisição
            })
            .then(response => response.json())
            .then(data => {
                if (data.postId) {
                    // Atualiza o feed adicionando o novo post
                    // Você pode optar por buscar o post do back-end ou usar o conteúdo local
                    addPostToFeed({ post: { content: postContent } } );

                    // Limpa o campo de texto e fecha a modal
                    document.getElementById("postContent").value = "";
                    closeModal();
                    location.reload();
                } else {
                    throw new Error(data.error || 'Erro ao adicionar o post');
                }
            })
            .catch(error => {
                console.error('Erro ao salvar o post:', error);
                alert('Não foi possível adicionar o post. Tente novamente.');
            });
        }
    });


    // // Função para adicionar o post ao feed (simulação)
    // function addPostToFeed(content) {
    //     const feed = document.querySelector(".feed");

    //     // Cria os elementos do novo post
    //     const post = document.createElement("div");
    //     post.className = "post";

    //     const postHeader = document.createElement("div");
    //     postHeader.className = "post-header";

    //     const img = document.createElement("img");
    //     img.src = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
    //     img.alt = "User";
    //     img.className = "post-perfil";
    //     img.style.maxWidth = "38px";
    //     img.style.maxHeight = "38px";

    //     const postInfo = document.createElement("div");
    //     postInfo.className = "post-info";

    //     const nomeUsuario = document.createElement("span");
    //     nomeUsuario.className = "nome-usuario";
    //     nomeUsuario.textContent = "Seu Nome"; // Substitua pelo nome do usuário

    //     const handle = document.createElement("span");
    //     handle.className = "handle";
    //     handle.textContent = "@seu_handle · agora"; // Substitua pelo handle do usuário

    //     postInfo.appendChild(nomeUsuario);
    //     postInfo.appendChild(handle);

    //     postHeader.appendChild(img);
    //     postHeader.appendChild(postInfo);

    //     const postConteudo = document.createElement("div");
    //     postConteudo.className = "post-conteudo";
    //     postConteudo.textContent = content;

    //     const postInteracoes = document.createElement("div");
    //     postInteracoes.className = "post-interacoes";
    //     postInteracoes.innerHTML = `
    //         <div class="interacao">
    //             <i class="fas fa-comment"></i>
    //             <span>0</span>
    //         </div>
    //         <div class="interacao">
    //             <i class="fas fa-retweet"></i>
    //             <span>0</span>
    //         </div>
    //         <div class="interacao">
    //             <i class="fas fa-heart"></i>
    //             <span>0</span>
    //         </div>
    //         <div class="interacao">
    //             <i class="fas fa-eye"></i>
    //             <span>0</span>
    //         </div>
    //         <div class="interacao">
    //             <i class="fas fa-share"></i>
    //         </div>
    //     `;

    //     post.appendChild(postHeader);
    //     post.appendChild(postConteudo);
    //     post.appendChild(postInteracoes);

    //     // Adiciona o novo post no topo do feed
    //     feed.insertBefore(post, feed.firstChild);
    // }

    // Opcional: Abre a modal se a URL tiver um hash específico (por exemplo, #modal)
    if (window.location.hash === "#modal") {
        openModal();
    }

    // Função para carregar o feed
    function loadFeed() {
        fetch('/api/feed', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Inclui cookies na requisição
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao carregar o feed');
            }
        })
        .then(data => {
            if (data.feed) {
                renderFeed(data.feed);
            } else {
                throw new Error('Nenhum post encontrado');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o feed:', error);
            alert('Não foi possível carregar o feed. Tente novamente.');
        });
    }

    // Função para renderizar os posts no feed
    function renderFeed(posts) {
        const feed = document.querySelector(".feed");
        feed.innerHTML = ''; // Limpa o feed atual

        posts.forEach(post => {
            addPostToFeed(post);
        });
    }

    // Função para adicionar um único post ao feed
    function addPostToFeed(post) {
        const feed = document.querySelector(".feed");

        // Cria os elementos do novo post
        const postElement = document.createElement("div");
        postElement.className = "post";

        const postHeader = document.createElement("div");
        postHeader.className = "post-header";

        const img = document.createElement("img");
        img.src = post.userAvatar || "https://cdn-icons-png.flaticon.com/512/847/847969.png";
        img.alt = post.userName || "Usuário";
        img.className = "post-perfil";
        img.style.maxWidth = "38px";
        img.style.maxHeight = "38px";

        const postInfo = document.createElement("div");
        postInfo.className = "post-info";

        const nomeUsuario = document.createElement("span");
        nomeUsuario.className = "nome-usuario";
        nomeUsuario.textContent = post.username || "Usuário";

        const handle = document.createElement("span");
        handle.className = "handle";
        // Formata a data de criação do post
        const postDate = new Date(post.created_at);
        const formattedDate = formatPostDate(postDate);
        handle.textContent = `@${post.email} · ${formattedDate}`;

        postInfo.appendChild(nomeUsuario);
        postInfo.appendChild(handle);

        postHeader.appendChild(img);
        postHeader.appendChild(postInfo);

        const postConteudo = document.createElement("div");
        postConteudo.className = "post-conteudo";
        postConteudo.textContent = post.content;

        const postInteracoes = document.createElement("div");
        postInteracoes.className = "post-interacoes";
        postInteracoes.innerHTML = `
            <div class="interacao">
                <i class="fas fa-comment"></i>
                <span>${post.comments || 0}</span>
            </div>
            <div class="interacao">
                <i class="fas fa-retweet"></i>
                <span>${post.retweets || 0}</span>
            </div>
            <div class="interacao">
                <i class="fas fa-heart"></i>
                <span>${post.likes || 0}</span>
            </div>
            <div class="interacao">
                <i class="fas fa-eye"></i>
                <span>${post.views || 0}</span>
            </div>
            <div class="interacao">
                <i class="fas fa-share"></i>
            </div>
        `;

        postElement.appendChild(postHeader);
        postElement.appendChild(postConteudo);
        postElement.appendChild(postInteracoes);

        // Adiciona o novo post no final do feed
        feed.appendChild(postElement);
    }

    // Função para formatar a data do post
    function formatPostDate(date) {
        // Você pode personalizar este formato de data conforme necessário
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / 60000);

        if (diffInMinutes < 1) {
            return 'agora';
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes}m`;
        } else if (diffInMinutes < 1440) {
            const hours = Math.floor(diffInMinutes / 60);
            return `${hours}h`;
        } else {
            const days = Math.floor(diffInMinutes / 1440);
            return `${days}d`;
        }
    }

    // Carrega o feed ao carregar a página
    loadFeed();
});
