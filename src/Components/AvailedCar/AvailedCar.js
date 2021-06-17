import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faCar, faMotorcycle, faPhone, faTrain, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import './AvailedCar.css';

const AvailedCar = (props) => {
    const { car_type, rider_name, phone, price_per_km } = props.car;
    const [icon, setIcon] = useState("");
    useEffect(() => {
        switch (car_type) {
            case "bike":
                setIcon(faMotorcycle);
                break;
            case "car":
                setIcon(faCar);
                break;
            case "bus":
                setIcon(faBus);
                break;
            case "train":
                setIcon(faTrain);
                break;

            default:
                break;
        }
    }, [car_type])



    return (
        <div className="car-card">
            <div className="avater-div"><FontAwesomeIcon className="avater-icon" icon={icon} /></div>
            <div className="car-info">
                <p><FontAwesomeIcon icon={faUser} /> {rider_name}</p>
                <p><FontAwesomeIcon icon={faPhone} /> {phone}</p>
            </div>
            <p className="price">Per km: ${price_per_km}</p>
        </div>
    );
};

export default AvailedCar;