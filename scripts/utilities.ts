/// <reference path="./page-info.ts" />

var Utilities =
{
    IsGoodString: function(str: string)
    {
        return (str != undefined) && (str != "");
    },

    CreateHeader: function(data: string, className?: string)
    {
        let header = document.createElement('th');
        header.innerHTML = data;

        if (Utilities.IsGoodString(className))
        {
            header.className = className;
        }

        return header;
    },

    CreateData: function(data: string, className?: string)
    {
        let dataElement = document.createElement('td');
        dataElement.innerHTML = data;

        if (Utilities.IsGoodString(className))
        {
            dataElement.className = className;
        }

        return dataElement;
    },

    GetCurrentPage: function()
    {
        let uri = parent.location.hash;
        if (Utilities.IsGoodString(uri))
        {
            uri = uri.slice(1);
        }
        return uri;
    },

    GetCurrentPageInfo: function()
    {
        return PageInfo.GetPageInfoFromUri(Utilities.GetCurrentPage());
    },

    StringToObject: function(jsonIn: string)
    {
        jsonIn = jsonIn.replace(/<.+?>/g, function(x) {
            return x.replace(/"/g, '\\"');
        });
        return JSON.parse(jsonIn);;
    }
}