class LinkButton extends HTMLElement 
{
    static get observedAttributes() { return ['linkName', 'disabled']; }

    get linkName()
    {
        return this.getAttribute('linkName');
    }

    set linkName(val)
    {
        this.setAttribute('linkName', val);
    }

    get disabled()
    {
        return this.hasAttribute('disabled');
    }

    set disabled(val)
    {
        if (val) 
        {
            this.setAttribute('disabled', '');
        }
        else
        {
            this.removeAttribute('disabled');
        }
    }

    constructor() 
    {
        // Always call super first in constructor
        super();

        this.link;
        this.buttonPageInfo;
    }

    click()
    {
        // Only load by name when we have an internal link
        if (PageInfo.IsInternalPage(this.buttonPageInfo))
        {
            SetHashByPageInfo(this.buttonPageInfo);
        }
    }

    connectedCallback()
    {
        this.addEventListener('click', this.click);
        let innerData = this.innerHTML;

        this.link = document.createElement('a');
        this.link.innerHTML = innerData;
        
        this.UpdateLink();

        this.innerHTML = "";
        this.appendChild(this.link);       
    }

    attributeChangedCallback(attrName, oldVal, newVal)
    {
        if (attrName === "linkName")
        {
            this.UpdateLink();
        }
        else if (attrName === "disabled")
        {
            // Put in disabled code here...
        }
    }

    UpdateLink()
    {
        this.buttonPageInfo = PageInfo.GetPageInfoFromName(this.linkName);

        if (this.buttonPageInfo != undefined)
        {
            if (this.buttonPageInfo.external)
            {
                this.SetExternalLink(this.buttonPageInfo.url);
            }
            else
            {
                this.SetInternalLink(this.buttonPageInfo.url);
            }
        }
        else
        {
            this.SetExternalLink(this.linkName);
        }
    }

    SetExternalLink(url)
    {
        this.link.setAttribute('href', url);
        this.link.setAttribute('target', '_blank');
        this.link.setAttribute('rel', 'external');
    }

    SetInternalLink(url)
    {
        this.link.setAttribute('href', 'index.html#' + url);
        this.link.setAttribute('target', '_self');
        this.link.removeAttribute('rel');
    }
}

customElements.define('ap-link-button', LinkButton);