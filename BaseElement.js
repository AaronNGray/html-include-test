class BaseElement extends HTMLElement {
    constructor() {
        super();
        console.log('BaseElement::constructor()');
    }
    connectedCallback() {
        console.log('BaseElement::connectedCallback()');
        this.render();
    }
    disconnectedCallback() {
        console.log('BaseElement::disconnectedCallback()');
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('BaseElement::attributeChangedCallback()');
    }

    static get observedAttributes() {return []; }

    //

    render(element, template) {
        console.log('BaseElement::render()');
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
