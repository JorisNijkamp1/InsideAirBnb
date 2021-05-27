import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Button, Form, FormGroup} from "reactstrap";

const NeighborhoodFilterComponent = (props) => {
    useEffect(() => {
    }, []);

    return (
        <Form>
            <FormGroup>
                <input type="number" placeholder="Filter hier op buurt!" className='w-100'/>
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
    return {}
}

export const NeighborhoodFilter = connect(mapStateToProps, mapDispatchToProps)(NeighborhoodFilterComponent);