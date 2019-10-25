//export default
class User {
  constructor() {
    this.getNewUser();
    this.data = { img: {} };
    this.time = this.getRandome();
    this.timerId = 0;
  }
  /**
   *return random number between min and max
   * @param {Number} min
   * @param {Number} max
   */
  getRandome(min = 5, max = 30) {
    const milliseconds = 1000;
    return (min + Math.floor(Math.random() * (max - min + 1))) * milliseconds;
  }
  /** to does request and calls setUserData() */
  getNewUser() {
    this.makeRequest('https://randomuser.me/api/').then(
      data => this.setUserData(data.results[0]),
      error => console.log(error)
    );
  }
  /** to does request and calls buildMessage() */
  getNewMessage() {
    //console.log('getNewMessage()', this.data.fullName);
    this.makeRequest('http://www.randomtext.me/api/lorem/p-1/1-25')
      .then(data => this.buildMessage(data.text_out))
      .catch(error => console.log(error));
  }
  /**
   * takes promise and sets data into constructor
   * @param {Object} user
   */
  setUserData(user) {
    //console.log(user);
    this.data.fullName =
      `${user.name.last[0].toUpperCase()}${user.name.last.slice(1)} ` +
      `${user.name.first[0].toUpperCase()}${user.name.first.slice(1)}`;
    this.data.age = user.dob.age;
    this.data.phone = `${user.phone}`;
    this.data.city = `${user.location.city[0].toUpperCase()}${user.location.city.slice(1)}`;
    this.data.img.l = `${user.picture.large}`;
    this.data.img.m = `${user.picture.medium}`;
    this.data.img.s = `${user.picture.thumbnail}`;
    this.buildUser();
  }
  /**
   * takes string with DOM element and builds message of a user
   * @param {String} message
   */
  buildMessage(message) {
    //console.log(message);
    const chatCont = document.createElement('div');
    chatCont.className = 'chat-container';
    const chatLogo = document.createElement('div');
    chatLogo.className = 'chat-logo';
    const img = document.createElement('img');
    img.className = 'chat-foto';
    img.setAttribute('src', this.data.img.s);
    img.setAttribute('alt', `face ${this.data.fullName}`);
    const chatDis = document.createElement('div');
    chatDis.className = 'chat-discribe';
    const h3 = document.createElement('h3');
    //h3.style.direction = 'ltr';
    h3.textContent = `${this.data.fullName} (${this.data.age})`;
    chatLogo.appendChild(img);
    chatDis.appendChild(h3);
    chatDis.innerHTML += message;
    chatCont.appendChild(chatLogo);
    chatCont.appendChild(chatDis);
    document.querySelector('.chat').appendChild(chatCont);
    chatCont.scrollIntoView(false);
  }
  /** builds new user from data in constructor */
  buildUser() {
    //console.log(this.data);
    const userCont = document.createElement('div');
    userCont.className = 'user-container';
    const userLogo = document.createElement('div');
    userLogo.className = 'user-logo';
    const img = document.createElement('img');
    img.className = 'user-foto';
    img.setAttribute('src', this.data.img.l);
    img.setAttribute('alt', `face ${this.data.fullName}`);
    const userDis = document.createElement('div');
    userDis.className = 'user-discribe';
    const h3 = document.createElement('h3');
    h3.textContent = this.data.fullName;
    const pCity = document.createElement('p');
    pCity.textContent = `City: ${this.data.city}`;
    const pPhone = document.createElement('p');
    pPhone.textContent = `Phone: ${this.data.phone}`;
    userLogo.appendChild(img);
    userDis.appendChild(h3);
    userDis.appendChild(pCity);
    userDis.appendChild(pPhone);
    userCont.appendChild(userLogo);
    userCont.appendChild(userDis);
    document.querySelector('.users').appendChild(userCont);
    userCont.scrollIntoView(false);
    this.setWriteInterval();
  }
  /** calls getNewMessage() every this.time milliseconds and set this.timerId */
  setWriteInterval() {
    this.timerId = setInterval(() => {
      this.getNewMessage();
    }, this.time);
    //console.log('setWriteInterval()', this.timerId, this.time / '1000');
  }
  /**
   * to do request
   * @param {String} url
   * @param {String} method
   * @param {Boolean} async
   */
  makeRequest(url, method = 'GET', async = true) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.send();
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }
        if (xhr.status !== 200) {
          reject(new Error(`${xhr.status}: ${xhr.statusText}`));
        } else {
          resolve(JSON.parse(xhr.responseText));
        }
      };
    });
  }
}
