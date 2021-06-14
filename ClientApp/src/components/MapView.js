import React, {useEffect, useState} from 'react';
import ReactMapGL, {Layer, Marker, Source} from 'react-map-gl';
import {GetLocationDetailAction, GetLocationsAction} from "../actions/MapActions";
import {connect} from "react-redux";
import {InfoBar} from "./InfoBar";

import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MapViewComponent = (props) => {
    const [viewport, setViewport] = useState({latitude: 52.370216, longitude: 4.895168, zoom: 12});
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
        height: '100%'
    }

    const openListing = (event) => {
        const listing = event.features.find(i => i.layer.id === 'unclustered-point');
        if (listing !== undefined) {
            props.getLocationDetails(listing.properties.id);
        }
    }

    return (
        <div>
            <div className='w-75 float-left map-height'>
                <ReactMapGL
                    mapboxApiAccessToken={mapboxApiKey}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    {...viewport}
                    {...mapStyle}
                    onClick={openListing}
                    onViewportChange={(viewport) => setViewport(viewport)}>
                    {props.location && props.locations.features?.length > 0 ? (
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
                    ) : null}
                </ReactMapGL>
            </div>
            <div className='w-25 float-left px-4'>
                <InfoBar/>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        locations: state.mapReducer.locations,
        selectedLocation: state.mapReducer.selectedLocation
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getLocations: () => dispatch(GetLocationsAction()),
        getLocationDetails: (id) => dispatch(GetLocationDetailAction(id))
    }
}

export const MapView = connect(mapStateToProps, mapDispatchToProps)(MapViewComponent);