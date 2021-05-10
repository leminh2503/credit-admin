// NAME
const STORE_NAME = "state";

// NETWORK
const NETWORK_CONFIG = {
    HOST: process.env.NEXT_PUBLIC_APP_URL,
    API_BASE_URL: process.env.NEXT_PUBLIC_APP_URL + "/api/v1"
};

// PATHNAME
const PATHNAME = {
    ADMIN_HOME: '/admin/home',
    USER_HOME: '/user/home',
    ADMIN_AUTH: '/admin/login',
    USER_AUTH: '/user/login',
}

// LAYOUT
const LAYOUT_CONFIG = {
    useSidebar: true,
    useNavbar: true,
    useFooter: true,
    useBottomNavigator: true,
}

export default {
    STORE_NAME,
    NETWORK_CONFIG,
    PATHNAME,
    LAYOUT_CONFIG
};
