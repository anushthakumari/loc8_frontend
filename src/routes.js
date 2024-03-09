import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import AdminList from "./pages/AdminList";
import AddAdmin from "./pages/AddAdmin";
import Marketting from "./pages/Marketting";
import AddVideo from "./pages/AddVideo";
import ProcessedOutput from "./pages/ProcessedOutput";
import Videos from "./pages/videos";
import PlannerList from "./pages/PlannerList";
import Test from "./pages/Test";

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
		path: "/add-video/:video_id/processed-output",
		element: <ProcessedOutput />,
	},
	{
		path: "/videos",
		element: <Videos />,
	},
]);

export const adminRouter = createBrowserRouter([
	{
		path: "/",
		element: <Test />,
	},
]);

export const plannerRouter = createBrowserRouter([
	{
		path: "/",
		element: <Test />,
	},
]);
