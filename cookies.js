// Function to set a cookie with a specified name, value, and expiration in days
// Function to set a cookie with SameSite attribute to ensure compatibility with modern browsers
// Function to set a cookie with a specified name, value, and expiration in days
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    const secureFlag = location.protocol === 'https:' ? 'Secure;' : '';  // Set the Secure flag if using HTTPS
    document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax;${secureFlag}`;
}


// Function to get a cookie value by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
    }
    return null;
}

// Function to delete a cookie
function deleteCookie(name) {
    setCookie(name, "", -1);
}

// Function to get all cookies as an object
function getAllCookies() {
    const cookies = {};
    const ca = document.cookie.split(';');
    if (!ca || ca.length === 0) {
        console.warn("No cookies found");
        return cookies;
    }
    ca.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name && value) {
            cookies[name] = decodeURIComponent(value);
        }
    });
    return cookies;
}

// Function to check if a cookie exists
function checkCookieExists(cookieName) {
    return document.cookie.split(';').some(cookie => cookie.trim().startsWith(cookieName + '='));
}

// Function to get the value of a specific cookie
function getCookieValue(cookieName) {
    const cookies = getAllCookies();
    return cookies[cookieName] || null;
}

// Function to increase the value of a cookie
function increaseCookieValue(cookieName, increment) {
    let value = getCookieValue(cookieName);
    value = value ? parseInt(value, 10) : 0; // Initialize with 0 if not present
    value += increment;
    setCookie(cookieName, value, 365); // Set cookie for 1 year
}
