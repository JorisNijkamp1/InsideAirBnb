import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Container} from "reactstrap";
import {Bar, Doughnut, Line} from 'react-chartjs-2';
import {getToken} from "../AzureADConfig";


const optionsAveragePrice = {
    legend: {
        display: true
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

const ChartsComponent = (props) => {
    const [averageAvailabilityChart, setAverageAvailabilityChart] = useState([]);
    const [priceChart, setPriceChart] = useState([]);
    const [averageReviewScore, setAverageReviewScore] = useState([]);
    const [userStatus, setUserstatus] = useState(false);

    // const API_URL = "https://localhost:6001";
     const API_URL = "https://school-projecten.azurewebsites.net";

    useEffect(() => {
        fetch(`${API_URL}/api/chart/housetypes`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + getToken(),
                'content-type': 'application/json'
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    setUserstatus(true);
                } else {
                    setUserstatus(false);
                }
                return response.json()
            })
            .then(data => {
                setAverageAvailabilityChart(data)
            });

        fetch(`${API_URL}/api/chart/availability`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + getToken(),
                'content-type': 'application/json'
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    setUserstatus(true);
                } else {
                    setUserstatus(false);
                }
                return response.json()
            })
            .then(data => {
                setAverageReviewScore(data)
            });

        fetch(`${API_URL}/api/chart/averagepriceneighbourhood`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + getToken(),
                'content-type': 'application/json'
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    setUserstatus(true);
                } else {
                    setUserstatus(false);
                }
                return response.json()
            })
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
            return e.numbers
        }),
        scaleLabel: 'text',
        // datasets: dataForFilter()
        datasets: [
            {
                label: '# van gemiddelde beschikbaarheid',
                // label: averageAvailabilityChart.map(e => {
                //     return e.numbers
                // }),
                data: averageAvailabilityChart.map(e => {
                    return e.count;
                }),
                backgroundColor: dynamicColors(20),
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
        ]
    };

    const dataAverageReviewScore = {
        labels: averageReviewScore.map(e => {
            return e.numbers;
        }),
        datasets: [
            {
                label: '# van gemiddelde prijs',
                data: averageReviewScore.map(e => {
                    return e.count;
                }),
                backgroundColor: dynamicColors(60)
            }
        ]
    };

    const dataPriceChart = {
        labels: priceChart.map(e => {
            return e.numbers
        }),
        datasets: [
            {
                label: '# van gemiddelde prijs',
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
            {userStatus ? (
                    <div className="h-50 py-4">
                        {averageAvailabilityChart && averageAvailabilityChart.length > 0 ? (
                            <div className="py-5 h-25">
                                <h2>Types accomodaties.</h2>
                                <Doughnut data={dataAverageAvailability}/>
                            </div>
                        ) : null}
                        {priceChart && priceChart.length > 0 ? (
                            <div className="py-5">
                                <h2>Gemiddelde prijs per buurt.</h2>
                                <Bar data={dataPriceChart} options={optionsAveragePrice} height={500} width={1000}/>
                            </div>
                        ) : null}
                        {averageReviewScore && averageReviewScore.length > 0 ? (
                            <div className="py-5">
                                <h2 className="text-center">Gemiddelde review score per buurt</h2>
                                <Doughnut data={dataAverageReviewScore} height={300} width={1000}/>
                            </div>
                        ) : null}
                    </div>
                ) :
                <h1>Helaas u heeft geen toegang tot het dashboard!</h1>}
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