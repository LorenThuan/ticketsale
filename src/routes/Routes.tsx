import ListTicket from "../pages/listticket/PageListTicket";

import Homepage from "../pages/home/Home";
import ServicePack from "../pages/servicepack/ServicePack";
import CheckTicket from "../pages/checkticket/CheckTicket";

const publicRoutes = [
  { path: "/", component: ListTicket },
  { path: "/setting", component: ServicePack },
  { path: "/check-ticket", component: CheckTicket },
  { path: "/home", component: Homepage },
];


const privateRoutes: any = [];
export { publicRoutes, privateRoutes };