import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import AdminList from "./pages/AdminList";
import AddAdmin from "./pages/AddAdmin";
import Marketting from "./pages/Marketting";
import AddVideo from "./pages/AddVideo";
import Videos from "./pages/videos";
import PlannerList from "./pages/PlannerList";

export const authRouter = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

export const superAdminRouter = createBrowserRouter([
	{
		path: "/",
		element: <Marketting />,
	},
	{
		path: "/admins",
		element: <AdminList />,
	},
	{
		path: "/planners",
		element: <PlannerList />,
	},
	{
		path: "/add-admin",
		element: <AddAdmin />,
	},
	{
		path: "/add-video",
		element: <AddVideo />,
	},
	{
		path: "/videos",
		element: <Videos />,
	},
]);
