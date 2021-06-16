import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Container} from "reactstrap";
import {Bar, Line} from 'react-chartjs-2';
import {getToken} from "../AzureADConfig";


const optionsReview = {
    legend: {
        display: false
    },
    tooltips: {
        enabled: true
    },
    maintainAspectRatio: false,
    responsive: false,
    scales: {
        yAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: 'Amount of reviews'
                }
            }
        ],
        xAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: 'Score from 1 to 10'
                }
            }
        ]
    }
}

const optionsAvailability = {
    legend: {
        display: false
    },
    tooltips: {
        enabled: true
    },
    elements: {
        point: {
            radius: 0}},
    maintainAspectRatio: false,
    responsive: false,
    scales: {
        yAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: 'Amount of AirBnBs'
                }
            }
        ],
        xAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: 'Days available(per year)'
                }
            }
        ]
    }
}

const ChartsComponent = (props) => {
    const [reviewChart, setReviewChart] = useState([]);
    const [availabilityChart, setAvailabilityChart] = useState([]);
    const API_URL = "https://localhost:6001";
    // const API_URL = "https://school-projecten.azurewebsites.net";

    useEffect(() => {
        fetch(`${API_URL}/api/chart/review`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + getToken(),
                'content-type': 'application/json'
            }),
        })
            .then(response => response.json())
            .then(data => {
                setReviewChart(data)
            });

        fetch(`${API_URL}/api/chart/availability`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + getToken(),
                'content-type': 'application/json'
            }),
        })
            .then(response => response.json())
            .then(data => {
                setAvailabilityChart(data)
            })
    }, []);

    const dynamicColors = arraylength => {
        var array = [];
        for (let i = 0; i < arraylength; i++) {
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            let total = 'rgb(' + r + ',' + g + ',' + b + ')';
            array.push(total);
        }
        return array;
    };

    const dataReviewChart = {
        labels: reviewChart.map(e => {
            return parseInt(e.numbers);
        }),
        scaleLabel: 'text',
        datasets: [
            {
                data: reviewChart.map(e => {
                    return e.count;
                }),
                backgroundColor: dynamicColors(20),
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
        ]
    };

    const dataAvailabilityChart = {
        labels: availabilityChart.map(e => {
            return parseInt(e.numbers);
        }),
        datasets: [
            {
                data: availabilityChart.map(e => {
                    return e.count;
                }),
                backgroundColor: dynamicColors(1)
            }
        ]
    };

    return (
        <Container>
            <h3>Charts</h3>
            <div className="h-50 py-4">
                {reviewChart && reviewChart.length > 0 ? (
                    <div className="py-5">
                        <h2>Gemiddelde reviews</h2>
                        <Bar data={dataReviewChart} options={optionsReview} height={300} width={1000}/>
                    </div>
                ) : null}
                {availabilityChart && availabilityChart.length > 0 ? (
                    <div className="py-5">
                        <h2>Beschikbaarheid per maand</h2>
                        <p>Links is het aantal accomodaties. Onderaan de hoeveelheid vrije dagen per maand.</p>
                        <Line data={dataAvailabilityChart} options={optionsAvailability} height={300} width={1000}/>
                    </div>
                ) : null}
            </div>
        </Container>
    );
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export const Charts = connect(mapStateToProps, mapDispatchToProps)(ChartsComponent);