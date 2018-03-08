import temp from 'lodash/template';
import tempSettings from 'lodash/templateSettings';

import data from './data';
import '../styles/main.sass';

tempSettings.interpolate = /<\$=([\s\S]+?)\$>/g;

const append = (elString, parent) => {
  const div = document.createElement('div');
  div.innerHTML = elString;
  document.querySelector(parent).appendChild(div.childNodes[1]);
};

const changeTitleColor = (elem, color) => {
  const elements = document.querySelectorAll(elem);
  elements[elements.length - 1].getElementsByClassName('title')[0].style.color = color;
};

const titlePicDescHalf = temp(document.getElementById('titlePicDescHalf').innerHTML);
const titlePicDescWhole = temp(document.getElementById('titlePicDescWhole').innerHTML);
const titlePic = temp(document.getElementById('titlePic').innerHTML);
const titleDesc = temp(document.getElementById('titleDesc').innerHTML);

data.forEach((elem) => {
  // console.log(elem.titleColor);
  if (elem.size === 'l') {
    append(titlePicDescWhole(elem), '.container');
    changeTitleColor('.titlePicDescWhole', elem.titleColor);
  } else if (elem.size === 'm') {
    append(titlePicDescHalf(elem), '.container');
    changeTitleColor('.titlePicDescHalf', elem.titleColor);
  } else if (elem.description) {
    append(titleDesc(elem), '.container');
    changeTitleColor('.titleDesc', elem.titleColor);
  } else {
    append(titlePic(elem), '.container');
    changeTitleColor('.titlePic', elem.titleColor);
  }
});
