const AuthDisplayBaseString = Object.freeze("Welcome ");
const AuthDisplayNoPermissionsString = Object.freeze("UNDEFINED USER");
const AuthDisplayRemovePermissionsString = Object.freeze("Deauthorize");

class AuthDisplay extends HTMLElement 
{
    constructor() 
    {
        // Always call super first in constructor
        super();
        AuthDisplayContainers.push(this);
    }

    connectedCallback()
    {
        this.Render();
    }

    disconnectedCallback()
    {
        AuthDisplayContainers = AuthDisplayContainers.filter(display => display != this);
    }

    Render() 
    {
        this.displaySpan = undefined;
        this.innerHTML = "";
        const textSpanNode = document.createElement('span');
        textSpanNode.className = "permission"
        textSpanNode.innerHTML = AuthDisplayBaseString.substr(0);
        this.appendChild(textSpanNode);
        
        const displaySpanNode = document.createElement('span');
        displaySpanNode.className = "username permission";
        this.displaySpan = displaySpanNode;
        this.appendChild(displaySpanNode);

        this.appendChild(document.createElement('br'));

        const deauthButtonNode = document.createElement('button');
        deauthButtonNode.className = "deauth-button permission"
        deauthButtonNode.innerHTML = AuthDisplayRemovePermissionsString.substr(0);
        deauthButtonNode.onclick = () => { Auth.currentAuth = undefined; }
        this.appendChild(deauthButtonNode);

        if (Auth.currentAuth)
        {
            displaySpanNode.innerHTML = Auth.currentAuth.name;
        }
        else
        {
            displaySpanNode.innerHTML = AuthDisplayNoPermissionsString.substr(0);
        }
    }

    Update()
    {
        if (this.displaySpan)
        {
            if (Auth.currentAuth)
            {
                this.displaySpan.innerHTML = Auth.currentAuth.name;
            }
            else
            {
                this.displaySpan.innerHTML = '';
            }
        }
    }

    static UpdateAll()
    {
        AuthDisplayContainers.forEach(display => display.Update());
    }
}

customElements.define('ap-auth-display', AuthDisplay);

let AuthDisplayContainers = [];
Auth.onAuthChangedList.push(AuthDisplay.UpdateAll);