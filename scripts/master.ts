/// <reference path="./page-info.ts" />
/// <reference path="./io.ts" />

const indexPage = "home.html";
const page_area = "page_area";

const basic_title = " - Time Fuckery Reference Document";

var currentPage;
var defaultPage = "home";

function SetActiveAndLoad(url: string, title?: string)
{
	LoadPage(url, undefined, title);
}

function LoadByName(page_name: string)
{
    let found = PageInfo.GetPageInfoFromName(page_name);

    LoadByPageInfo(found);
}

function LoadByPageInfo(pageInfo: PageInfo)
{
    if (pageInfo != undefined)
    {
        let page = pageInfo.url;

        if ((page != undefined) && (page != ""))
        {
            SetActiveAndLoad(page, pageInfo.title + basic_title);
        }
    }
}

function SetHashByPageInfo(pageInfo: PageInfo)
{
    if (pageInfo != undefined)
    {
        parent.location.hash = pageInfo.url;
    }
}

function GetPageTitle(uri: string)
{
    let pageInfo = PageInfo.GetPageInfoFromUri(uri);

    if (pageInfo != undefined)
    {
        return pageInfo.title + basic_title;
    }

    return undefined;
}

window.onhashchange = function()
{
    LoadByPageInfo(Utilities.GetCurrentPageInfo());
};

// ****************** AUTH FUNCTIONS *************************
function onAuthButtonClick()
{
    let authInput = document.getElementById('auth-input') as HTMLInputElement;
    Auth.SetAuthByAccessCode(authInput.value);
    authInput.value = "";
}

function RunOnAuthChanged()
{
    Auth.currentAuth = Auth.currentAuth;
}

function OnAuthKeyDown(event: KeyboardEvent)
{
    if (event.key === "Enter")
    {
        onAuthButtonClick();
    }
}