import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import BillboardTable from "./BillboardTable";
import VideoFileDetails from "./VideoFileDetails";

import { getProcessedOutputAPI } from "../../apis/videos.apis";

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
