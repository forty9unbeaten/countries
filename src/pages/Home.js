import React from 'react';
import './Home.css';
import { CountryRow } from '../components';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredCountries: [],
            allCountries: [],
            searchValue: '',
            activeFilter: '',
        };
    }

    handleSearchChange = (event) => {
        const filteredCountries = this.state.allCountries.filter((country) =>
            country.name
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
        );
        const organizedCountries = this.organizeCountries(filteredCountries);
        this.setState({
            ...this.state,
            searchValue: event.target.value,
            filteredCountries: organizedCountries,
        });
    };

    componentDidMount() {
        const allCountriesURL =
            'https://restcountries.eu/rest/v2/all?fields=name;population;capital;region;flag';

        fetch(allCountriesURL)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return 'There was a problem getting country data';
                }
            })
            .then((countryData) => {
                const countries = this.organizeCountries(countryData);
                this.setState({
                    ...this.state,
                    filteredCountries: countries,
                    allCountries: countryData,
                });
            });
    }

    organizeCountries = (countries) => {
        let organzied = [];
        for (let i = 0; i < countries.length; i += 4) {
            organzied.push(countries.slice(i, i + 4));
        }
        return organzied;
    };

    render() {
        const { searchValue, filteredCountries } = this.state;
        return (
            <div id="Home__container">
                <div id="Home__toolbar">
                    <div id="Home__searchbarContainer">
                        <div id="Home__searchbar">
                            <ion-icon name="search-outline"></ion-icon>
                            <input
                                type="search"
                                placeholder="Search for a country..."
                                value={searchValue}
                                onChange={this.handleSearchChange}
                            />
                        </div>
                    </div>
                    <div id="Home__filterContainer">Filters</div>
                </div>
                {filteredCountries.length > 0 ? (
                    <div id="Home__cardContainer">
                        {filteredCountries.map((countryGroup) => (
                            <CountryRow
                                key={filteredCountries.indexOf(countryGroup)}
                                countries={countryGroup}
                            />
                        ))}
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        );
    }
}
