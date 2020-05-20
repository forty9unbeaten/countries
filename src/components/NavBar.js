import React from 'react';
import './NavBar.css';

export class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="NavBar__container">
                <div id="NavBar__title">Where in the world?</div>
                <div id="NavBar__buttonContainer">
                    <div id="NavBar__darkButton">
                        <ion-icon name="moon-outline"></ion-icon>Dark Mode
                    </div>
                </div>
            </div>
        );
    }
}
