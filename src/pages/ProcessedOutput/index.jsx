import React, { useState } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import Loader from "../../components/Loader";

import {
	getProcessedOutputAPI,
	mergeBillboardsAPI,
} from "../../apis/videos.apis";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const ProcessedOutput = () => {
	const { video_id } = useParams();

	const { data, isLoading, mutate } = useSWR("/videos/output" + video_id, () =>
		getProcessedOutputAPI(video_id)
	);

	const handleMerge = () => {
		mutate();
	};

	return (
		<SuperAdminLayout activeLink={"/add-video"}>
			{isLoading ? (
				<Typography>Loading...</Typography>
			) : !data || !data?.video_details ? (
				<center>
					<Typography>No Data Found!</Typography>
				</center>
			) : null}

			{data?.video_details ? (
				<>
					<Typography variant="h6" mb={1}>
						Video Details
					</Typography>
					<VideoFileDetails data={data.video_details} />

					<Typography my={2} variant="h6" mb={1}>
						Detected Billboards
					</Typography>
					<BillboardTable data={data.billboards} onMerge={handleMerge} />
				</>
			) : null}
		</SuperAdminLayout>
	);
};

export default ProcessedOutput;

function VideoFileDetails({ data }) {
	return (
		<TableContainer component={Paper}>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Video ID</TableCell>
						<TableCell align="right">Processed Video</TableCell>
						<TableCell align="right">Zone</TableCell>
						<TableCell align="right">State</TableCell>
						<TableCell align="right">City</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow
						key={data.video_id}
						sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
						<TableCell component="th" scope="row">
							{data.video_id}
						</TableCell>
						<TableCell align="right">{data.filename}</TableCell>
						<TableCell align="right">{data.zone_name}</TableCell>
						<TableCell align="right">{data.state_name}</TableCell>
						<TableCell align="right">{data.city_name}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}

function BillboardTable({ data, onMerge }) {
	const [selectedBills, setSelectedBills] = useState([]);
	const [isLoading, setisLoading] = useState(false);

	const isChecked = (id) => selectedBills.includes(id);

	const handleCheckboxChange = (id) => {
		if (selectedBills.includes(id)) {
			setSelectedBills((prev) => {
				return prev.filter((preId) => preId !== id);
			});

			return;
		}

		setSelectedBills((prev) => [...prev, id]);
	};

	const handleMerge = () => {
		setisLoading(true);
		mergeBillboardsAPI(selectedBills)
			.then((v) => {
				toast.success("Merge Successfull!!");
				onMerge?.();
				setSelectedBills([]);
			})
			.catch((e) => {
				console.log(e);
				toast.error("Something went wrong!");
			})
			.finally((v) => {
				setisLoading(false);
			});
	};

	return (
		<TableContainer component={Paper}>
			<Button
				variant="contained"
				size="small"
				disableElevation
				sx={{ margin: "15px" }}
				onClick={handleMerge}
				disabled={selectedBills.length < 2}>
				Merge Selected
			</Button>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell>Billboard ID</TableCell>
						<TableCell align="right">Tracker ID</TableCell>
						<TableCell align="right">Average Areas</TableCell>
						<TableCell align="right">Visibility Duration</TableCell>
						<TableCell align="right">Central Distance</TableCell>
						<TableCell align="right">Distance To Center</TableCell>
						<TableCell align="right">Confidence</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row) => (
						<TableRow
							key={row.id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
							<TableCell>
								<Checkbox
									size="small"
									onChange={handleCheckboxChange.bind(this, row.id)}
									checked={isChecked(row.id)}
								/>
							</TableCell>
							<TableCell component="th" scope="row">
								{row.id}
							</TableCell>
							<TableCell align="right">{row.tracker_id}</TableCell>
							<TableCell align="right">{row.average_areas}</TableCell>
							<TableCell align="right">{row.visibility_duration}</TableCell>
							<TableCell align="right">{row.central_distance}</TableCell>
							<TableCell align="right">{row.distance_to_center}</TableCell>
							<TableCell align="right">{row.confidence}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Loader open={isLoading} />
		</TableContainer>
	);
}
