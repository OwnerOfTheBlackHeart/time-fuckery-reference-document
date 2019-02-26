class PageInfo {
    constructor(id, url, title, name, external) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.name = name;
        this.external = external || false;
    }
    UpdateButton() {
        if ((this.id != undefined) && (this.id != "")) {
            this.button = document.getElementById(this.id);
        }
    }
    static GetPageInfoFromUri(uri) {
        return pages.find((pageInfo) => {
            return pageInfo.url === uri;
        });
    }
    static GetPageInfoFromName(name) {
        return pages.find(pageInfo => {
            return pageInfo.name === name;
        });
    }
    static IsInternalPage(pageInfo) {
        return !((pageInfo == undefined) || pageInfo.external);
    }
}
//# sourceMappingURL=page-info.js.map