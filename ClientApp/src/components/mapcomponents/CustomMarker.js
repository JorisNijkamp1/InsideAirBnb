import {Marker} from "react-map-gl";
import React from "react";

const CustomMarker = ({index, marker, openPopup}) => {
    return (
        <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}>
            <div className="marker" onClick={() => openPopup(index)}>
                <span><b>{index + 1}</b></span>
            </div>
        </Marker>
    )
};

export default CustomMarker;