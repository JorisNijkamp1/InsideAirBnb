import React, {useState} from 'react';
import {connect} from "react-redux";
import {Button, Form, FormGroup, Input} from "reactstrap";
import {FilterReviewAction} from "../../actions/FilterActions";

const ReviewFilterComponent = (props) => {
    const [reviewFilter, setReviewFilter] = useState('');

    const addFilter = async (e) => {
        e.preventDefault();
        await props.filterReviewAction(reviewFilter);
        setReviewFilter('');
    }

    return (
        <Form onSubmit={(e) => addFilter(e)}>
            <FormGroup>
                <Input type="select" name="select" id="exampleSelect"
                       value={reviewFilter ? reviewFilter : ''}
                       onChange={(e) => setReviewFilter(e.target.value)}>
                    <option value="">---------</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </Input>
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
    return {
        filterReviewAction: (reviewFilter) => dispatch(FilterReviewAction(reviewFilter)),
    }
}

export const ReviewFilter = connect(mapStateToProps, mapDispatchToProps)(ReviewFilterComponent);