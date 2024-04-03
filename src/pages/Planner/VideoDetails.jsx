import React from "react";

import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import VideoData from "../../components/VideoData";

const VideoDetails = () => {
	return (
		<SuperAdminLayout activeLink={"/"}>
			<VideoData disableMerge />
		</SuperAdminLayout>
	);
};

export default VideoDetails;
