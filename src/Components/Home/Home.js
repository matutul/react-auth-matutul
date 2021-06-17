import React from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faCar, faMotorcycle, faTrain } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    const handleCardClick = (category) => {
        history.push(`./${category}/destination`);
    }
    return (
        <div className="home">
            <div className="container card-group">
                <div onClick={() => handleCardClick('bike')} className="item-card">
                    <FontAwesomeIcon className="icon" icon={faMotorcycle} />
                    <h2>BIKE</h2>
                </div>
                <div onClick={() => handleCardClick('car')} className="item-card">
                    <FontAwesomeIcon className="icon" icon={faCar} />
                    <h2>CAR</h2>
                </div>
                <div onClick={() => handleCardClick('bus')} className="item-card">
                    <FontAwesomeIcon className="icon" icon={faBus} />
                    <h2>BUS</h2>
                </div>
                <div onClick={() => handleCardClick('train')} className="item-card">
                    <FontAwesomeIcon className="icon" icon={faTrain} />
                    <h2>TRAIN</h2>
                </div>

            </div>
            <a className="bg-credit" href="https://www.freepik.com/free-photos-vectors/background" target="_blank" rel="noreferrer">Background vector created by macrovector</a>
        </div>
    );
};

export default Home;