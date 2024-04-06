import React, { useState, useRef, useEffect, useMemo } from "react";
import useSWR from "swr";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Stack, Grid, Paper, Menu, MenuItem, IconButton } from "@mui/material";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DoneIcon from "@mui/icons-material/Done";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import SuperAdminLayout from "../../../layouts/SuperAdminLayout";
import Loader from "../../../components/Loader";
import CustomButton from "../../../components/CustomButton";
import MapView from "./MapView";
import AddToPlan from "./AddToPlan";
import PlanList from "./PlanList";

import {
	getBudgetDetailsByBudgetIdAPI,
	finishPlanAPI,
} from "../../../apis/briefs.apis";

const convertToCSV = (array = []) => {
	let csvContent = "data:text/csv;charset=utf-8,";

	const headerRow = Object.keys(array[0]).join(",");
	csvContent += headerRow + "\r\n";

	array.forEach((item) => {
		const row = Object.values(item).join(",");
		csvContent += row + "\r\n";
	});

	const encodedUri = encodeURI(csvContent);
	window.open(encodedUri);
};

const StartPlanning = () => {
	const { budget_id } = useParams();
	const [addToPlanState, setaddToPlanState] = useState({
		isOpen: false,
		video_id: null,
	});

	const [isLoaderOpen, setisLoaderOpen] = useState(false);

	const [isPlanListOpen, setIsPlanListOpen] = useState(false);
	const navigate = useNavigate();

	const {
		data = {},
		isLoading,
		error,
		mutate,
	} = useSWR(
		budget_id ? "briefs/budgets/" + budget_id : null,
		getBudgetDetailsByBudgetIdAPI.bind(this, budget_id)
	);

	const options = useMemo(() => {
		return [
			{
				label: "View Video",
				onClick: () => {
					if (data.videos) {
						window.open(
							`/videos/${data.videos[0].video_id}/all-data`,
							"_blank"
						);
					}
				},
			},
			{
				label: "View Data",
				onClick: () => {
					if (data.videos) {
						window.open(
							`/videos/${data.videos[0].video_id}/all-data`,
							"_blank"
						);
					} else {
						alert("No Videos Found");
					}
				},
			},
			{
				label: "Add To Plan",
				onClick: () => {
					if (data.videos) {
						setaddToPlanState({
							isOpen: true,
							video_id: data.videos[0].video_id,
							brief_id: data.budget?.brief_id,
							budget_id: data.budget?.budget_id,
						});
					} else {
						alert("No Videos Found");
					}
				},
			},
		];
	}, [data.videos, data.budget?.brief_id, data.budget?.budget_id]);

	const handlePlanClose = () => {
		setaddToPlanState({
			isOpen: false,
			video_id: null,
		});
		mutate();
	};

	const handleViewPlan = () => {
		setIsPlanListOpen(true);
	};

	const handlePlanListClose = () => {
		setIsPlanListOpen(false);
		mutate();
	};

	const handleDownload = () => {
		console.log(data);
		if (data.plans) {
			convertToCSV(data.plans);
		}
	};

	const handleFinishPlan = () => {
		if (!window.confirm("Are you sure?")) {
			return;
		}

		setisLoaderOpen(true);
		finishPlanAPI(data.budget.budget_id, data.budget.brief_id)
			.then((v) => {
				mutate();
				toast.success("Plan is finished!");
			})
			.catch((e) => {
				const msg = e?.response?.data?.message || "Something went wrong!";
				toast.error(msg);
			})
			.finally((v) => {
				setisLoaderOpen(false);
			});
	};

	const totalAmount = data.plans
		? data.plans.reduce((acc, obj) => {
				return parseFloat(acc) + parseFloat(obj.total);
		  }, 0)
		: 0;

	return (
		<SuperAdminLayout activeLink={"/"}>
			<Box>
				<Typography mb={2} variant={"h5"}>
					Start Planning
				</Typography>
				<Divider />
				<Stack direction={"row"} gap={3} mt={2}>
					<LabelValueDisplay label="Zone" value={data?.budget?.zone_name} />
					<LabelValueDisplay label="State" value={data?.budget?.state_name} />
					<LabelValueDisplay label="City" value={data?.budget?.city_name} />
					<LabelValueDisplay
						label="Budget"
						value={data.budget?.budget}
						isCurrency
					/>
					<CustomButton
						variant="outlined"
						onClick={handleViewPlan}
						endIcon={<KeyboardDoubleArrowRightIcon />}>
						View Plan
					</CustomButton>
					<CustomButton
						onClick={handleFinishPlan}
						endIcon={<DoneIcon />}
						disabled={data?.budget?.status === 2}>
						Finish Planning
					</CustomButton>
					<IconButton onClick={handleDownload} size="small">
						<CloudDownloadIcon color="primary" />
					</IconButton>
				</Stack>
			</Box>
			<Grid mt={2} spacing={2} container>
				<Grid md={8} item>
					<Box>
						<Paper>
							<CustomMenu menuItems={options}>
								<MapView />
							</CustomMenu>
						</Paper>
					</Box>
				</Grid>
				<Grid md={4} item>
					<Box>
						<LabelValueDisplay
							value={totalAmount}
							label="Total Plan Cost"
							isCurrency
						/>
					</Box>
				</Grid>
			</Grid>
			<Loader open={isLoading || isLoaderOpen} />
			<AddToPlan
				open={addToPlanState.isOpen}
				videoId={addToPlanState.video_id}
				briefId={addToPlanState.brief_id}
				budgetId={addToPlanState.budget_id}
				onClose={handlePlanClose}
			/>
			<PlanList
				open={isPlanListOpen}
				data={data.plans}
				onClose={handlePlanListClose}
				disableDelete={data?.budget?.status === 2}
			/>
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
			<Typography variant="body" color={"grey"}>
				{label} :{" "}
			</Typography>
			<Typography variant="body" textTransform={"capitalize"}>
				{newVal}
			</Typography>
		</Stack>
	);
}

const CustomMenu = ({ children, menuItems }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const menuRef = useRef(null);
	const [position, setPosition] = useState({ left: 0, top: 0 });

	const handleClickOutside = (event) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setAnchorEl(null);
		}
	};

	const handleContextMenu = (event) => {
		event.preventDefault();
		const { clientX, clientY } = event;
		const adjustedPosition = {
			left: clientX - menuRef.current.clientWidth / 2,
			top: clientY - (menuRef.current.clientHeight - 150),
		};
		setPosition(adjustedPosition);
		setAnchorEl(event.currentTarget);
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div onContextMenu={handleContextMenu} ref={menuRef}>
			{children}
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				style={{ top: position.top, left: position.left }}>
				{menuItems.map((item, index) => (
					<MenuItem key={index} onClick={item.onClick}>
						{item.label}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};

export default StartPlanning;
