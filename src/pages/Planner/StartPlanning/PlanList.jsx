import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import DeleteIcon from "@mui/icons-material/Delete";

import { formatPricing } from "../../../utils/helper.utils";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function PlanList({ open, onClose, data }) {
	const handleClose = () => {
		onClose?.();
	};

	return (
		<React.Fragment>
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
							Plan List
						</Typography>
					</Toolbar>
				</AppBar>
				<TableContainer sx={{ mt: 2 }} component={Paper}>
					<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell>Location</TableCell>
								<TableCell align="right">Illumination</TableCell>
								<TableCell align="right">Media Type</TableCell>
								<TableCell align="right">W</TableCell>
								<TableCell align="right">H</TableCell>
								<TableCell align="right">Qty</TableCell>
								<TableCell align="right">Size</TableCell>
								<TableCell align="right">Duration</TableCell>
								<TableCell align="right">Impression Per Month</TableCell>
								<TableCell align="right">Rental Per Month</TableCell>
								<TableCell align="right">Cost For Duration</TableCell>
								<TableCell align="right">Printing</TableCell>
								<TableCell align="right">Mounting</TableCell>
								<TableCell align="right">Total</TableCell>
								<TableCell align="right">Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data?.map((row) => (
								<TableRow
									key={row.plan_id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
									<TableCell component="th" scope="row">
										{row.location}
									</TableCell>
									<TableCell component="th" scope="row">
										{row.illumination}
									</TableCell>
									<TableCell align="right">{row.media_type}</TableCell>
									<TableCell align="right">{row.w}</TableCell>
									<TableCell align="right">{row.h}</TableCell>
									<TableCell align="right">{row.qty}</TableCell>
									<TableCell align="right">{row.size}</TableCell>
									<TableCell align="right">{row.duration}</TableCell>
									<TableCell align="right">{row.imp_per_month}</TableCell>
									<TableCell align="right">
										{formatPricing(row.rental_per_month)}
									</TableCell>
									<TableCell align="right">
										{formatPricing(row.cost_for_duration)}
									</TableCell>
									<TableCell align="right">
										{formatPricing(row.printing)}
									</TableCell>
									<TableCell align="right">
										{formatPricing(row.TableBodymounting)}
									</TableCell>
									<TableCell align="right">
										{formatPricing(row.total)}
									</TableCell>
									<TableCell align="right">
										<IconButton
											size="small"
											sx={{ backgroundColor: "red", borderRadius: "6px" }}>
											<DeleteIcon fontSize="12" sx={{ color: "white" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Dialog>
		</React.Fragment>
	);
}
