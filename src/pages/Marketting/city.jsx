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

const City = () => {
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
				Add City
			</Button>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>City</TableCell>
							<TableCell align="right">State</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.city}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell>{row.city}</TableCell>
								<TableCell align="right" component="th" scope="row">
									{row.state}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<AddStateForm open={isFormOpen} onClose={handleFormClose} />
		</Box>
	);
};

export default City;

function createData(state, city) {
	return { state, city };
}

const rows = [
	createData("Alabama", "Montgomery"),
	createData("Alabama", "Huntsville"),
	createData("Alabama", "Birmingham"),
	createData("Alabama", "Mobile"),
	createData("Alabama", "Tuscaloosa"),
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
				aria-labelledby="add-city-title"
				aria-describedby="add-city-description">
				<DialogTitle id="add-city-title">{"Add A City"}</DialogTitle>
				<DialogContent>
					<DialogContentText mb={2} id="add-city-description">
						Fill the form to add a city.
					</DialogContentText>

					<FormControl sx={{ mb: 2 }} size="small" fullWidth>
						<InputLabel id="zone-select-label">Select State</InputLabel>
						<Select labelId="zone-select-label" id="zone-select" label="Age">
							<MenuItem value={"Alabama"}>Alabama</MenuItem>
						</Select>
					</FormControl>

					<TextField
						size="small"
						label="Enter City Name"
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
