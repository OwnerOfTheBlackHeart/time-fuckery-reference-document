class AuthContainer extends HTMLElement {
    get permissions() {
        return this.getAttribute('permissions');
    }
    set permissions(val) {
        this.setAttribute('permissions', val);
    }
    constructor() {
        super();
        this.startingDisplay = this.style.display || "block";
        AuthContainers.push(this);
    }
    connectedCallback() {
        this.Render();
    }
    disconnectedCallback() {
        AuthContainers = AuthContainers.filter(container => container != this);
    }
    Render() {
        if (this.permissions) {
            if (Auth.CheckAccessLevel(this.permissions)) {
                this.style.display = this.startingDisplay;
            }
            else {
                this.style.display = 'none';
            }
        }
        else {
            this.style.display = 'none';
        }
    }
    static UpdateAll() {
        AuthContainers.forEach(container => container.Render());
    }
}
customElements.define('ap-auth-container', AuthContainer);
let AuthContainers = [];
Auth.onAuthChangedList.push(AuthContainer.UpdateAll);
//# sourceMappingURL=ap-auth-container.js.map