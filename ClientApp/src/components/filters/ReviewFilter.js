import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Button, Form, FormGroup} from "reactstrap";

const ReviewFilterComponent = (props) => {
    useEffect(() => {
    }, []);

    return (
        <Form>
            <FormGroup>
                <input type="text" placeholder="Filter hier op reviews!" className='w-100'/>
            </FormGroup>
            <Button className='w-100 mb-3' variant="primary" type="submit">
                Review filter!
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

export const ReviewFilter = connect(mapStateToProps, mapDispatchToProps)(ReviewFilterComponent);