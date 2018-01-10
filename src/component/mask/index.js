/**
 * @file 遮罩层
 */
import './style.css';
class Mask {
  constructor() {
    this.height = document.body.clientHeight;
    this.width = document.body.clientWidth;
  }
  remove () {
    const mask = document.querySelector('.ysynet-mask');
    const body = document.querySelector('body');
    if (mask) {
      body.removeChild(mask);
    }
  }
  show = ({
    zIndex, callback
  }) => {
    const oldMask = document.querySelector('.ysynet-mask');
    if (oldMask) {
      return;
    }
    const body = document.querySelector('body');
    const mask = document.createElement('div');
    mask.style.width = this.width;
    mask.className = 'ysynet-mask';
    if (zIndex) {
      mask.zIndex = zIndex;
    }
    mask.onclick = () => {
      if (typeof callback === 'function' ) 
        callback();
    }
    body.appendChild(mask);
  }
}
export default new Mask();