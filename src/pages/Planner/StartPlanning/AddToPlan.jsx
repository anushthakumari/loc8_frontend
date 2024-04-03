import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import { Stack, Grid, TextField } from "@mui/material";
import LocationPicker from "react-leaflet-location-picker";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddToPlan({ open, onClose }) {
	const [formState, setformState] = React.useState({});

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
			onClick: (point) =>
				console.log("I've just been clicked on the map!", point),
			onRemove: (point) =>
				console.log("I've just been clicked for removal :(", point),
		},
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
				<Box width={"60%"}>
					<form>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="location"
									required
									fullWidth
									id="location"
									label="Location"
									value={formState.location}
									onChange={handleInputChange}
									autoFocus
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
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="media_type"
									label="Media Type"
									name="media_type"
									value={formState.media_type}
									onChange={handleInputChange}
								/>
							</Grid>
							<Grid item xs={12}>
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
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									type="number"
									required
									fullWidth
									id="duration"
									label="duration"
									name="duration"
									value={formState.duration}
									onChange={handleInputChange}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									type="number"
									required
									fullWidth
									id="imp_per_month"
									label="Impressions Per Month"
									name="imp_per_month"
									value={formState.imp_per_month}
									onChange={handleInputChange}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									type="number"
									required
									fullWidth
									id="rental_per_month"
									label="Rental Per Month"
									name="rental_per_month"
									value={formState.rental_per_month}
									onChange={handleInputChange}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									type="number"
									required
									fullWidth
									id="cost_per_duration"
									label="Cost For Duration"
									name="cost_for_duration"
									value={cost_for_duration}
									onChange={handleInputChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									type="number"
									required
									fullWidth
									id="printing"
									label="Printing"
									name="printing"
									value={formState.printing}
									onChange={handleInputChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									type="number"
									required
									fullWidth
									id="mounting"
									label="mounting"
									name="mounting"
									value={formState.mounting}
									onChange={handleInputChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									value={total}
									name="total"
									label="Total"
									type="number"
									id="total"
									disabled
								/>
							</Grid>
							<Grid item xs={12}>
								<Stack direction={"row"} justifyContent={"flex-end"}>
									<Button>Save</Button>
								</Stack>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Stack>
		</Dialog>
	);
}
