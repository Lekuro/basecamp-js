//------------------skills------------------------------------------------
let arrProgress = document.querySelectorAll('progress');
arrProgress.forEach(el => el.addEventListener('click', changeProgress));
/**
 * cange progress when user click
 * @param {event} e
 */
function changeProgress(e) {
  const MAX_VALUE = 100;
  let mouceX = e.clientX;
  let box = e.currentTarget.getBoundingClientRect();
  let elemX = Math.round(box.left);
  let widthElem = box.width;
  let value = (mouceX - elemX) * MAX_VALUE / widthElem;
  e.currentTarget.value = value;
  e.currentTarget.parentElement.lastElementChild.value = value;
}
//-----------------interest----------------------------------------------
//simulate click on checkbox when user click on label>(input:text + checkbox)
let arrLabel = document.querySelectorAll('[name="interests"] label');
arrLabel.forEach(el => el.addEventListener('click', e => e.currentTarget.parentElement.lastElementChild.click()));
//chenge background-color when user clik on input:text
let arrInputText = document.querySelectorAll('[name="interests"] [type="text"]');
arrInputText.forEach(el => el.addEventListener('click', e => e.currentTarget.classList.toggle('checkbox_checked')));
