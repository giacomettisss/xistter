function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeButton = document.querySelector('.theme-toggle button');
    themeButton.textContent = document.body.classList.contains('dark-theme')
      ? 'Tema Claro'
      : 'Tema Escuro';
  }
