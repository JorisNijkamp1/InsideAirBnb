import React, { useEffect, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import CustomMarker from "./mapcomponents/CustomMarker";
import CustomPopup from "./mapcomponents/CustomPopup";
import {Button, Col, Row} from 'reactstrap';
import Geocoder from "react-mapbox-gl-geocoder";
import {Marker} from 'react-map-gl'

const MapView = () => {
    const [viewport, setViewport] = useState({latitude: 52.370216, longitude: 4.895168, zoom: 12});
    const [tempMarker, setTempMarker] = useState({name: null, longitude: 1, latitude: 1});
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        setViewport({
            latitude: viewport.latitude,
            longitude: viewport.longitude,
            zoom: 15
        })
    }, [])

    const mapStyle = {
        width: '100%',
        height: 800
    }

    const mapboxApiKey = 'pk.eyJ1Ijoiam5pamthbXAiLCJhIjoiY2tuc3FvcHM3MmZtNTJvcHJlaTFlczM4ZCJ9.8rfK7ZmuQEY25i1c10c3eg';

    const params = {
        country: "nl"
    }

    const onSelected = (viewport, item) => {
        setViewport(viewport);
        setTempMarker({
            name: item.place_name,
            longitude: item.center[0],
            latitude: item.center[1]
        })
    }

    const addMarker = () => {
        setMarkers(prevState => [...prevState, tempMarker]);
        setTempMarker(null);
    }

    const removeMarker = (index) => {
        setMarkers(prevState => prevState.filter((marker, i) => index !== i));
        setSelectedMarker(null)
    }
    
    const openPopup = (index) => setSelectedMarker(index);
    const closePopup = () => setSelectedMarker(null);

    return (
        <>
            <Row className="pl-4">
                <Col>
                    <h2>
                        Mapbox Tutorial
                    </h2>
                </Col>
            </Row>
            <Row className="pl-4">
                <Col xs={2}>
                    <Geocoder viewport={viewport}
                              mapboxApiAccessToken={mapboxApiKey}
                              onSelected={onSelected}
                              hideOnSelect={true}
                              value=""
                              queryParams={params}
                    />
                </Col>
                <Col>
                    <Button color="primary" onClick={() => addMarker()}>Add</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ReactMapGL
                        mapboxApiAccessToken={mapboxApiKey}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        {...viewport}
                        {...mapStyle}
                        onViewportChange={(viewport) => setViewport(viewport)}>
                        {tempMarker && (
                            <Marker
                                longitude={tempMarker.longitude}
                                latitude={tempMarker.latitude}>
                                <div className="marker temporary-marker">
                                    <span>
                                    </span>
                                </div>
                            </Marker>
                        )}
                        {markers.map((marker, index) => {
                            return (
                                <CustomMarker
                                    key={`marker-${index}`}
                                    index={index}
                                    marker={marker}
                                    openPopup={() => openPopup(index)}/>
                            )
                        })}
                        {selectedMarker !== null && (
                            <CustomPopup
                                index={selectedMarker}
                                marker={markers[selectedMarker]}
                                closePopup={() => closePopup()}
                                remove={removeMarker}
                            />
                        )}
                    </ReactMapGL>
                </Col>
            </Row>
        </>
    );
}

export default MapView;