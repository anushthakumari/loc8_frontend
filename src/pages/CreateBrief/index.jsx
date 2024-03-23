import React, { useState } from "react";
import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import {
	FormControl,
	Paper,
	TextField,
	Grid,
	Box,
	Stack,
	InputLabel,
	FormControlLabel,
	FormLabel,
	Typography,
	Button,
	IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import AreaSelector from "../../components/AreaSelector";
import CustomButton from "../../components/CustomButton";

const defaultBudget = {
	zone: {},
	state: {},
	city: {},
	budget: 0,
	id: 1,
};

const CreateBrief = () => {
	const [budgets, setbudgets] = useState([defaultBudget]);

	const addBudget = () => {
		setbudgets((prev) => [...prev, { ...defaultBudget, id: prev.length + 1 }]);
	};

	const removeBudget = (id) => {
		setbudgets((prev) => prev.filter((v) => v.id !== id));
	};

	const handleBudgetAreaChange = (index, val) => {
		setbudgets((prev) => {
			const newData = [...prev];
			newData[index] = {
				...newData[index],
				...val,
			};
			return newData;
		});
	};

	const handleBudgetChange = (index, e) => {
		const value = e.target.value?.trim();
		setbudgets((prev) => {
			const newData = [...prev];
			newData[index] = {
				...newData[index],
				budget: value,
			};
			return newData;
		});
	};

	return (
		<SuperAdminLayout activeLink={"/create-brief"}>
			<Stack justifyContent={"center"} alignItems={"center"}>
				<Box width={"70%"}>
					<Paper>
						<form>
							<Box padding={"2rem"}>
								<Stack gap={2} justifyContent={"center"} alignItems={"center"}>
									{/* Category and Brand */}
									<Grid spacing={3} container>
										<Grid md={6} item>
											<FormControl fullWidth>
												<FormLabel htmlFor="category">Category:</FormLabel>
												<TextField size="small" id="category" required />
											</FormControl>
										</Grid>
										<Grid md={6} item>
											<FormControl fullWidth>
												<FormLabel htmlFor="brand">Brand:</FormLabel>
												<TextField size="small" id="brand" required />
											</FormControl>
										</Grid>
									</Grid>

									{/* Target Audience and Campaign Objective*/}
									<Grid spacing={3} container>
										<Grid md={6} item>
											<FormControl fullWidth>
												<FormLabel htmlFor="target-audience">
													Target Audience:
												</FormLabel>
												<TextField size="small" id="target-audience" required />
											</FormControl>
										</Grid>
										<Grid md={6} item>
											<FormControl fullWidth>
												<FormLabel htmlFor="campaign-objecttive">
													Campaign Objective:
												</FormLabel>
												<TextField
													size="small"
													id="campaign-objecttive"
													required
												/>
											</FormControl>
										</Grid>
									</Grid>
									<Box width={"100%"}>
										<Typography color={"grey"} mb={2}>
											Budget
										</Typography>
										<Box>
											{budgets.map((v, i) => {
												const budgetVal = budgets[i].budget;

												return (
													<Grid key={v.id} spacing={1} mb={3} container>
														<Grid md={8} item>
															<AreaSelector
																onChange={handleBudgetAreaChange.bind(this, i)}
																layoutDirection="row"
															/>
														</Grid>
														<Grid md={3} item>
															<TextField
																id="budget"
																label="Budget"
																size="small"
																value={budgetVal}
																type="number"
																onChange={handleBudgetChange.bind(this, i)}
																required
															/>
														</Grid>
														<Grid md={1} item>
															<IconButton
																size="small"
																sx={{ border: "1px solid grey" }}
																onClick={removeBudget.bind(this, v.id)}
																aria-label="delete">
																<RemoveIcon />
															</IconButton>
														</Grid>
													</Grid>
												);
											})}
										</Box>
										<Stack mt={2} direction={"row"} justifyContent={"flex-end"}>
											<CustomButton
												startIcon={<AddIcon />}
												size="small"
												variant="contained"
												onClick={addBudget}
												disableElevation>
												Add More Budget
											</CustomButton>
										</Stack>
									</Box>
								</Stack>
							</Box>
						</form>
					</Paper>
				</Box>
			</Stack>
		</SuperAdminLayout>
	);
};

export default CreateBrief;
