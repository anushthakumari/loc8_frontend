import React, { useState } from "react";
import useSWR from "swr";

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Stack, CircularProgress } from "@mui/material";

import SuperAdminLayout from "../layouts/SuperAdminLayout";
import useAuth from "../hooks/useAuth";
import roles from "../constants/roles";

import { addUserAPI, getPlannersAPI, deleteUserAPI } from "../apis/admins.apis";
import { getZonesAPI } from "../apis/location.apis";

import { cleanString } from "../utils/helper.utils";
import { toast } from "react-toastify";

const PlannerList = () => {
	const [isFormOpen, setisFormOpen] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [deleteLoadingState, setdeleteLoadingState] = useState({
		isLoading: false,
		user_id: null,
	});

	const {
		data,
		error,
		isLoading: fetchingPlanners,
	} = useSWR("/admins/planners", getPlannersAPI);
	const zoneDataResp = useSWR("/location/zones", getZonesAPI);

	const user = useAuth();

	const isSuperAdmin = user.role_id === roles.SUPERADMIN;

	const handleClose = () => {
		setisFormOpen(false);
	};

	const openForm = () => {
		setisFormOpen(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setisLoading(true);
		const data = new FormData(e.currentTarget);

		const d = {
			first_name: cleanString(data.get("fname")),
			last_name: cleanString(data.get("lname")),
			emp_id: cleanString(data.get("emp_id")),
			email: cleanString(data.get("email")),
			password: cleanString(data.get("password")),
			zone_id: cleanString(data.get("zone_id")),
			role_id: 1,
		};

		addUserAPI(d)
			.then((res) => {
				toast.success("Planner Added!");
				handleClose();
			})
			.catch((e) => {
				if (e.response && e.response?.data?.message) {
					toast.error(e.response?.data?.message);
				} else {
					toast.error("something went wrong!");
				}
			})
			.finally((v) => {
				setisLoading(false);
			});
	};

	const handleDelete = (user_id) => {
		if (!window.confirm("Are you sure you want to delete the user?")) {
			return;
		}

		setdeleteLoadingState({
			isLoading: true,
			user_id,
		});

		deleteUserAPI(user_id)
			.then(() => {
				toast.success("User Deleted Successfully!");
			})
			.catch((e) => {
				if (e.response && e.response?.data?.message) {
					toast.error(e.response?.data?.message);
				} else {
					toast.error("something went wrong!");
				}
			})
			.finally(() => {
				setdeleteLoadingState({
					isLoading: false,
					user_id: null,
				});
			});
	};

	return (
		<SuperAdminLayout activeLink="/planners">
			{fetchingPlanners || zoneDataResp.isLoading ? (
				<center>
					<Stack direction={"row"} alignItems={"center"} gap={1}>
						<CircularProgress size={18} />
						Loading...
					</Stack>
				</center>
			) : null}
			<Stack
				direction={"row"}
				alignItems={"center"}
				justifyContent={"space-between"}
				mb={2}>
				<Typography variant="h4">Planners</Typography>
				<Button variant="contained" onClick={openForm}>
					Add Planner
				</Button>
			</Stack>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>First Name</TableCell>
							<TableCell>Last Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Zone</TableCell>
							<TableCell>Created At</TableCell>
							{isSuperAdmin ? <TableCell>Created By</TableCell> : null}
							<TableCell>Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data
							? data.map((row) => (
									<TableRow
										key={row.id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										<TableCell component="th" scope="row">
											{row.first_name}
										</TableCell>
										<TableCell>{row.last_name}</TableCell>
										<TableCell>{row.user_email}</TableCell>
										<TableCell>{row.zone_name}</TableCell>
										<TableCell>{row.created_at}</TableCell>
										{isSuperAdmin ? (
											<TableCell>{row.created_by_user_email}</TableCell>
										) : null}
										<TableCell>
											<Button
												variant="contained"
												color="error"
												disableElevation
												onClick={handleDelete.bind(this, row.id)}
												disabled={
													deleteLoadingState.isLoading &&
													deleteLoadingState.user_id === row.id
												}>
												Delete
											</Button>
										</TableCell>
									</TableRow>
							  ))
							: null}
					</TableBody>
				</Table>
			</TableContainer>
			<Dialog
				open={isFormOpen}
				onClose={handleClose}
				aria-labelledby="add-planner-title"
				aria-describedby="add-planner-description">
				<form onSubmit={handleSubmit}>
					<DialogTitle id="add-planner-title">{"Add A Planner"}</DialogTitle>
					<DialogContent component="form">
						<DialogContentText mb={2} id="add-Planner-description">
							Fill the form to add a Planner.
						</DialogContentText>

						<Box noValidate sx={{ mt: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="given-name"
										name="fname"
										required
										fullWidth
										id="fisrt_name"
										label="Employee First Name"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="family-name"
										name="lname"
										required
										fullWidth
										id="last_name"
										label="Employee Last Name"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id="emp_id"
										label="Employee ID"
										name="emp_id"
										autoComplete="family-name"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControl fullWidth required>
										<InputLabel id="zone-select-label">Select Zone</InputLabel>
										<Select
											name="zone_id"
											labelId="zone-select-label"
											id="zone-select"
											required>
											{zoneDataResp?.data
												? zoneDataResp.data.map((v) => (
														<MenuItem value={v.zone_id}>{v.zone_name}</MenuItem>
												  ))
												: null}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="new-password"
									/>
								</Grid>
							</Grid>
						</Box>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button
							variant="contained"
							disabled={isLoading}
							type="submit"
							autoFocus>
							Add
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</SuperAdminLayout>
	);
};

export default PlannerList;
