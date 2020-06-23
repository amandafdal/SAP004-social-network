import routes from './routes.js';

const main = document.querySelector('#root');
const validateHash = hash => (hash === '' ? 'login' : hash.replace('#', ''));

const renderPage = () => {
  main.innerHTML = '';
  const page = validateHash(window.location.hash);
  main.appendChild(routes[page]());
};

const validateLogin = (hash) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      renderPage();
    } else if (hash === '#register') {
      window.location.hash = 'register';
    } else {
      window.location.hash = 'login';
    }
  });
};

const init = () => {
  window.addEventListener('hashchange', () => {
    renderPage();
    const hash = window.location.hash;
    validateLogin(hash);
  });
};


window.addEventListener('load', () => {
  renderPage();
  init();
});
