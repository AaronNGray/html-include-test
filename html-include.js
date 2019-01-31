//inlineHTMLRuntime.js
/*
using async XHR or fetch works sometimes and is different than actually inlining html
replaceWith polyfill
https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
does ${script.src} need to ne html escaped ?
*/

const typeTextHtml = `text/html`;
const map = {};
const importHTML = function (startNode) {
console.log("html-include:init");
  // convert to a frozen array
  const scripts = Array.from(startNode.querySelectorAll(`script`));

  scripts.forEach(function (script) {
    let type = script.getAttribute(`type`);
    console.log("html-include:init:script = ", script, "type = ", type);
    if (type !== typeTextHtml) {
      return;
    }
    let clone;
    if (Object.prototype.hasOwnProperty.call(map, script.src)) {
      clone = map[script.src].cloneNode(true);
      script.replaceWith(clone);
    } else {

      const xhr = new XMLHttpRequest();
      xhr.overrideMimeType("text/plain");

      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // a way to parse a html string and add it inline in the DOM
            // without container element like <div></div>
            console.log("html-include:xhr");
            const template = document.createElement('template');
            template.innerHTML = xhr.responseText;
            clone = document.importNode(template.content, true);
            importHTML(clone);
            map[script.src] = clone.cloneNode(true);
            console.log("script.replaceWith(clone);");
            script.replaceWith(clone);
          } else {
            console.error(xhr.statusText);
          }
        }
      };
      xhr.onerror = function (e) {
          console.log("html-include:error:", e);
      };
      xhr.callback = function (e) {
          console.log("html-include:callback:", e);
      };
      xhr.open('GET', script.src, true);
      xhr.send(null);
    }
  });
};

importHTML(document);
