# CustomElementTest
Basic test of (non ES6 module) CustomElementTest framework prototype

## Definition of Cumstom Elements
Attaching class HelloWorld to the hello-world element is done automatically by **&lt;define-element&gt;**. 

```
<define-element name="hello-world">
    <template>
        ...
    </template>
    <style>
        ...
    </style>
    <script>
        class HelloWorld extends BaseElement {
             ... // usual stuff here
        };
    </script>
</define-element>
```
**&lt;define-element&gt;**'s **DefineElement** class does kebab-case to CamelCase conversion, find the class using a guarded context eval and register the class with WebComponents proper using **window.customElements.define()**.

The **BaseElement** class takes care of rendering and is called on **connectedCallback()**
```
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
```

## Local Server
```
npm install
npm start
```

## Issues

 - DefineElement.js MUST be async but BaseElement.js must be separate and not async ! Still trying to work out whty this is.
 - Edge is giving the following error :- SCRIPT438: Object doesn't support property or method 'bind' in extended-css.js (406,1).
 - FireFox is giving a very strange error.
