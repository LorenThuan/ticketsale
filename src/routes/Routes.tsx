import ListTicket from "../pages/listticket/ListTicket";
import Home from "../pages/home/Home";

const publicRoutes = [
  { path: "/", component: ListTicket },
  { path: "/home", component: Home },
];

const privateRoutes: any = [];

export { publicRoutes, privateRoutes };