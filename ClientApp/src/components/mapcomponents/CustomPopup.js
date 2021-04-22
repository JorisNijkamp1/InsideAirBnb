import {Popup} from "react-map-gl";
import {Button} from "reactstrap";
import React from "react";

const CustomPopup = ({index, marker, closePopup, remove}) => {
    return (
        <Popup
            latitude={marker.latitude}
            longitude={marker.longitude}
            onClose={closePopup}
            closeButton={true}
            closeOnClick={false}
            offsetTop={-30}
        >
            <p>{marker.name}</p>
            <div>
                <Button color="secondary" onClick={() => remove(index)}>Remove</Button>
            </div>
        </Popup>
    )
};

export default CustomPopup;