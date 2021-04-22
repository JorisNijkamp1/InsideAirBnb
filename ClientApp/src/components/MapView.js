import React, {PureComponent} from 'react';
import ReactMapGL from 'react-map-gl';
import {Button, Col, Row} from 'reactstrap';
import Geocoder from "react-mapbox-gl-geocoder";
import ReactMapGl, {Marker} from 'react-map-gl'

const mapStyle = {
    width: '100%',
    height: 800
}

const mapboxApiKey = 'pk.eyJ1Ijoiam5pamthbXAiLCJhIjoiY2tuc3FvcHM3MmZtNTJvcHJlaTFlczM4ZCJ9.8rfK7ZmuQEY25i1c10c3eg';

const params = {
    country: "nl"
}


const CustomMarker = ({index, marker}) => {
    if (marker) {
        return (
            <Marker
                longitude={marker.longitude}
                latitude={marker.latitude}>
                <div className="marker">
                    <span><b>{index + 1}</b></span>
                </div>
            </Marker>
        )
    } else {
        return (
            <p>Zoek een plaats</p>
        )
    }
};

class MapView extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 52.370216,
                longitude: 4.895168,
                zoom: 12
            },
            tempMarker: null,
            markers: []
        };
    }

    onSelected = (viewport, item) => {
        this.setState({
            viewport,
            tempMarker: {
                name: item.place_name,
                longitude: item.center[0],
                latitude: item.center[1]
            }
        })
    }

    add = () => {
        var {tempMarker} = this.state
        this.setState(prevState => ({
            markers: [...prevState.markers, tempMarker],
            tempMarker: null
        }))
    }


    render() {
        const {viewport, tempMarker, markers} = this.state;
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
                                  onSelected={this.onSelected}
                                  hideOnSelect={true}
                                  value=""
                                  queryParams={params}
                        />
                    </Col>
                    <Col>
                        <Button color="primary" onClick={this.add}>Add</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ReactMapGL
                            mapboxApiAccessToken={mapboxApiKey}
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                            {...viewport}
                            {...mapStyle}
                            onViewportChange={(viewport) => this.setState({viewport})}
                        >
                            {tempMarker &&
                            <Marker longitude={tempMarker.longitude} latitude={tempMarker.latitude}>
                                <div className="marker temporary-marker">
                                    <span>
                                    </span>
                                </div>
                            </Marker>
                            }
                            {
                                markers.map((marker, index) => {
                                    return (
                                        <CustomMarker
                                            key={`marker-${index}`}
                                            index={index}
                                            marker={marker}/>
                                    )
                                })
                            }
                        </ReactMapGL>
                    </Col>
                </Row>
            </>
        );
    }
}

export default MapView;