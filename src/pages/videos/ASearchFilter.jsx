import React, { useMemo } from "react";
import DebouncedInput from "../../components/DebouncedInput";

export default function ASearchFilter({ column }) {
	const columnFilterValue = column.getFilterValue();

	const sortedUniqueValues = useMemo(
		() =>
			typeof firstValue === "number"
				? []
				: Array.from(column.getFacetedUniqueValues().keys()).sort(),
		[column.getFacetedUniqueValues()]
	);

	return (
		<>
			<datalist id={column.id + "list"}>
				{sortedUniqueValues.map((value) => (
					<option value={value} key={value} />
				))}
			</datalist>
			<DebouncedInput
				type="text"
				value={columnFilterValue ?? ""}
				onChange={(value) => column.setFilterValue(value)}
				label={`Search ${column.columnDef.header}`}
				className="w-36 border shadow rounded"
				inputProps={{
					list: column.id + "list",
				}}
			/>
		</>
	);
}
