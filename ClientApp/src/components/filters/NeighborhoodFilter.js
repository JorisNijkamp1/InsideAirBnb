import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Button, Form, FormGroup, Input} from "reactstrap";
import {getToken} from "../../AzureADConfig";
import {FilterNeighbourhoodAction, FilterPriceAction} from "../../actions/FilterActions";

const NeighborhoodFilterComponent = (props) => {
    const [neighbourhoods, setNeighbourhoods] = useState([]);
    const [neighbourhoodFilter, setNeighbourhoodFilter] = useState('');

    useEffect(() => {
        fetch('https://localhost:6001/api/neighbourhoods', {
            headers: new Headers({
                'Authorization': 'Bearer ' + getToken(),
                'content-type': 'application/json'
            }),
        })
            .then(response => response.json())
            .then(data => {
                setNeighbourhoods(data)
            })
    }, []);

    
    const neighbourhoodsMapper = () => {
        return neighbourhoods.map(n => {
            return (
                <option 
                    value={n.neighbourhood1}
                    key={n.neighbourhood1}
                >
                    {n.neighbourhood1}
                </option>
            )
        })
    }

    const addFilter = async (e) => {
        e.preventDefault();
        await props.filterNeighbourhoodAction(neighbourhoodFilter);
        setNeighbourhoodFilter('');
    }
    
    return (
        <Form onSubmit={(e) => addFilter(e)}>
            <FormGroup>
                <Input type="select" name="select" id="exampleSelect"
                       value={neighbourhoodFilter ? neighbourhoodFilter : ''}
                       onChange={(e) => setNeighbourhoodFilter(e.target.value)}>
                    <option value="">---------</option>
                    {neighbourhoodsMapper()}
                </Input>
            </FormGroup>
            <Button className='w-100 mb-3' variant="primary" type="submit">
                Buurt filter!
            </Button>
        </Form>
    );
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        filterNeighbourhoodAction: (neighbourhoodFilter) => dispatch(FilterNeighbourhoodAction(neighbourhoodFilter)),
    }
}

export const NeighborhoodFilter = connect(mapStateToProps, mapDispatchToProps)(NeighborhoodFilterComponent);