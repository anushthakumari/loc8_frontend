import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import AdminList from "./pages/AdminList";
import AddAdmin from "./pages/AddAdmin";
import Marketting from "./pages/Marketting";
import AddVideo from "./pages/AddVideo";

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
		path: "/add-admin",
		element: <AddAdmin />,
	},
	{
		path: "/add-video",
		element: <AddVideo />,
	},
]);
