let onAuthChangedValue: ((auth: Auth) => void)[] = [];

class Auth
{
	name: string;
	accessCode: string;
	permissions: string[];


    static get currentAuth() {
        if (localStorage.currentAuth && !(localStorage.currentAuth === 'undefined'))
        {
            return JSON.parse(localStorage.currentAuth);
        }
        else { return undefined; }
    }
    static set currentAuth(val) {
        if ((val instanceof Auth) || val === undefined) 
        { 
            localStorage.currentAuth = JSON.stringify(val); 
            Auth.onAuthChangedList.forEach(onAuthChanged => onAuthChanged(val)); 
        }
    }

    // This should be in the format of function(auth)
    static get onAuthChangedList() {
        if (onAuthChangedValue){ return onAuthChangedValue; }
        else { return []; }
    }
    static set onAuthChangedList(val) {
        onAuthChangedValue = val;
    }

    constructor(name: string, accessCode: string, permissions: string[])
    {
        this.name = name;
        this.accessCode = accessCode;
        this.permissions = permissions;
    }

    static CheckAccessLevel(permission: string)
    {
        if ((permission === "none") && !Auth.currentAuth) { return true; }
        else if (permission === "none") { return false; }
        else if (!Auth.currentAuth) { return false; }
        else if ((permission === "any") && Auth.currentAuth) { return true; }
        else 
        {
            return Auth.currentAuth.permissions.includes("all") || Auth.currentAuth.permissions.includes(permission);
        }
    }

    static SetAuthByAccessCode(accessCode: string)
    {
        if (accessCode === undefined)
        {
            Auth.currentAuth = undefined;
            return undefined;
        }

        let foundAuth = authList.find(auth => auth.accessCode === accessCode);

        if (!foundAuth) { return undefined; }

        Auth.currentAuth = foundAuth;
        return Auth.currentAuth;
    }
}

const authList = Object.freeze([
    new Auth("GM", "The Prophecy", ["all"]),
]);