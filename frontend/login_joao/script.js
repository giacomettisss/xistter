function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeButton = document.querySelector('.theme-toggle button');
    themeButton.textContent = document.body.classList.contains('dark-theme')
      ? 'Tema Claro'
      : 'Tema Escuro';
  }

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    document.querySelector('.theme-toggle button').textContent = 'Tema Claro';
  }
});

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const isDarkTheme = document.body.classList.contains('dark-theme');
  const themeButton = document.querySelector('.theme-toggle button');

  themeButton.textContent = isDarkTheme ? 'Tema Claro' : 'Tema Escuro';

  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}
