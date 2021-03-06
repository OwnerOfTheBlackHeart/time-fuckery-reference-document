/// <reference path="../page-info.ts" />
/// <reference path="../page-list.ts" />

class LinkImage extends HTMLElement 
{
    static get observedAttributes() { return ['linkName', 'disabled']; }
    image: HTMLImageElement;
    imagePageInfo: PageInfo;

    get linkName()
    {
        return this.getAttribute('linkName');
    }

    set linkName(val)
    {
        this.setAttribute('linkName', val);
    }

    get height(): number
    {
        return Number(this.getAttribute('height'));
    }

    set height(val: number)
    {
        this.setAttribute('height', val.toString());
        if (this.image)
        {
            this.image.height = val;
        }
    }

    get width(): number
    {
        return Number(this.getAttribute('width'));
    }

    set width(val: number)
    {
        this.setAttribute('width', val.toString());
        if (this.image)
        {
            this.image.width = val;
        }
    }

    constructor() 
    {
        // Always call super first in constructor
        super();

        this.image;
        this.imagePageInfo;
    }

    click()
    {
        // Make it so that it opens the image in a new tab when you click on it?
        // if (PageInfo.IsInternalPage(this.imagePageInfo))
        // {
        //     SetHashByPageInfo(this.imagePageInfo);
        // }
    }

    connectedCallback()
    {
        this.addEventListener('click', this.click);

        this.image = document.createElement('img');
        if (this.width) this.image.width = this.width;
        if (this.height) this.image.height = this.height;
        this.UpdateLink();

        this.innerHTML = "";
        this.appendChild(this.image);       
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
        this.imagePageInfo = PageInfo.GetPageInfoFromName(this.linkName);

        if (this.imagePageInfo != undefined)
        {
            this.image.src = this.imagePageInfo.url;
        }
        else
        {
            this.image.src = this.linkName;
        }
    }
}

customElements.define('ap-image', LinkImage);