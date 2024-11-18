// other_profile_script.js

document.addEventListener("DOMContentLoaded", () => {
    // Obtém o username da URL
    const urlParts = window.location.pathname.split('/');
    const username = urlParts[urlParts.length - 1]; // Assume que a URL termina com o nome de usuário

    // Atualiza o cabeçalho do perfil com as informações do usuário
    function loadUserProfile() {
        fetch(`/api/users/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Incluir cookies, se necessário
        })
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                renderUserProfile(data.user);
            } else {
                throw new Error('Usuário não encontrado');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o perfil do usuário:', error);
            alert('Não foi possível carregar o perfil do usuário. Tente novamente.');
        });
    }

    // Função para renderizar as informações do perfil do usuário
    function renderUserProfile(user) {
        document.getElementById('profile-picture').src = user.profile_picture || 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
        document.getElementById('user-name').textContent = user.name || user.username;
        document.getElementById('user-handle').textContent = '@' + user.username;
        document.getElementById('user-bio').textContent = user.bio || '';
        document.getElementById('following-count').textContent = user.following_count || 0;
        document.getElementById('followers-count').textContent = user.followers_count || 0;
        document.getElementById('profile-username').textContent = user.name || user.username;
    }

    // Carrega os posts do usuário
    function loadUserPosts() {
        fetch(`/api/post/user/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Incluir cookies, se necessário
        })
        .then(response => response.json())
        .then(data => {
            if (data.posts) {
                renderFeed(data.posts);
            } else {
                throw new Error('Nenhum post encontrado');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os posts do usuário:', error);
            alert('Não foi possível carregar os posts do usuário. Tente novamente.');
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
        img.src = post.profile_picture || "https://cdn-icons-png.flaticon.com/512/847/847969.png";
        img.alt = post.username || "Usuário";
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
        handle.textContent = `@${post.username} · ${formattedDate}`;

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
                <span>${post.reply_count || 0}</span>
            </div>
            <div class="interacao">
                <i class="fas fa-retweet"></i>
                <span>${post.retweet_count || 0}</span>
            </div>
            <div class="interacao">
                <i class="fas fa-heart"></i>
                <span>${post.likes_count || 0}</span>
            </div>
        `;

        postElement.appendChild(postHeader);
        postElement.appendChild(postConteudo);
        postElement.appendChild(postInteracoes);

        // Adiciona o novo post ao feed
        feed.appendChild(postElement);
    }

    // Função para formatar a data do post
    function formatPostDate(date) {
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

    // Evento para o botão de seguir
    const followButton = document.getElementById('follow-button');
    followButton.addEventListener('click', () => {
        // Implementar a funcionalidade de seguir/deixar de seguir aqui
        alert('Seguir/Deixar de seguir o usuário');
    });

    // Carrega o perfil e os posts do usuário ao carregar a página
    // loadUserProfile();
    loadUserPosts();
});
