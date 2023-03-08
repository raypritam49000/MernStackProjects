export function authHeader(isFile) {
    let user = JSON.parse(localStorage.getItem("userDetails"));

    if (user && user.token) {
        if (isFile != null && isFile) {
            return {
                'Authorization': `Bearer ${user.token}`
            };
        } else {
            return {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            };
        }
    } else {
        return {};
    }
}