import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import AdminList from "./pages/AdminList";
import Marketting from "./pages/Marketting";
import AddVideo from "./pages/AddVideo";
import ProcessedOutput from "./pages/ProcessedOutput";
import Videos from "./pages/videos";
import PlannerList from "./pages/PlannerList";
import Test from "./pages/Test";
import ControllerList from "./pages/ControllerList";

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
		path: "/controllers",
		element: <ControllerList />,
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
		path: "/add-video",
		element: <AddVideo />,
	},
	{
		path: "/add-video/:video_id/processed-output",
		element: <ProcessedOutput />,
	},
	{
		path: "/planners",
		element: <PlannerList />,
	},
	{
		path: "/",
		element: <Videos />,
	},
	{
		path: "/videos",
		element: <Videos />,
	},
]);

export const plannerRouter = createBrowserRouter([
	{
		path: "/",
		element: <Test />,
	},
]);
