import React, {useEffect, useState} from 'react';
import CustomMarker from "./mapcomponents/CustomMarker";
import CustomPopup from "./mapcomponents/CustomPopup";
import {Button, Col, Row} from 'reactstrap';
import Geocoder from "react-mapbox-gl-geocoder";
import ReactMapGL, {Layer, Marker, Source} from 'react-map-gl';
import GeoData from '../GeoTestData/airbnblocations.json';
import {GetLocationsAction} from "../actions/MapActions";
import {connect} from "react-redux";

const MapViewComponent = (props) => {
    const [viewport, setViewport] = useState({latitude: 52.370216, longitude: 4.895168, zoom: 12});
    const [tempMarker, setTempMarker] = useState({name: null, longitude: 1, latitude: 1});
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [markers, setMarkers] = useState([]);

    const mapboxApiKey = 'pk.eyJ1Ijoiam5pamthbXAiLCJhIjoiY2tuc3FvcHM3MmZtNTJvcHJlaTFlczM4ZCJ9.8rfK7ZmuQEY25i1c10c3eg';

    useEffect(() => {
        props.getLocations();

        setViewport({
            latitude: viewport.latitude,
            longitude: viewport.longitude,
            zoom: 12
        })
    }, [])

    const mapStyle = {
        width: '100%',
        height: 800
    }

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
                <Col xs={12}>
                    <h2>
                        Map of Amsterdam!
                    </h2>
                </Col>
            </Row>
            <Row className="pl-4">
                <Col xs={2}>
                    <Geocoder viewport={viewport}
                              mapboxApiAccessToken={mapboxApiKey}
                              onSelected={onSelected}
                              hideOnSelect={true}
                              value=''
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

                        <Source
                            id="Source-data"
                            type="geojson"
                            data={props.locations}
                            cluster={true}
                            clusterMaxZoom={15}
                            clusterRadius={50}
                        >
                            <Layer
                                type="circle"
                                id="cluster"
                                source="source_id"
                                paint={{
                                    'circle-color': {
                                        property: 'point_count',
                                        type: 'interval',
                                        stops: [[0, '#ec5242'], [100, '#3fb211'], [750, '#FADA5E ']]
                                    },
                                    'circle-radius': {
                                        property: 'point_count',
                                        type: 'interval',
                                        stops: [[0, 10], [90, 20], [650, 30]]
                                    }
                                }}
                                filter={['has', 'point_count']}
                            />
                            <Layer
                                id="unclustered-point"
                                type="circle"
                                source="source_id"
                                filter={['!has', 'point_count']}
                                paint={{
                                    'circle-color': '#1396d9',
                                    'circle-radius': 8,
                                    'circle-stroke-width': 2,
                                    'circle-stroke-color': '#fff'
                                }}
                            />
                            <Layer
                                id="cluster-count"
                                type="symbol"
                                source="source_id"
                                filter={['has', 'point_count']}
                                layout={{
                                    'text-field': '{point_count_abbreviated}',
                                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                                    'text-size': 12
                                }}
                            />
                        </Source>

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

const mapStateToProps = state => {
    return {
        locations: state.mapReducer.locations
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getLocations: () => dispatch(GetLocationsAction())
    }
}

export const MapView = connect(mapStateToProps, mapDispatchToProps)(MapViewComponent);