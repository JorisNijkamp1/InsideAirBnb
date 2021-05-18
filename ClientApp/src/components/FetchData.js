import React, {Component} from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = {neighbourhoods: [], loading: true};
    }

    componentDidMount() {
        fetch('https://localhost:5001/api/locations')
            .then(res => res.json())
            .then(result => {
                console.log(result)
                this.setState({
                    neighbourhoods: result,
                    loading: false
                })
            })
    }

    static renderForecastsTable(neighbourhood) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Neighbourhood</th>
                </tr>
                </thead>
                <tbody>
                {neighbourhood.map(neighbourhood =>
                    <tr key={neighbourhood.name}>
                        <td>{neighbourhood.name}</td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.neighbourhoods);

        return (
            <div>
                <h1 id="tabelLabel">Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
}
