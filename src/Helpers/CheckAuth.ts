export const checkAuth = () => {
    const token = sessionStorage.getItem('access_token');
    if(token){
        return true
    }else{
        return false
    }
}

export const getSessionToken = () => {
    return sessionStorage.getItem('access_token');
}