import React from 'react';
import './CountryCard.css';
import { Link } from 'react-router-dom';

export class CountryCard extends React.Component {
    render() {
        const { name, capital, population, region, flag } = this.props;
        const stats = {
            Population: { value: population.toLocaleString() },
            Region: { value: region },
            Capital: { value: capital },
        };
        return (
            <div className="Card__container">
                <Link
                    to={`/details/${name.toLowerCase()}`}
                    style={{ height: '100%', width: '100%' }}
                >
                    <div
                        className="Card__flag"
                        style={{ backgroundImage: `url(${flag})` }}
                    />
                    <div className="Card__countryName">{name}</div>
                    <div className="Card__countryStats">
                        {Object.entries(stats).map(([statName, statObject]) => (
                            <div
                                key={`${name}--${statName}`}
                                className="Card__statCategory"
                            >
                                <div className="Card__statHeader">
                                    {statName}:
                                </div>
                                <div className="Card__stat">
                                    {statObject.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </Link>
            </div>
        );
    }
}
