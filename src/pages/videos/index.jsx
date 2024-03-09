import React, { useState } from "react";
import useSWR from "swr";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { Divider, Stack, TextField } from "@mui/material";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	createColumnHelper,
} from "@tanstack/react-table";

import RSelect from "react-select";

import SuperAdminLayout from "../../layouts/SuperAdminLayout";

import { getVidoesAPI } from "../../apis/videos.apis";

const columnHelper = createColumnHelper();

const columns = [
	columnHelper.accessor("id", {
		header: "Billboard Id",
	}),
	columnHelper.accessor("video_id", {
		header: "Video Id",
	}),
	columnHelper.accessor("tracker_id", {
		header: "Tracker Id",
	}),
	columnHelper.accessor("filename", {
		header: "Video File name",
	}),
	columnHelper.accessor("zone_name", {
		header: "Zone Name",
	}),
	columnHelper.accessor("state_name", {
		header: "State Name",
	}),
	columnHelper.accessor("city_name", {
		header: "City Name",
	}),
	columnHelper.accessor("distance_to_center", {
		header: "Distance To Center",
	}),
	columnHelper.accessor("far_p_distance", {
		header: "Far P Distance",
	}),
	columnHelper.accessor("far_p_duration", {
		header: "Far P Duration",
	}),
	columnHelper.accessor("mid_p_distance", {
		header: "Mid P Distance",
	}),
	columnHelper.accessor("mid_p_duration", {
		header: "Mid P Duration",
	}),
	columnHelper.accessor("near_p_distance", {
		header: "Near P Distance",
	}),
	columnHelper.accessor("near_p_duration", {
		header: "Near P Duration",
	}),
	columnHelper.accessor("visibility_duration", {
		header: "Visibility Duration",
	}),
	columnHelper.accessor("average_areas", {
		header: "Average Areas",
	}),
	columnHelper.accessor("central_distance", {
		header: "Central Distance",
	}),
	columnHelper.accessor("central_duration", {
		header: "Central Duration",
	}),
	columnHelper.accessor("confidence", {
		header: "Confidence",
	}),
	columnHelper.accessor("created_at", {
		header: "Created At",
	}),
];

const Videos = () => {
	const { isLoading, data } = useSWR("/videos/", getVidoesAPI);
	const [columnVisibility, setColumnVisibility] = useState({
		average_areas: false,
		central_distance: false,
		central_duration: false,
		confidence: false,
		far_p_distance: false,
		far_p_duration: false,
		mid_p_distance: false,
		mid_p_duration: false,
		near_p_distance: false,
		near_p_duration: false,
		created_at: false,
	});

	const table = useReactTable({
		data,
		columns,
		state: {
			columnVisibility,
		},
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	});

	if (!data) {
		return (
			<SuperAdminLayout activeLink="/videos">
				<center>
					<h1>No Data Found</h1>
				</center>
			</SuperAdminLayout>
		);
	}

	return (
		<SuperAdminLayout activeLink="/videos">
			<Container component="div" maxWidth="xl">
				<Box>
					<Typography variant="h4" mb={2}>
						Uploaded Videos
					</Typography>
					<TableContainer component={Paper}>
						<Table
							sx={{ minWidth: 650 }}
							size="small"
							aria-label="a dense table">
							<TableHead>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<TableCell
												sx={{ fontWeight: "600" }}
												key={header.id}
												colSpan={header.colSpan}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
													  )}
											</TableCell>
										))}
									</TableRow>
								))}
							</TableHead>
							<TableBody>
								{table.getRowModel().rows.map((row) => (
									<TableRow key={row.id}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Container>
		</SuperAdminLayout>
	);
};

export default Videos;
