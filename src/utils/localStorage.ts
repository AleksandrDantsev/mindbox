export const LocalStorage = (action: "get" | "set", name: string, data?) => {
    let result = "";
    
    if (action === "set") {
        localStorage.setItem(name, JSON.stringify(data));
    }
    else {
        result = localStorage.getItem(name);
        if (!result) return undefined;

        return JSON.parse(result);
    }
}