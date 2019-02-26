const indexPage = "home.html";
const page_area = "page_area";
const basic_title = " - Time Fuckery Reference Document";
var currentPage;
var defaultPage = "home";
function SetActiveAndLoad(url, title) {
    LoadPage(url, undefined, title);
}
function LoadByName(page_name) {
    let found = PageInfo.GetPageInfoFromName(page_name);
    LoadByPageInfo(found);
}
function LoadByPageInfo(pageInfo) {
    if (pageInfo != undefined) {
        let page = pageInfo.url;
        if ((page != undefined) && (page != "")) {
            SetActiveAndLoad(page, pageInfo.title + basic_title);
        }
    }
}
function SetHashByPageInfo(pageInfo) {
    if (pageInfo != undefined) {
        parent.location.hash = pageInfo.url;
    }
}
function GetPageTitle(uri) {
    let pageInfo = PageInfo.GetPageInfoFromUri(uri);
    if (pageInfo != undefined) {
        return pageInfo.title + basic_title;
    }
    return undefined;
}
window.onhashchange = function () {
    LoadByPageInfo(Utilities.GetCurrentPageInfo());
};
function onAuthButtonClick() {
    let authInput = document.getElementById('auth-input');
    Auth.SetAuthByAccessCode(authInput.value);
    authInput.value = "";
}
function RunOnAuthChanged() {
    Auth.currentAuth = Auth.currentAuth;
}
function OnAuthKeyDown(event) {
    if (event.key === "Enter") {
        onAuthButtonClick();
    }
}
//# sourceMappingURL=master.js.map