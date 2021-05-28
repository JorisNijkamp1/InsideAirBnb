import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Button, Form, FormGroup} from "reactstrap";
import {FilterPriceAction} from "../../actions/FilterActions";

const PriceFilterComponent = (props) => {
    const [priceFilter, setPriceFilter] = useState('');

    useEffect(() => {
    }, []);

    const addFilter = async (e) => {
        e.preventDefault();
        await props.filterPriceAction(priceFilter);
        setPriceFilter('');
    }

    return (
        <form onSubmit={(e) => addFilter(e)}>
            <FormGroup>
                <input
                    type="number"
                    placeholder="Filter hier op prijs! (maximale prijs)"
                    className='w-100'
                    value={priceFilter ? priceFilter : ''}
                    onChange={(e) => setPriceFilter(e.target.value)}/>
            </FormGroup>
            <Button className='w-100 mb-3' variant="primary" type="submit">
                Prijs filter!
            </Button>
        </form>
    );
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        filterPriceAction: (priceFilter) => dispatch(FilterPriceAction(priceFilter)),
    }
}

export const PriceFilter = connect(mapStateToProps, mapDispatchToProps)(PriceFilterComponent);