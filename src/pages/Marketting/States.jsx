import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import AddIcon from "@mui/icons-material/Add";

const States = () => {
	const [isFormOpen, setisFormOpen] = useState(false);

	const handleFormClose = () => {
		setisFormOpen(false);
	};

	const openForm = () => {
		setisFormOpen(true);
	};

	return (
		<Box>
			<Button
				sx={{ mb: 2 }}
				onClick={openForm}
				variant="contained"
				startIcon={<AddIcon />}>
				Add State
			</Button>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>States</TableCell>
							<TableCell align="right">Zones</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.state}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell component="th" scope="row">
									{row.state}
								</TableCell>
								<TableCell align="right">{row.zone}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<AddStateForm open={isFormOpen} onClose={handleFormClose} />
		</Box>
	);
};

export default States;

function createData(state, zone) {
	return { state, zone };
}

const rows = [
	createData("Alabama", "South"),
	createData("Alaska", "West"),
	createData("Arizona", "South"),
	createData("California", "West"),
	createData("Montana", "West"),
];

function AddStateForm({ onClose, open }) {
	const handleClose = () => {
		onClose();
	};

	return (
		<React.Fragment>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="add-state-title"
				aria-describedby="add-state-description">
				<DialogTitle id="add-state-title">{"Add A State"}</DialogTitle>
				<DialogContent>
					<DialogContentText mb={2} id="add-state-description">
						Fill the form to add a state.
					</DialogContentText>

					<FormControl sx={{ mb: 2 }} size="small" fullWidth>
						<InputLabel id="zone-select-label">Select Zone</InputLabel>
						<Select labelId="zone-select-label" id="zone-select" label="Age">
							<MenuItem value={"south"}>South</MenuItem>
							<MenuItem value={"east"}>East</MenuItem>
							<MenuItem value={"west"}>West</MenuItem>
							<MenuItem value={"north"}>North</MenuItem>
						</Select>
					</FormControl>

					<TextField
						size="small"
						label="Enter State Name"
						variant="outlined"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button variant="contained" onClick={handleClose} autoFocus>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
