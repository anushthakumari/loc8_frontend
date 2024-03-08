import React, { useCallback, useState } from "react";
import useSWR from "swr";

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
import {
	getCitiesAPI,
	getZonesAPI,
	getStatesAPI,
} from "../../apis/location.apis";
import { addVideosAPI } from "../../apis/videos.apis";

const defaultStateOptions = [{ value: 0, label: "Please Select Zone" }];

const defaultCityOptions = [{ value: 0, label: "Please Select State" }];

function createData(videoId, filename, state, zone, city) {
	return { videoId, filename, state, zone, city };
}

const rows = [createData("12", "gh78hk7", "Alabama", "South", "Montgomery")];

export default function AddVideo() {
	const [isResultOpen, setisResultOpen] = useState(false);
	const [isUploading, setisUploading] = useState(false);
	const [selectedData, setselectedData] = useState({
		zone_id: null,
		state_id: null,
		city_id: null,
		file: null,
	});

	const citiesDataResp = useSWR(
		selectedData.state_id
			? "/location/cities?state_id=" + selectedData.state_id
			: null,
		getCitiesAPI.bind(this, selectedData.state_id)
	);

	const zoneDataResp = useSWR("/location/zones", getZonesAPI);

	const statesDataResp = useSWR(
		selectedData.zone_id
			? "/location/states?zone_id=" + selectedData.zone_id
			: null,
		getStatesAPI.bind(this, selectedData.zone_id)
	);

	const onDrop = useCallback((acceptedFiles) => {
		const file = acceptedFiles[0];

		if (!file) {
			return;
		}

		setselectedData((prev) => ({ ...prev, file }));
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		maxFiles: 1,
		accept: {
			"video/*": [".mp4"],
		},
	});

	const handleSelectChange = (key = "", d = {}) => {
		setselectedData((prev) => ({ ...prev, [key]: d[key] }));
	};

	const zoneOptions = zoneDataResp.data
		? zoneDataResp.data.map((v) => ({
				...v,
				label: v.zone_name,
				value: v.zone_id,
		  }))
		: [];

	const stateOptions = statesDataResp.data
		? statesDataResp.data.map((v) => ({
				...v,
				label: v.state_name,
				value: v.state_id,
		  }))
		: defaultStateOptions;

	const cityOptions = citiesDataResp.data
		? citiesDataResp.data.map((v) => ({
				...v,
				label: v.city_name,
				value: v.city_id,
		  }))
		: defaultCityOptions;

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		if (!selectedData.file) {
			alert("Please select a video file.");
			return;
		}

		data.append("video", selectedData.file);
		data.append("zone_id", selectedData.zone_id);
		data.append("state_id", selectedData.state_id);
		data.append("city_id", selectedData.city_id);

		setisUploading(true);

		addVideosAPI(data)
			.then((v) => {
				alert("video uploaded successfully!");
			})
			.catch((v) => {
				alert("Something went wrong!");
			})
			.finally(() => {
				setisUploading(false);
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
						<Typography component="h1" variant="h5">
							Add Video
						</Typography>
						<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<RSelect
										isLoading={zoneDataResp.isLoading}
										placeholder="Select Zone"
										options={zoneOptions}
										onChange={handleSelectChange.bind(this, "zone_id")}
										required
									/>
								</Grid>
								<Grid item xs={12}>
									<RSelect
										isLoading={statesDataResp.isLoading}
										placeholder="Select State"
										options={stateOptions}
										onChange={handleSelectChange.bind(this, "state_id")}
										required
									/>
								</Grid>
								<Grid item xs={12}>
									<RSelect
										isLoading={citiesDataResp.isLoading}
										placeholder="Select City"
										options={cityOptions}
										onChange={handleSelectChange.bind(this, "city_id")}
										required
									/>
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
												{selectedData.file
													? "Selected File: " + selectedData.file.name
													: " Drag 'n' drop video file here, or click to select video file"}
											</p>
										)}
									</div>
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								disabled={isUploading}
								sx={{ mt: 3, mb: 2 }}>
								Add
							</Button>
						</Box>
					</Box>
				</Container>
			)}
		</SuperAdminLayout>
	);
}
