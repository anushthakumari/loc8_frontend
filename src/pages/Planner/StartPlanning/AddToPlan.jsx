import * as React from "react";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import { Stack, Grid, TextField } from "@mui/material";
import LocationPicker from "react-leaflet-location-picker";

import { addPlanAPI } from "../../../apis/plans.apis";
import Loader from "../../../components/Loader";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddToPlan({
	open,
	onClose,
	briefId,
	budgetId,
	videoId,
}) {
	const [formState, setformState] = React.useState({});
	const [isLoading, setisLoading] = React.useState(false);
	const [coords, setcoords] = React.useState({ lat: 0, long: 0 });

	const handleInputChange = (e) => {
		const name = e.target.name;
		setformState((prev) => {
			return {
				...prev,
				[name]: e.target.value,
			};
		});
	};

	const handleClose = () => {
		onClose?.();
	};

	const cost_for_duration =
		formState.rental_per_month && formState.duration
			? (parseFloat(formState.rental_per_month) *
					parseFloat(formState.duration)) /
			  30
			: 0;

	const printing_count =
		!isNaN(parseFloat(formState.printing)) && !isNaN(parseFloat(formState.size))
			? parseFloat(formState.printing) + parseFloat(formState.size)
			: 0;

	const mounting_count =
		!isNaN(parseFloat(formState.mounting)) && !isNaN(parseFloat(formState.size))
			? parseFloat(formState.mounting) + parseFloat(formState.size)
			: 0;

	const total = cost_for_duration + printing_count + mounting_count;

	const pointVals = [];
	const pointMode = {
		banner: false,

		control: {
			values: pointVals,
			onClick: (point) => {
				setcoords({
					lat: point[0],
					long: point[1],
				});
			},
		},
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			media_type: formState.media_type.trim(),
			illumination: formState.illumination.trim(),
			duration: parseFloat(formState.duration),
			cost_for_duration,
			h: parseFloat(formState.h),
			imp_per_month: parseFloat(formState.imp_per_month),
			mounting: mounting_count,
			printing: printing_count,
			qty: parseInt(formState.qty),
			rental_per_month: parseFloat(formState.rental_per_month),
			size: parseInt(formState.size),
			w: parseInt(formState.w),
			brief_id: briefId,
			video_id: videoId,
			budget_id: budgetId,

			location: "test",
			latitude: coords.lat,
			longitude: coords.long,
		};

		setisLoading(true);

		addPlanAPI(data)
			.then((res) => {
				toast.success("Plan saved!");
				handleClose();
			})
			.catch((e) => {
				const msg = e?.response?.data?.message || "Something went wrong!";
				toast.error(msg);
			})
			.finally((v) => {
				setisLoading(false);
			});
	};

	return (
		<Dialog
			fullScreen
			open={open}
			onClose={handleClose}
			TransitionComponent={Transition}>
			<AppBar sx={{ position: "relative" }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}
						aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						Add To Plan
					</Typography>
				</Toolbar>
			</AppBar>
			<Stack
				mt={4}
				justifyContent={"center"}
				alignItems={"center"}
				width={"100%"}>
				<Box width={"60%"} m={3}>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="media_type"
									label="Media Type"
									name="media_type"
									value={formState.media_type}
									onChange={handleInputChange}
									InputLabelProps={{ shrink: true }}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="family-name"
									name="illumination"
									required
									fullWidth
									id="Illumination"
									value={formState.illumination}
									onChange={handleInputChange}
									label="Illumination"
									InputLabelProps={{ shrink: true }}
								/>
							</Grid>

							<Grid item xs={12}>
								<Typography variant="h6">Select Location</Typography>
								<LocationPicker pointMode={pointMode} showControls={false} />
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									type="number"
									required
									fullWidth
									id="w"
									label="W"
									name="w"
									value={formState.w}
									onChange={handleInputChange}
									InputLabelProps={{ shrink: true }}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									type="number"
									required
									fullWidth
									id="h"
									label="H"
									name="h"
									value={formState.h}
									onChange={handleInputChange}
									InputLabelProps={{ shrink: true }}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									type="number"
									required
									fullWidth
									id="qty"
									label="qty"
									name="qty"
									value={formState.qty}
									onChange={handleInputChange}
									InputLabelProps={{ shrink: true }}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									type="number"
									required
									fullWidth
									id="size"
									label="size"
									name="size"
									value={formState.size}
									onChange={handleInputChange}
									InputLabelProps={{ shrink: true }}
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<TextField
									type="number"
									required
									fullWidth
									id="duration"
									label="duration"
									name="duration"
									value={formState.duration}
									onChange={handleInputChange}
									InputLabelProps={{ shrink: true }}
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<TextField
									type="number"
									required
									fullWidth
									id="rental_per_month"
									label="Rental Per Month"
									name="rental_per_month"
									value={formState.rental_per_month}
									onChange={handleInputChange}
									InputLabelProps={{ shrink: true }}
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<TextField
									type="number"
									required
									fullWidth
									id="cost_per_duration"
									label="Cost For Duration"
									name="cost_for_duration"
									value={cost_for_duration}
									onChange={handleInputChange}
									disabled
									InputLabelProps={{ shrink: true }}
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<TextField
									type="number"
									required
									fullWidth
									id="imp_per_month"
									label="Impressions Per Month"
									name="imp_per_month"
									value={formState.imp_per_month}
									onChange={handleInputChange}
									InputLabelProps={{ shrink: true }}
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<TextField
									type="number"
									required
									fullWidth
									id="printing"
									label="Printing"
									name="printing"
									value={formState.printing}
									onChange={handleInputChange}
									InputLabelProps={{ shrink: true }}
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<TextField
									type="number"
									required
									fullWidth
									id="mounting"
									label="mounting"
									name="mounting"
									value={formState.mounting}
									onChange={handleInputChange}
									InputLabelProps={{ shrink: true }}
								/>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h6">Total</Typography>
								<TextField
									fullWidth
									value={total}
									name="total"
									type="number"
									id="total"
									disabled
								/>
							</Grid>
							<Grid item xs={12}>
								<Stack direction={"row"} justifyContent={"flex-end"}>
									<Button type="submit" variant="contained">
										Save
									</Button>
								</Stack>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Stack>
			<Loader open={isLoading} />
		</Dialog>
	);
}
