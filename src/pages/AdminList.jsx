import React from "react";

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

import SuperAdminLayout from "../layouts/SuperAdminLayout";

function createData(firstName, lastName, email, link, createdAt) {
	return { firstName, lastName, email, link, createdAt };
}

const rows = [
	createData("John", "Doe", "johndoe@mail.com", "/admin/1", "9 Feb 2020"),
	createData(
		"Amy",
		"Santiago",
		"amysantiago@mail.com",
		"/admin/2",
		"9 Feb 2020"
	),
	createData(
		"Ryan",
		"Gosling",
		"ryangosling@mail.com",
		"/admin/3",
		"9 Feb 2020"
	),
];

const AdminList = () => {
	return (
		<SuperAdminLayout activeLink="/admins">
			<Typography variant="h4">Admins</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>First Name</TableCell>
							<TableCell>Last Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Creted At</TableCell>
							<TableCell>View Details</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.name}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell component="th" scope="row">
									{row.firstName}
								</TableCell>
								<TableCell>{row.lastName}</TableCell>
								<TableCell>{row.email}</TableCell>
								<TableCell>{row.createdAt}</TableCell>
								<TableCell>
									<Link to={row.link}>View Details</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</SuperAdminLayout>
	);
};

export default AdminList;
