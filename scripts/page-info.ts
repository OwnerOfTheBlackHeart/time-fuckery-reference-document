class PageInfo
{
    button: HTMLButtonElement;
    id: string;
    url: string;
    title: string;
    name: string;
    external: boolean;

    constructor(id: string, url: string, title: string, name: string, external?: boolean)
    {
        this.id = id;
        this.url = url;
        this.title = title;
        this.name = name;

        this.external = external || false;
    }

    UpdateButton()
    {
        if ((this.id != undefined) && (this.id != ""))
        {
            this.button = document.getElementById(this.id) as HTMLButtonElement;
        }
    }

    static GetPageInfoFromUri(uri: string)
    {
        return pages.find((pageInfo) => {
            return pageInfo.url === uri;
        });
    }

    static GetPageInfoFromName(name: string)
    {
        return pages.find(pageInfo => {
            return pageInfo.name === name;
        });
    }

    static IsInternalPage(pageInfo: PageInfo)
    {
        return !((pageInfo == undefined) || pageInfo.external);
    }
}