window.addEventListener('load', load);
function load(event) {
  const game = new GameXO();
  document.addEventListener('mousedown', game.mouseDown);
  document.addEventListener('mousemove', game.mouseMove);
  document.addEventListener('mouseup', game.mouseUp);
  const button = document.getElementById('refresh');
  button.addEventListener('click', game.refresh);
}
