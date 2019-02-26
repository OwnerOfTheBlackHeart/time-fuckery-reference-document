const PageLoadCallbacks = {
    onLoad: []
};
function LoadIntoId(url, id, title) {
    id = id || "page_area";
    fetch(url).then(response => response.text()).then(html => {
        let page_area = document.getElementById(id);
        page_area.innerHTML = html;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        if (title) {
            document.title = title;
        }
        if (PageLoadCallbacks.onLoad.length > 0) {
            PageLoadCallbacks.onLoad.forEach(callback => callback(url));
        }
    });
}
function LoadPage(url, id, title) {
    parent.location.hash = url;
    LoadIntoId(url, id, title);
}
function LoadPageAtStart(id, defaultPage, GetTitle) {
    let uri = Utilities.GetCurrentPage() || defaultPage;
    LoadIntoId(uri, id, GetTitle(uri));
    return uri;
}
//# sourceMappingURL=io.js.map