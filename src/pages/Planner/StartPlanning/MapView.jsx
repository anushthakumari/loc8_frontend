import React, { useRef, useState } from "react";

import { MapContainer, TileLayer, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ onClick }) => {
	const mapRef = useRef(null);
	const latitude = 51.505;
	const longitude = -0.09;

	const center = [51.505, -0.09];
	const polyline = [
		[51.505, -0.09],
		[51.51, -0.1],
		[51.51, -0.12],
	];

	const coordinates = [
		{
			from_lat: "12.92415",
			from_long: "77.67229",
			id: "132512",
			to_lat: "12.92732",
			to_long: "77.63575",
		},
		{
			from_lat: "12.96691",
			from_long: "77.74935",
			id: "132513",
			to_lat: "12.92768",
			to_long: "77.62664",
		},
	];

	const [popupPosition, setPopupPosition] = useState(null);

	const handleClick = (e) => {
		setPopupPosition(e.latlng);
	};

	return (
		<div onClick={onClick}>
			<MapContainer
				center={center}
				zoom={13}
				ref={mapRef}
				style={{ height: "50vh", width: "100%" }}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Polyline
					pathOptions={{ color: "lime" }}
					positions={polyline}
					onClick={handleClick}
				/>
				{popupPosition && (
					<Popup position={popupPosition}>
						Clicked at: ( {popupPosition.lat.toFixed(4)},{" "}
						{popupPosition.lng.toFixed(4)} )
					</Popup>
				)}
			</MapContainer>
		</div>
	);
};

export default MapView;
