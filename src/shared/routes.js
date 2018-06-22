import About from "./pages/About"
import Connect from "./pages/Connect";
import Notfound from "./pages/Notfound";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Request from "./pages/Request";

const routes = [
    {
        path:"/",
        exact: true,
        component:Main
    },
    {
        path:"/profile",
        component:Profile
    },
    {
        path:"/connect",
        component:Connect
    },
    {
        path:"/request",
        component:Request
    },
    {
        path:"/about",
        component:About
    },
    {
        path:"*",
        component: Notfound
    }
    ];
    
export default routes;