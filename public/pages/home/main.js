export default () => {
  const container = document.createElement('div');
    container.className = "login-page";
    const template = `
        <div>
            <p> ISSO AQUI DEVE SER O FEED AO FAZER LOGIN </p>
        </div>
        
    `;
    container.innerHTML = template;
    return container;
}

// Aqui serão criados os eventos de Manipulação de DOM e templates
// import { greeting } from './data.js';
/*
export const home = () => {
  const container = document.createElement('div');

  container.innerHTML = `
    <form>
      <input id='name' type='text'>
      <button id='greeting-btn'>Dizer Oi</button>
    </form>
    <div id='greeting-message'></div>
  `;

  const name = container.querySelector('#name');
  const greetingBtn = container.querySelector('#greeting-btn');
  const greetingMessage = container.querySelector('#greeting-message');

  greetingBtn.addEventListener('click', (event) => {
    event.preventDefault();
    greetingMessage.innerHTML = greeting(name.value);
  });

  return container;
};
*/

// firebase
//   .auth()
//   .createUserWithEmailAndPassword(email, password)
//   .catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });