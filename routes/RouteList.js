import Config from "../config";


// Auth routes
const authRoutes = [
    {
        path: Config.PATHNAME.ADMIN_AUTH,
        name: "AuthAdmin"
    },
    {
        path: Config.PATHNAME.USER_AUTH,
        name: "AuthUser"
    }
];

// Public routes
const publicRoutes = [
    {
        path: "/home",
        name: "Home"
    }
];

// Private Routes
const privateRoutes = [
    {
        path: "/admin/home",
        name: "AdminHome",
        role: ["admin"]
    },
    {
        path: "/admin/staff-home",
        name: "StaffHome",
        role: ["staff"]
    },
    {
        path: "/user/home",
        name: "UserHome",
        role: ["user"]
    },
    {
        path: "/user/profile",
        name: "UserProfile",
        role: ["user"]
    },
    {
        path: "/user/landing-page",
        name: "LandingPage",
        role: ["user"],
        children: [
            {
                path: "/home",
                name: "LandingPageHome",
                role: ["user"],
            }
        ]
    }
];


export default {
    authRoutes,
    publicRoutes,
    privateRoutes
};
