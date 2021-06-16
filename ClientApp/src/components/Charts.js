import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Container} from "reactstrap";
import {Bar, Line} from 'react-chartjs-2';
import {getToken} from "../AzureADConfig";


const optionsAvergeAvailibility = {
    legend: {
        display: false
    },
    tooltips: {
        enabled: true
    },
    responsive: true,
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

const optionsAveragePrice = {
    legend: {
        display: false
    },
    tooltips: {
        enabled: true
    },
    responsive: true,
    scales: {
        yAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: 'Prijs'
                }
            }
        ],
        xAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: 'Buurten'
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
    responsive: true,
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
    const [averageAvailabilityChart, setAverageAvailabilityChart] = useState([]);
    const [priceChart, setPriceChart] = useState([]);
    const [availabilityChart, setAvailabilityChart] = useState([]);
    
    const API_URL = "https://localhost:6001";
    // const API_URL = "https://school-projecten.azurewebsites.net";

    useEffect(() => {
        fetch(`${API_URL}/api/chart/averageavailabilityneighbourhood`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + getToken(),
                'content-type': 'application/json'
            }),
        })
            .then(response => response.json())
            .then(data => {
                setAverageAvailabilityChart(data)
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
            });

        fetch(`${API_URL}/api/chart/averagepriceneighbourhood`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + getToken(),
                'content-type': 'application/json'
            }),
        })
            .then(response => response.json())
            .then(data => {
                setPriceChart(data)
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

    const dataAverageAvailability = {
        labels: averageAvailabilityChart.map(e => {
            console.log(e.numbers)
            return e.numbers
        }),
        scaleLabel: 'text',
        datasets: [
            {
                data: averageAvailabilityChart.map(e => {
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

    const dataPriceChart = {
        labels: priceChart.map(e => {
            console.log(e.numbers)
            return e.numbers
        }),
        scaleLabel: 'text',
        datasets: [
            {
                data: priceChart.map(e => {
                    return e.count;
                }),
                backgroundColor: dynamicColors(20),
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
        ]
    };


    return (
        <Container>
            <div className="h-50 py-4">
                {averageAvailabilityChart && averageAvailabilityChart.length > 0 ? (
                    <div className="py-5">
                        <h2>Gemiddelde beschikbaarheid per buurt per 30 dagen.</h2>
                        <Bar data={dataAverageAvailability} options={optionsAvergeAvailibility} height={500} width={1000}/>
                    </div>
                ) : null}
                {availabilityChart && availabilityChart.length > 0 ? (
                    <div className="py-5">
                        <h2>Beschikbaarheid per maand</h2>
                        <p>Links is het aantal accomodaties. Onderaan de hoeveelheid vrije dagen per maand.</p>
                        <Line data={dataAvailabilityChart} options={optionsAvailability} height={300} width={1000}/>
                    </div>
                ) : null}
                {priceChart && priceChart.length > 0 ? (
                    <div className="py-5">
                        <h2>Gemiddelde prijs per buurt.</h2>
                        <Bar data={dataPriceChart} options={optionsAveragePrice} height={500} width={1000}/>
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