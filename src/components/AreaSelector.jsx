import React, { useState } from "react";
import useSWR from "swr";

import Grid from "@mui/material/Grid";
import RSelect from "react-select";

import { getCitiesAPI, getZonesAPI, getStatesAPI } from "../apis/location.apis";

const defaultStateOptions = [{ value: 0, label: "Please Select Zone" }];

const defaultCityOptions = [{ value: 0, label: "Please Select State" }];

export default function AreaSelector({ onChange, zoneId }) {
	const [selectedData, setselectedData] = useState({
		zone: { id: null },
		state: { id: null },
		city: { id: null },
	});

	const citiesDataResp = useSWR(
		selectedData.state.id
			? "/location/cities?state_id=" + selectedData.state.id
			: null,
		getCitiesAPI.bind(this, selectedData.state_id)
	);

	const zoneDataResp = useSWR("/location/zones", getZonesAPI);

	const statesDataResp = useSWR(
		selectedData.zone.id
			? "/location/states?zone_id=" + selectedData.zone.id
			: null,
		getStatesAPI.bind(this, selectedData.zone_id)
	);

	const handleSelectChange = (key = "", d = {}) => {
		setselectedData((prev) => {
			const newData = { ...prev, [key]: d };
			onChange?.(newData);
			return newData;
		});
	};

	const zoneOptions = zoneDataResp.data
		? zoneDataResp.data.map((v) => ({
				...v,
				label: v.zone_name,
				value: v.zone_id,
				id: v.zone_id,
		  }))
		: [];

	const stateOptions = statesDataResp.data
		? statesDataResp.data.map((v) => ({
				...v,
				label: v.state_name,
				value: v.state_id,
				id: v.state_id,
		  }))
		: defaultStateOptions;

	const cityOptions = citiesDataResp.data
		? citiesDataResp.data.map((v) => ({
				...v,
				label: v.city_name,
				value: v.city_id,
				id: v.city_id,
		  }))
		: defaultCityOptions;

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<RSelect
					isLoading={zoneDataResp.isLoading}
					placeholder="Select Zone"
					options={zoneOptions}
					defaultValue={zoneId}
					onChange={handleSelectChange.bind(this, "zone")}
					required
				/>
			</Grid>
			<Grid item xs={12}>
				<RSelect
					isLoading={statesDataResp.isLoading}
					placeholder="Select State"
					options={stateOptions}
					onChange={handleSelectChange.bind(this, "state")}
					required
				/>
			</Grid>
			<Grid item xs={12}>
				<RSelect
					isLoading={citiesDataResp.isLoading}
					placeholder="Select City"
					options={cityOptions}
					onChange={handleSelectChange.bind(this, "city")}
					required
				/>
			</Grid>
		</Grid>
	);
}
