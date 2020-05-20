import React from 'react';
import { CountryCard } from './CountryCard';
import './CountryRow.css';

export class CountryRow extends React.Component {
    render() {
        const { countries } = this.props;
        return (
            <div className="CountryRow__row">
                {countries.map((country) => (
                    <CountryCard
                        key={country.name}
                        name={country.name}
                        capital={country.capital}
                        population={country.population}
                        region={country.region}
                        flag={country.flag}
                    />
                ))}
            </div>
        );
    }
}
