import React, { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import RSelect from "react-select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDropzone } from "react-dropzone";

import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import { blue } from "@mui/material/colors";

const zoneOptions = [
	{ value: "north", label: "North" },
	{ value: "east", label: "East" },
	{ value: "west", label: "West" },
	{ value: "south", label: "South" },
	{value: "north-east", label: "North East"}
];

const stateOptions = [
	{ value: "Alabama", label: "Alabama" },
	{ value: "Alaska", label: "Alaska" },
	{ value: "Arizona", label: "Arizona" },
	{ value: "California", label: "California" },
];

const cityOptions = [{ value: "Alabama", label: "Alabama" }];

function createData(videoId, filename, state, zone, city) {
	return { videoId, filename, state, zone, city };
}

const rows = [createData("12", "gh78hk7", "Alabama", "South", "Montgomery")];

export default function AddVideo() {
	const [isResultOpen, setisResultOpen] = useState(false);

	const onDrop = useCallback((acceptedFiles) => {
		// Do something with the files
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"video/*": [".mp4"],
		},
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
	};

	return (
		<SuperAdminLayout activeLink="/add-video">
			{isResultOpen ? (
				<Container component="div" maxWidth="md">
					<Box>
						<Typography variant="h5">Processed Result</Typography>
						<TableContainer component={Paper}>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Video Id</TableCell>
										<TableCell>Filename</TableCell>
										<TableCell align="right">Zone</TableCell>
										<TableCell align="right">State</TableCell>
										<TableCell align="right">City</TableCell>
										<TableCell align="right">Delete</TableCell>
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
												{row.videoId}
											</TableCell>
											<TableCell>{row.filename}</TableCell>
											<TableCell align="right">{row.zone}</TableCell>
											<TableCell align="right">{row.state}</TableCell>
											<TableCell align="right">{row.city}</TableCell>
											<TableCell align="right">
												<Button>Delete</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</Container>
			) : (
				<Container component="main" maxWidth="xs">
					<Box
						sx={{
							marginTop: 8,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}>
						{/* <Typography component="h1" variant="h5">
							Add Video
						</Typography> */}
						<Box
							component="form"
							noValidate
							onSubmit={handleSubmit}
							sx={{ mt: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<RSelect placeholder="Select Zone" options={zoneOptions} />
								</Grid>
								<Grid item xs={12}>
									<RSelect placeholder="Select State" options={stateOptions} />
								</Grid>
								<Grid item xs={12}>
									<RSelect placeholder="Select City" options={cityOptions} />
								</Grid>
								<Grid item xs={12}>
									<div
										style={{
											border: "1px dashed #333",
											padding: "20px",
											borderRadius: "15px",
										}}
										{...getRootProps()}>
										<input {...getInputProps()} />
										{isDragActive ? (
											<p>Drop the files here ...</p>
										) : (
											<p>
												Drag 'n' drop video file here, or click to select video
												file
											</p>
										)}
									</div>
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								onClick={() => setisResultOpen(true)}
								sx={{ mt: 3, mb: 2}}>
								Add
							</Button>
						</Box>
					</Box>
				</Container>
			)}
		</SuperAdminLayout>
	);
}
