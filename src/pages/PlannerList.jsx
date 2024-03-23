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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Stack, CircularProgress } from "@mui/material";

import SuperAdminLayout from "../layouts/SuperAdminLayout";
import useAuth from "../hooks/useAuth";
import roles from "../constants/roles";

import {
	addUserAPI,
	getPlannersAPI,
	deleteUserAPI,
	editUserAPI,
} from "../apis/admins.apis";

import { cleanString } from "../utils/helper.utils";
import { toast } from "react-toastify";
import AreaSelector from "../components/AreaSelector";

const PlannerList = () => {
	const [isFormOpen, setisFormOpen] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [deleteLoadingState, setdeleteLoadingState] = useState({
		isLoading: false,
		user_id: null,
	});
	const [isEditing, setisEditing] = useState(false);

	const [formState, setformState] = useState({
		first_name: "",
		last_name: "",
		emp_id: "",
		email: "",
		zone_id: 0,
		state_id: 0,
		city_id: 0,
		password: "",
	});
	const {
		data,
		error,
		isLoading: fetchingPlanners,
	} = useSWR("/admins/planners", getPlannersAPI);

	const user = useAuth();

	const isSuperAdmin = user.role_id === roles.SUPERADMIN;

	const areaSelectorChange = (data) => {
		setformState((prev) => ({
			...prev,
			zone_id: data.zone.id,
			state_id: data.state.id,
			city_id: data.city.id,
		}));
	};

	const handleClose = () => {
		setisFormOpen(false);
	};

	const openForm = () => {
		setisFormOpen(true);
	};

	const handleInputChange = (e) => {
		const name = e.target.name;

		setformState((prev) => {
			return {
				...prev,
				[name]: e.target.value,
			};
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setisLoading(true);

		const d = {
			first_name: cleanString(formState.first_name),
			last_name: cleanString(formState.last_name),
			emp_id: cleanString(formState.emp_id),
			email: cleanString(formState.email),
			password: cleanString(formState.password),
			zone_id: formState.zone_id,
			state_id: formState.state_id,
			city_id: formState.city_id,
			role_id: 1,
		};

		const saveAPI = isEditing
			? editUserAPI.bind(this, formState.id)
			: addUserAPI;

		saveAPI(d)
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

	const handleEdit = (user) => {
		setisEditing(true);
		setisFormOpen(true);
		setformState({
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.user_email,
			emp_id: user.employee_id,
			zone_id: user.zone_id,
			state_id: user.state_id,
			city_id: user.city_id,
			city_name: user.city_name,
			state_name: user.state_name,
			zone_name: user.zone_name,
			id: user.id,
		});
	};

	return (
		<SuperAdminLayout activeLink="/planners">
			{fetchingPlanners ? (
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
							<TableCell>State</TableCell>
							<TableCell>City</TableCell>
							<TableCell>Created At</TableCell>
							{isSuperAdmin ? <TableCell>Created By</TableCell> : null}
							<TableCell>Delete</TableCell>
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
										<TableCell>{row.state_name}</TableCell>
										<TableCell>{row.city_name}</TableCell>
										<TableCell>{row.created_at}</TableCell>
										{isSuperAdmin ? (
											<TableCell>{row.created_by_user_email}</TableCell>
										) : null}
										<TableCell>
											<Button
												variant="contained"
												color="success"
												disableElevation
												onClick={handleEdit.bind(this, row)}
												disabled={
													deleteLoadingState.isLoading &&
													deleteLoadingState.user_id === row.id
												}>
												Edit
											</Button>
										</TableCell>
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
										name="first_name"
										required
										fullWidth
										id="first_name"
										label="Employee First Name"
										value={formState.first_name}
										onChange={handleInputChange}
										autoFocus
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="family-name"
										name="last_name"
										required
										fullWidth
										id="last_name"
										label="Employee Last Name"
										value={formState.last_name}
										onChange={handleInputChange}
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
										value={formState.emp_id}
										onChange={handleInputChange}
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
										type="email"
										autoComplete="email"
										value={formState.email}
										onChange={handleInputChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<AreaSelector
										onChange={areaSelectorChange}
										defaultZoneValue={{
											label: formState.zone_name,
											value: formState.zone_id,
											id: formState.zone_id,
										}}
										defaultStateValue={{
											label: formState.state_name,
											value: formState.state_id,
											id: formState.state_id,
										}}
										defaultCityValue={{
											label: formState.city_name,
											value: formState.city_id,
											id: formState.city_id,
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required={!isEditing}
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										value={formState.password}
										onChange={handleInputChange}
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
