function getErrorMessage(code){
    switch(code){
        case "ER_DUP_ENTRY": return "This record already exists";
        case "INV_REQ": return "Invalid HTTP request";
        default: return code;
    }
}