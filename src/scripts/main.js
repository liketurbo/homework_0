import temp from 'lodash/template';
import tempSettings from 'lodash/templateSettings';

import { append, changeTitleColor, checkScreenSize } from './functions';
import data from './data';
import '../styles/main.sass';

tempSettings.interpolate = /<\$=([\s\S]+?)\$>/g;
let size = checkScreenSize();

const logo = temp(document.getElementById('logo').innerHTML);

if (size === 'l') {
  append(logo({ image: 'img/zen_logo@3x.png' }), '.header');
} else {
  append(logo({ image: 'img/zen_logo@2x.png' }), '.header');
}

const titlePicDescHalf = temp(document.getElementById('titlePicDescHalf').innerHTML);
const titlePicDescWhole = temp(document.getElementById('titlePicDescWhole').innerHTML);
const titlePic = temp(document.getElementById('titlePic').innerHTML);
const titleDesc = temp(document.getElementById('titleDesc').innerHTML);

const renderHTML = () => {
  size = checkScreenSize();
  document.querySelector('.container').innerHTML = '';

  data.forEach((elem) => {
    const regExp = /(.+?)(\.[^.]*$|$)/g;
    const arr = regExp.exec(elem.image);

    let image = '';
    if (size === 'l') {
      image = `${arr[1]}@3x${arr[2]}`;
    } else if (size === 'm') {
      image = `${arr[1]}@2x${arr[2]}`;
    } else {
      image = `${arr[0]}`;
    }

    if (elem.size === 'l') {
      if (size === 's' || size === 'm') {
        append(titlePicDescHalf({ ...elem, image }), '.container');
        changeTitleColor('.titlePicDescHalf', elem.titleColor);
      } else {
        append(titlePicDescWhole(elem), '.container');
        changeTitleColor('.titlePicDescWhole', elem.titleColor);
      }
    } else if (elem.size === 'm') {
      append(titlePicDescHalf({ ...elem, image }), '.container');
      changeTitleColor('.titlePicDescHalf', elem.titleColor);
    } else if (elem.description) {
      append(titleDesc(elem), '.container');
      changeTitleColor('.titleDesc', elem.titleColor);
    } else {
      append(titlePic({ ...elem, image }), '.container');
      changeTitleColor('.titlePic', elem.titleColor);
    }
  });
};

renderHTML();
window.addEventListener('orientationchange', () => renderHTML());
window.addEventListener('resize', () => renderHTML());
