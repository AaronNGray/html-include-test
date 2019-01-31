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
        console.log('DefineElement::constructor()');
    }
    connectedCallback() {
        console.log('DefineElement::connectedCallback()');

        const scripts = Array.from(this.querySelectorAll(`script`));

        console.log('DefineElement::connectedCallback::scripts = ', scripts);

        scripts.forEach(function(script) {
            document.head.appendChild(script);
        });

        //var helloworld = new HelloWorld()

        var name = this.getAttribute('name');
        var className = kebabToCamel(name);
        var classObject = null;
        try
        {
            classObject = evalInContext(className);
        }
        catch (e)
        {
            console.error("connectedCallback:evalInContext: ", e);
        }
        console.log("  Register class ", className, " as Custom Element ", name);

        window.customElements.define(name, classObject);
    }
    disconnectedCallback() {
        console.log('DefineElement::disconnectedCallback()');
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('DefineElement::attributeChangedCallback()');
    }
    static get observedAttributes() {return ['name']; }

    // Component Methods

    get name() {
      return this.getAttribute('name');
    }
};

window.customElements.define('define-element', DefineElement);
