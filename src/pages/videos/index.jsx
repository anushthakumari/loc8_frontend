import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

import RSelect from "react-select";

import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import { Divider, Stack, TextField } from "@mui/material";

const zoneOptions = [
	{ value: "north", label: "North" },
	{ value: "east", label: "East" },
	{ value: "west", label: "West" },
	{ value: "south", label: "South" },
];

const stateOptions = [
	{ value: "Alabama", label: "Alabama" },
	{ value: "Alaska", label: "Alaska" },
	{ value: "Arizona", label: "Arizona" },
	{ value: "California", label: "California" },
];

const cityOptions = [{ value: "Alabama", label: "Alabama" }];

const Videos = () => {
	return (
		<SuperAdminLayout activeLink="/videos">
			<Container component="div" maxWidth="xl">
				<Box>
					<Typography variant="h4" mb={2}>
						Uploaded Videos
					</Typography>
					<TableContainer
						component={Paper}
						sx={{
							padding: "12px",
						}}>
						<Stack direction={"row"} justifyContent={"space-between"}>
							<Stack mb={3} direction={"row"} gap={2}>
								<RSelect placeholder="Filter By Zone" options={zoneOptions} />
								<RSelect placeholder="Filter By State" options={stateOptions} />
								<RSelect placeholder="Filter By City" options={cityOptions} />
							</Stack>
							<Stack mb={3} direction={"row"} gap={2}>
								<TextField placeholder="Search Filename here.." size="small" />
							</Stack>
						</Stack>

						<Divider />

						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Select</TableCell>
									<TableCell>Video Id</TableCell>
									<TableCell>Filename</TableCell>
									<TableCell align="right">Zone</TableCell>
									<TableCell align="right">State</TableCell>
									<TableCell align="right">City</TableCell>
									<TableCell align="right">Delete</TableCell>
									<TableCell align="right">View Details</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow
										key={row.videoId}
										sx={{
											"&:last-child td, &:last-child th": { border: 0 },
										}}>
										<TableCell component="th" scope="row">
											<Checkbox />
										</TableCell>
										<TableCell component="th" scope="row">
											{row.videoId}
										</TableCell>
										<TableCell>{row.filename}</TableCell>
										<TableCell align="right">{row.zone}</TableCell>
										<TableCell align="right">{row.state}</TableCell>
										<TableCell align="right">{row.city}</TableCell>
										<TableCell align="right">
											<Button>Delete</Button>
										</TableCell>
										<TableCell align="right">
											<a href="#test">View Details</a>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Container>
		</SuperAdminLayout>
	);
};

export default Videos;

function createData(videoId, filename, state, zone, city) {
	return { videoId, filename, state, zone, city };
}

const rows = [
	createData("12", "gh78hk7", "Alabama", "South", "Montgomery"),
	createData("13", "gh78hk7", "Alabama", "South", "Montgomery"),
];
