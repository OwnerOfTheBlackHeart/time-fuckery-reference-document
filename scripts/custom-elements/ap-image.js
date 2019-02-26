class LinkImage extends HTMLElement {
    static get observedAttributes() { return ['linkName', 'disabled']; }
    get linkName() {
        return this.getAttribute('linkName');
    }
    set linkName(val) {
        this.setAttribute('linkName', val);
    }
    get height() {
        return Number(this.getAttribute('height'));
    }
    set height(val) {
        this.setAttribute('height', val.toString());
        if (this.image) {
            this.image.height = val;
        }
    }
    get width() {
        return Number(this.getAttribute('width'));
    }
    set width(val) {
        this.setAttribute('width', val.toString());
        if (this.image) {
            this.image.width = val;
        }
    }
    constructor() {
        super();
        this.image;
        this.imagePageInfo;
    }
    click() {
    }
    connectedCallback() {
        this.addEventListener('click', this.click);
        this.image = document.createElement('img');
        if (this.width)
            this.image.width = this.width;
        if (this.height)
            this.image.height = this.height;
        this.UpdateLink();
        this.innerHTML = "";
        this.appendChild(this.image);
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === "linkName") {
            this.UpdateLink();
        }
        else if (attrName === "disabled") {
        }
    }
    UpdateLink() {
        this.imagePageInfo = PageInfo.GetPageInfoFromName(this.linkName);
        if (this.imagePageInfo != undefined) {
            this.image.src = this.imagePageInfo.url;
        }
        else {
            this.image.src = this.linkName;
        }
    }
}
customElements.define('ap-image', LinkImage);
//# sourceMappingURL=ap-image.js.map