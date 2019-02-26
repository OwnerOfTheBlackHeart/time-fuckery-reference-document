class LinkButton extends HTMLElement {
    static get observedAttributes() { return ['linkName', 'disabled']; }
    get linkName() {
        return this.getAttribute('linkName');
    }
    set linkName(val) {
        this.setAttribute('linkName', val);
    }
    get disabled() {
        return this.hasAttribute('disabled');
    }
    set disabled(val) {
        if (val) {
            this.setAttribute('disabled', '');
        }
        else {
            this.removeAttribute('disabled');
        }
    }
    constructor() {
        super();
        this.link;
        this.pageInfo;
    }
    click() {
        if (PageInfo.IsInternalPage(this.pageInfo)) {
            SetHashByPageInfo(this.pageInfo);
        }
    }
    connectedCallback() {
        this.addEventListener('click', this.click);
        let innerData = this.innerHTML;
        this.link = document.createElement('a');
        this.link.innerHTML = innerData;
        this.UpdateLink();
        this.innerHTML = "";
        this.appendChild(this.link);
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === "linkName") {
            this.UpdateLink();
        }
        else if (attrName === "disabled") {
        }
    }
    UpdateLink() {
        this.pageInfo = PageInfo.GetPageInfoFromName(this.linkName);
        if (this.pageInfo != undefined) {
            if (this.pageInfo.external) {
                this.SetExternalLink(this.pageInfo.url);
            }
            else {
                this.SetInternalLink(this.pageInfo.url);
            }
        }
        else {
            this.SetExternalLink(this.linkName);
        }
    }
    SetExternalLink(url) {
        this.link.setAttribute('href', url);
        this.link.setAttribute('target', '_blank');
        this.link.setAttribute('rel', 'external');
    }
    SetInternalLink(url) {
        this.link.setAttribute('href', 'index.html#' + url);
        this.link.setAttribute('target', '_self');
        this.link.removeAttribute('rel');
    }
}
customElements.define('ap-link-button', LinkButton);
//# sourceMappingURL=ap-link-button.js.map