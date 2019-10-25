class GameXO {
  constructor() {
    this.root = document.getElementById('gameXO');
    this.size = 3;
    this.drawGameBody();
    this.X = GameXO.createX();
    this.O = GameXO.createO();
    //-------DragDrop-----
    this.elem = null;
    this.shiftX = 0;
    this.shiftY = 0;
    this.parent = null;
  }
  /**
   * Refresh game
   */
  refresh() {
    document.querySelectorAll('.cell').forEach(e => {
      e.innerHTML = ' ';
      if (!e.classList.contains('droppable')) {
        e.classList.add('droppable');
      }
    });
    let elX = document.getElementById('x');
    if (!elX.classList.contains('draggable')) {
      elX.classList.add('draggable');
    }
    let elO = document.getElementById('o');
    if (!elO.classList.contains('draggable')) {
      elO.classList.add('draggable');
    }
    const table = document.getElementById('table-xo');
    table.style.backgroundImage = '';
    table.style.backgroundSize = '';
  }
  /**
   * looks for win
   */
  static checkWin() {
    const table = document.getElementById('table-xo');
    const s = table.textContent;
    if (
      `${s[0]}${s[1]}${s[2]}` === 'XXX' ||
      `${s[3]}${s[4]}${s[5]}` === 'XXX' ||
      `${s[6]}${s[7]}${s[8]}` === 'XXX' ||
      `${s[0]}${s[3]}${s[6]}` === 'XXX' ||
      `${s[1]}${s[4]}${s[7]}` === 'XXX' ||
      `${s[2]}${s[5]}${s[8]}` === 'XXX' ||
      `${s[0]}${s[4]}${s[8]}` === 'XXX' ||
      `${s[2]}${s[4]}${s[6]}` === 'XXX' ||
      `${s[0]}${s[1]}${s[2]}` === 'OOO' ||
      `${s[3]}${s[4]}${s[5]}` === 'OOO' ||
      `${s[6]}${s[7]}${s[8]}` === 'OOO' ||
      `${s[0]}${s[3]}${s[6]}` === 'OOO' ||
      `${s[1]}${s[4]}${s[7]}` === 'OOO' ||
      `${s[2]}${s[5]}${s[8]}` === 'OOO' ||
      `${s[0]}${s[4]}${s[8]}` === 'OOO' ||
      `${s[2]}${s[4]}${s[6]}` === 'OOO'
    ) {
      //console.log('win');
      table.style.backgroundImage = ' url("img/fireworks_green.gif")';
      table.style.backgroundSize = 'cover';
    }
  }
  /**
   * watches that only one element will be draggable
   * @param {String} str
   */
  static changeDragable(str) {
    if (str === 'x') {
      let elX = document.getElementById('x');
      elX.classList.remove('draggable');
      let el = document.getElementById('o');
      if (!el.classList.contains('draggable')) {
        el.classList.add('draggable');
      }
    } else {
      let elO = document.getElementById('o');
      elO.classList.remove('draggable');
      let el = document.getElementById('x');
      if (!el.classList.contains('draggable')) {
        el.classList.add('draggable');
      }
    }
  }
  /**
   * creates draggable element 'X'
   */
  static createX() {
    let x = document.createElement('span');
    x.className = 'draggable';
    x.id = 'x';
    x.textContent = 'X';
    //x.setAttribute('draggable', 'true');
    document.getElementById('containerX').appendChild(x);
    return x;
  }
  /**
   * creates draggable element 'O'
   */
  static createO() {
    let o = document.createElement('span');
    o.className = 'draggable';
    o.id = 'o';
    o.textContent = 'O';
    //o.setAttribute('draggable', 'true');
    document.getElementById('containerO').appendChild(o);
    return o;
  }
  /**
   * draws game field
   */
  drawGameBody() {
    this.root.innerHTML = '';
    let table = document.createElement('table');
    table.id = 'table-xo';
    for (let i = 0; i < this.size; i++) {
      let tr = document.createElement('tr');
      for (let j = 0; j < this.size; j++) {
        let td = document.createElement('td');
        td.textContent = ' ';
        td.className = 'droppable cell';
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    this.root.appendChild(table);
    let tableElem = document.createElement('table');
    tableElem.className = 'table-elem';
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.className = 'cell-elem';
    td.id = 'containerX';
    tr.appendChild(td);
    td = document.createElement('td');
    td.className = 'cell-elem';
    td.id = 'containerO';
    tr.appendChild(td);
    tableElem.appendChild(tr);
    this.root.appendChild(tableElem);
    let button = document.createElement('button');
    button.textContent = 'Refresh';
    button.id = 'refresh';
    this.root.appendChild(button);
  }
  /**
   * catches element
   * @param {Event} e
   */
  mouseDown(e) {
    e.preventDefault();
    const leftMouseButton = 1;
    // choose left mouse button
    if (e.which !== leftMouseButton) {
      return;
    }
    //look for draggable elem
    let elem = e.target.closest('.draggable');
    // not found draggable elem
    if (!elem) {
      return;
    }
    // remember draggable elem
    this.elem = elem;
    // remember parent for comeback
    this.parent = elem.parentNode;
    let coords = getCoords(elem);
    this.shiftX = e.pageX - coords.left; // - elem.getBoundingClientRect().left - pageXOffset
    this.shiftY = e.pageY - coords.top; // - elem.getBoundingClientRect().top - pageYOffset

    document.body.appendChild(elem);
    elem.style.zIndex = 9999;
    elem.style.position = 'absolute';
    this.elem.style.left = e.pageX - this.shiftX + 'px';
    this.elem.style.top = e.pageY - this.shiftY + 'px';
    this.elem.ondragstart = function() {
      return false;
    };
  }
  /**
   * moves element
   * @param {Event} e
   */
  mouseMove(e) {
    // there is not elem
    if (!this.elem) {
      return;
    }
    this.elem.style.left = e.pageX - this.shiftX + 'px';
    this.elem.style.top = e.pageY - this.shiftY + 'px';
    return false;
  }
  /**
   * appends element in game field or returns
   * @param {Event} e
   */
  mouseUp(e) {
    if (this.elem) {
      //look for droppable
      // hidden elem
      this.elem.hidden = true;
      // get droppable element under pointer
      let elem = document.elementFromPoint(event.clientX, event.clientY);
      // show elem
      this.elem.hidden = false;
      let dropElem = null;
      if (elem !== null) {
        dropElem = elem.closest('.droppable'); //found
      }
      //drop elem
      if (dropElem) {
        this.elem.id === 'x' ? GameXO.createX() : GameXO.createO();
        GameXO.changeDragable(this.elem.id);
        this.elem.classList.toggle(`${this.elem.id}`);
        this.elem.removeAttribute('id');
        dropElem.innerHTML = '';
        dropElem.appendChild(this.elem);
        this.elem.classList.toggle('draggable');
        dropElem.classList.remove('droppable');
        GameXO.checkWin();
      } else {
        this.parent.appendChild(this.elem);
      }
      this.elem.removeAttribute('style');
    }
    // default value
    this.elem = null;
    this.shiftX = 0;
    this.shiftY = 0;
    this.parent = null;
  }
}
/**
 * returns coordinates of element
 * @param {HTMLElement} elem
 */
function getCoords(elem) {
  // except IE8-
  let box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}
