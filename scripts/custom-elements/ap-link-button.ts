/// <reference path="../page-info.ts" />
/// <reference path="../page-list.ts" />

class LinkButton extends HTMLElement 
{
    static get observedAttributes() { return ['linkName', 'disabled']; }
    link: HTMLAnchorElement;
    pageInfo: PageInfo;

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
        this.pageInfo;
    }

    click()
    {
        // Only load by name when we have an internal link
        if (PageInfo.IsInternalPage(this.pageInfo))
        {
            SetHashByPageInfo(this.pageInfo);
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

    attributeChangedCallback(attrName: string, oldVal: any, newVal: any)
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
        this.pageInfo = PageInfo.GetPageInfoFromName(this.linkName);

        if (this.pageInfo != undefined)
        {
            if (this.pageInfo.external)
            {
                this.SetExternalLink(this.pageInfo.url);
            }
            else
            {
                this.SetInternalLink(this.pageInfo.url);
            }
        }
        else
        {
            this.SetExternalLink(this.linkName);
        }
    }

    SetExternalLink(url: string)
    {
        this.link.setAttribute('href', url);
        this.link.setAttribute('target', '_blank');
        this.link.setAttribute('rel', 'external');
    }

    SetInternalLink(url: string)
    {
        this.link.setAttribute('href', 'index.html#' + url);
        this.link.setAttribute('target', '_self');
        this.link.removeAttribute('rel');
    }
}

customElements.define('ap-link-button', LinkButton);