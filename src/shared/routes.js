import About from "./pages/About/About"
import Connect from "./pages/Connect/Connect";
import Notfound from "./pages/Notfound/Notfound";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import Request from "./components/Request";

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