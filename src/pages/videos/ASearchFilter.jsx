import React, { useMemo } from "react";
import DebouncedInput from "../../components/DebouncedInput";

export default function ASearchFilter({ column, table }) {
	const columnFilterValue = column.getFilterValue();
	const firstValue = table
		.getPreFilteredRowModel()
		.flatRows[0]?.getValue(column.id);

	const sortedUniqueValues = useMemo(
		() =>
			typeof firstValue === "number"
				? []
				: Array.from(column.getFacetedUniqueValues().keys()).sort(),
		[column.getFacetedUniqueValues()]
	);

	if (typeof firstValue === "number") {
		return (
			<div>
				<div className="flex space-x-2">
					<DebouncedInput
						type="number"
						min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
						max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
						value={columnFilterValue?.[0] ?? ""}
						onChange={(value) =>
							column.setFilterValue((old) => [value, old?.[1]])
						}
						placeholder={`Min ${
							column.getFacetedMinMaxValues()?.[0]
								? `(${column.getFacetedMinMaxValues()?.[0]})`
								: ""
						}`}
						className="w-24 border shadow rounded"
					/>
					<DebouncedInput
						type="number"
						min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
						max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
						value={columnFilterValue?.[1] ?? ""}
						onChange={(value) =>
							column.setFilterValue((old) => [old?.[0], value])
						}
						placeholder={`Max ${
							column.getFacetedMinMaxValues()?.[1]
								? `(${column.getFacetedMinMaxValues()?.[1]})`
								: ""
						}`}
						className="w-24 border shadow rounded"
					/>
				</div>
				<div className="h-1" />
			</div>
		);
	}

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
