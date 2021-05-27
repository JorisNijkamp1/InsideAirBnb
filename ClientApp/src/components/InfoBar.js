import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {PriceFilter} from "./filters/PriceFilter";
import {NeighborhoodFilter} from "./filters/NeighborhoodFilter";
import {ReviewFilter} from "./filters/ReviewFilter";

const InfoBarComponent = (props) => {
    useEffect(() => {
    }, []);


    const location = () => {
        if (props.selectedLocation.name && props.selectedLocation.neighborhood && props.selectedLocation.price) {
            return (
                <>
                    <h4 className='text-secondary'>Informatie!</h4>
                    <p><strong>Naam:</strong> {props.selectedLocation.name}</p>
                    <p><strong>Buurt:</strong> {props.selectedLocation.neighborhood}</p>
                    <p><strong>Prijs:</strong> {props.selectedLocation.price}</p>
                </>
            )
        }
    }

    return (
        <>
            <h1 className='text-secondary'>Infobar</h1>
            {location()}
            <PriceFilter/>
            <NeighborhoodFilter/>
            <ReviewFilter/>
        </>
    );
}

const mapStateToProps = state => {
    return {
        selectedLocation: state.mapReducer.selectedLocation
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export const InfoBar = connect(mapStateToProps, mapDispatchToProps)(InfoBarComponent);