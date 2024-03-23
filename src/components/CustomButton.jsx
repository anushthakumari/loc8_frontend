import React from "react";
import Button from "@mui/material/Button";

export default function CustomButton(props) {
	return (
		<Button size="small" variant="contained" disableElevation {...props} />
	);
}
