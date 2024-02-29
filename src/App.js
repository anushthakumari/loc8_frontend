import * as React from "react";
import { RouterProvider } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import { authRouter, superAdminRouter } from "./routes";

import useAuth from "./hooks/useAuth";

export default function App() {
	const user = useAuth();

	if (!user) {
		return <RouterProvider router={authRouter} />;
	}

	return <RouterProvider router={superAdminRouter} />;
}
