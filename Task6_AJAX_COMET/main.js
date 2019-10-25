window.addEventListener('load', load);
window.addEventListener('resize', resize);
/** adds events to buttons and change height */
function load() {
  //import User from './user';
  const hForStyles = 170;
  const users = [];
  const h = document.documentElement.clientHeight;
  const usersContainer = document.querySelector('.users');
  usersContainer.style.height = `${h - hForStyles}px`;
  const chatContainer = document.querySelector('.chat');
  chatContainer.style.height = `${h - hForStyles}px`;
  const addUser = document.querySelector('.btn-users');
  addUser.addEventListener('click', newUser);
  const forbidWrite = document.querySelector('.btn-chat');
  forbidWrite.addEventListener('click', clearTimerIdUsers);
  /** creates new user and adds to array users */
  function newUser() {
    const user = new User();
    users.push(user);
    //console.log(users);
  }
  /** clears timer id into array users */
  function clearTimerIdUsers() {
    users.forEach(el => {
      clearInterval(el.timerId);
      //console.log('clearTimerIdUsers()', el, el.timerId);
    });
  }
}
/** changes font size */
function resize() {
  const maxWidth = 960;
  const body = document.body;
  const buttons = document.querySelectorAll('button');
  if (document.documentElement.clientWidth < maxWidth) {
    body.style.fontSize = '1.4vw';
    buttons.forEach(e => {
      e.style.fontSize = '1.4vw';
    });
  }
  if (document.documentElement.clientWidth >= maxWidth) {
    body.style.fontSize = '14px';
    buttons.forEach(e => e.removeAttribute('style'));
  }
}

/* const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://randomuser.me/api/', true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) {
      return;
    }
    if (xhr.status != 200) {
      document.body.innerHTML = `<h1>${xhr.status}: ${xhr.statusText}</h1>`;
    } else {
      console.log(JSON.parse(xhr.responseText).results[0]);
      console.log(xhr.getAllResponseHeaders());
    }
  };
  const xhrT = new XMLHttpRequest();
  xhrT.open('GET', 'http://www.randomtext.me/api/lorem/p-1/1-25', true);
  xhrT.send();
  xhrT.onreadystatechange = function() {
    if (xhrT.readyState != 4) {
      return;
    }
    if (xhrT.status != 200) {
      document.body.innerHTML = `<h1>${xhrT.status}: ${xhrT.statusText}</h1>`;
    } else {
      console.log(JSON.parse(xhrT.responseText).text_out);
    }
  };*/
