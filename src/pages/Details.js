import React from 'react';
import './Details.css';
import { Link } from 'react-router-dom';

export class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCountry: false,
            neighbors: false,
        };
    }

    makeLeftStatContainer = () => {
        const { currentCountry } = this.state;
        if (currentCountry) {
            const leftContainerData = {
                'Native Name': currentCountry.nativeName,
                Population: currentCountry.population.toLocaleString(),
                Region: currentCountry.region,
                'Sub Region': currentCountry.subregion,
                Capital: currentCountry.capital,
            };

            return this.makeStatLines(leftContainerData);
        }
    };

    makeRightStatContainer = () => {
        const { currentCountry } = this.state;
        if (currentCountry) {
            const rightContainerData = {
                'Top Level Domain(s)': currentCountry.topLevelDomain.join(', '),
                Currencies: currentCountry.currencies
                    .map((currency) => currency.name)
                    .join(', '),
                'Language(s)': currentCountry.languages
                    .map((language) => language.name)
                    .join(', '),
            };

            return this.makeStatLines(rightContainerData);
        }
    };

    makeStatLines = (statisticData) => {
        return Object.keys(statisticData).map((statistic) => (
            <div key={statistic} className="Details__statLine">
                <div className="Details__statName">{statistic}:</div>
                <div className="Details__statValue">
                    {statisticData[statistic]}
                </div>
            </div>
        ));
    };

    getNeighborInformation = (countryCodes) => {
        const URL = `https://restcountries.eu/rest/v2/alpha?codes=${countryCodes.join(
            ';'
        )}`;
        fetch(URL)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((neighborData) => {
                if (neighborData) {
                    this.setState({
                        ...this.state,
                        neighbors: neighborData.map(
                            (neighbor) => neighbor.name
                        ),
                    });
                }
            });
    };

    makeNeighborContainer = () => {
        const { neighbors } = this.state;
        if (neighbors) {
            return (
                <React.Fragment>
                    <div id="Details__neighborHeader">Border Countries:</div>
                    <div id="Details__neighborButtonContainer">
                        {neighbors.map((neighbor) => (
                            <div
                                key={neighbor}
                                className="Details__neighborButton"
                            >
                                <Link to={`/details/${neighbor.toLowerCase()}`}>
                                    {neighbor}
                                </Link>
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            );
        }
    };

    componentDidMount() {
        const countryName = this.props.match.params.countryname;
        const URL = `https://restcountries.eu/rest/v2/name/${countryName}`;
        fetch(URL)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((countryData) => {
                this.getNeighborInformation(countryData[0].borders);
                this.setState({
                    ...this.state,
                    currentCountry: countryData[0],
                });
            });
    }

    componentDidUpdate(previousProps) {
        const newCountry = this.props.match.params.countryname;
        const previousCountry = previousProps.match.params.countryname;
        if (newCountry && newCountry !== previousCountry) {
            this.componentDidMount();
        }
    }

    render() {
        const { currentCountry } = this.state;
        return (
            <div id="Details__container">
                <div id="Details__toolbar">
                    <div id="Details__backButton">
                        <Link to="/">
                            <ion-icon name="arrow-back-outline"></ion-icon>
                            <div id="Details__buttonText">Back</div>
                        </Link>
                    </div>
                </div>
                {currentCountry ? (
                    <div id="Details__detailContainer">
                        <div
                            id="Details__flag"
                            style={{
                                backgroundImage: `url(${currentCountry.flag})`,
                            }}
                        />
                        <div id="Details__countryDetails">
                            <div id="Details__countryName">
                                {currentCountry.name}
                            </div>
                            <div id="Details__statsContainer">
                                <div id="Details__leftContainer">
                                    {this.makeLeftStatContainer()}
                                </div>
                                <div id="Details__rightContainer">
                                    {this.makeRightStatContainer()}
                                </div>
                            </div>
                            <div id="Details__neighborContainer">
                                {this.makeNeighborContainer()}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        );
    }
}
