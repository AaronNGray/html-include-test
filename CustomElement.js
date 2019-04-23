function kebabToCamel(name) {
    name = name.replace(/(\-\w)/g, function(m) { return m[1].toUpperCase(); });
    return name.charAt(0).toUpperCase() + name.slice(1)
}
function evalInContext(js, context) {
    context = context || {};
    return function() { return eval(js); }.call(context);
}

class DefineElement extends HTMLElement {

    // Web Component Methods

    constructor() {
        super();
    }
    connectedCallback() {
        var name = this.getAttribute('name');
        var className = kebabToCamel(name);
        var classObject = null;
        try {
            classObject = evalInContext(className);
        }
        catch (e) {
            console.error("connectedCallback:evalInContext: ", e);
        }

        window.customElements.define(name, classObject);
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
    static get observedAttributes() {return ['name']; }

    // Component Methods

    get name() {
      return this.getAttribute('name');
    }
};

document.addEventListener("HTMLIncludesLoaded", function(event) {
    window.customElements.define('define-element', DefineElement);
});

class BaseElement extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
    static get observedAttributes() {return []; }

    //

    render(element, template) {
        if (arguments.length < 2) {
            template = element;
            element = this;
        }

        template = template || "template";
        template = (typeof template === "string") ? document.querySelector(template) : template;

        var shadow = element.attachShadow({mode: 'open'});
        var clone = document.importNode(template.content, true);
        shadow.appendChild(clone);
    }
}
