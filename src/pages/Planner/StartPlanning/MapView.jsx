import React, { useRef } from "react";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ onClick }) => {
	const mapRef = useRef(null);
	const latitude = 51.505;
	const longitude = -0.09;

	return (
		<div onClick={onClick}>
			<MapContainer
				center={[latitude, longitude]}
				zoom={13}
				ref={mapRef}
				style={{ height: "50vh", width: "100%" }}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
		</div>
	);
};

export default MapView;
