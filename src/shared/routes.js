import Connect from "./pages/Connect/Connect";
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
        path:"*",
        component: null
    }
    ];
    
export default routes;