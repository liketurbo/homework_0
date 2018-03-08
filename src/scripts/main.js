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

const titlePicDescHalf = temp(document.getElementById('titlePicDescHalf').innerHTML);
const titlePicDescWhole = temp(document.getElementById('titlePicDescWhole').innerHTML);
const titlePic = temp(document.getElementById('titlePic').innerHTML);
const titleDesc = temp(document.getElementById('titleDesc').innerHTML);

data.forEach((elem) => {
  if (elem.size === 'l') {
    append(titlePicDescWhole(elem), '.container');
  } else if (elem.size === 'm') {
    append(titlePicDescHalf(elem), '.container');
  } else if (elem.description) {
    append(titleDesc(elem), '.container');
  } else {
    append(titlePic(elem), '.container');
  }
});
