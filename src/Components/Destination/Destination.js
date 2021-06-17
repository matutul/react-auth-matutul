import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import fakeData from '../../FakeData/fakeData.json';
import './Destination.css';
import AvailedCar from '../AvailedCar/AvailedCar';
import OpenStreetMap from '../OpenStreetMap/OpenStreetMap';




const Destination = () => {
    const { category } = useParams();
    const [carsData, setCarsData] = useState([]);
    const [dataForSearch, setDataForSearch] = useState({
        transport_type: '',
        location: '',
        destination: ''
    })
    const [availedCar, setAvailedCar] = useState([]);
    useEffect(() => {
        setCarsData(fakeData);
        if (category) {
            const newDataForSearch = { ...dataForSearch };
            newDataForSearch.transport_type = category;
            setDataForSearch(newDataForSearch);
        }
        if(!category){
            const newDataForSearch = { ...dataForSearch };
            newDataForSearch.transport_type = 'bike';
            setDataForSearch(newDataForSearch);
        }
    }, [])

    // handle on blur event of input fields
    const handleOnBlur = (e) => {
        const newDataForSearch = { ...dataForSearch };
        newDataForSearch[e.target.name] = e.target.value;
        setDataForSearch(newDataForSearch);
    }


    const handleSearchTransport = (e) => {
        e.preventDefault();
        const cars = carsData.filter(car => car.car_type === dataForSearch.transport_type);
        setAvailedCar(cars);
    }

    return (
        <Container>
            <Row className="row">
                <Col xl="5" lg="6" md="12" xs="12">
                    <div className="user-query">
                        <form onSubmit={handleSearchTransport} className="query-form">
                            {
                                !category && <select name="transport_type" onBlur={handleOnBlur} defaultValue={dataForSearch.transport_type} className="query-input" id="">
                                    <option value="bike">Bike</option>
                                    <option value="car">Car</option>
                                    <option value="bus">Bus</option>
                                    <option value="train">Train</option>
                                </select>
                            }

                            <label htmlFor="location">Pick From</label>
                            <input type="text" name="location" onBlur={handleOnBlur} className="query-input" placeholder="Your location" required />
                            <label htmlFor="destination">Pick To</label>
                            <input type="text" name="destination" onBlur={handleOnBlur} className="query-input" placeholder="Destination" required />
                            <input type="submit" className="submit-btn" value="Search" />
                        </form>
                        {
                            availedCar.map((car) => <AvailedCar key={car.id} car={car}></AvailedCar>)
                        }
                    </div>
                </Col>
                <Col>
                    <div className="map-div">
                        <OpenStreetMap className="map-image"></OpenStreetMap>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Destination;