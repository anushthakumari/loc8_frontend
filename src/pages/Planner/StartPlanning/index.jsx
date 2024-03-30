import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import SuperAdminLayout from "../../../layouts/SuperAdminLayout";
import Loader from "../../../components/Loader";
import MapView from "./MapView";

import { getBudgetDetailsByBudgetIdAPI } from "../../../apis/briefs.apis";
import { Stack, Grid, Paper } from "@mui/material";

const StartPlanning = () => {
	const { budget_id } = useParams();

	const {
		data = {},
		isLoading,
		error,
	} = useSWR(
		budget_id ? "briefs/budgets/" + budget_id : null,
		getBudgetDetailsByBudgetIdAPI.bind(this, budget_id)
	);

	return (
		<SuperAdminLayout activeLink={"/"}>
			<Box>
				<Typography mb={2} variant={"h5"}>
					Start Planning
				</Typography>
				<Divider />
				<Stack direction={"row"} gap={3} mt={2}>
					<LabelValueDisplay label="Zone" value={data.zone_name} />
					<LabelValueDisplay label="State" value={data.state_name} />
					<LabelValueDisplay label="City" value={data.city_name} />
					<LabelValueDisplay label="Budget" value={data.budget} isCurrency />
				</Stack>
			</Box>
			<Grid mt={8} container>
				<Grid md={8} item>
					<Box>
						<Paper>
							<MapView />
						</Paper>
					</Box>
				</Grid>
				<Grid md={4} item></Grid>
			</Grid>
			<Loader open={isLoading} />
		</SuperAdminLayout>
	);
};

function LabelValueDisplay({
	label = "",
	value = "",
	direction = "row",
	isCurrency,
	...rest
}) {
	if (!value) {
		return null;
	}

	const newVal = isCurrency
		? new Intl.NumberFormat("en-IN", {
				style: "currency",
				currency: "INR",
		  }).format(value)
		: value;

	return (
		<Stack alignItems={"center"} gap={1} direction={direction} {...rest}>
			<Typography variant="h6" color={"grey"}>
				{label} :{" "}
			</Typography>
			<Typography variant="h6" textTransform={"capitalize"}>
				{newVal}
			</Typography>
		</Stack>
	);
}

export default StartPlanning;
