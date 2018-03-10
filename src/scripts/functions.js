export const append = (elString, parent) => {
  const div = document.createElement('div');
  div.innerHTML = elString;
  document.querySelector(parent).appendChild(div.childNodes[1]);
};

export const changeTitleColor = (elem, color) => {
  const elements = document.querySelectorAll(elem);
  elements[elements.length - 1].getElementsByClassName('title')[0].style.color = color;
};

export const checkScreenSize = () => {
  if (window.innerWidth <= 576) return 's';
  else if (window.innerWidth <= 768) return 'm';
  else return 'l';
};
