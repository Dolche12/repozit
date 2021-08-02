'use strict'




function DomElement (selector, height, width, bg, fontSize) {
    this.selector = selector,
    this.height = height,
    this.width = width,
    this.bg = bg,
    this.fontSize = fontSize;
}

DomElement.prototype.newElem = function () {
    let elem;
    if (this.selector[0] === '.'){
        elem = document.createElement('div');
        elem.className = this.selector.slice(1);
    }
    if (this.selector[0] === '#'){
        elem = document.createElement('p');
        elem.id = this.selector.slice(1);
    }
    elem.style.cssText = `
    height: ${this.height}px;
    width: ${this.width}px;
    background: ${this.bg};
    font-size: ${this.fontSize}px;
    `;
    return elem;
};

let kok = new DomElement('.Pol', 50, 50, 'blue', 100);

//console.log(kok);


let elDiv = new DomElement('.block', 100, 400, 'green', 12);
let elParagraph = new DomElement('#best', 150, 400, 'red', 12);

document.body.appendChild(elDiv.newElem());
document.body.appendChild(elParagraph.newElem());
document.body.appendChild(kok.newElem());