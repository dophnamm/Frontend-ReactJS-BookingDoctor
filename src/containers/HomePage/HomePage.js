import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import "./HomePage.scss";

class HomePage extends Component {
    render() {
        let settings = {
            dots: false,
            infinity: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
        }
        return (
            <div>
                <div>
                    <HomeHeader/>
                    <Specialty settings={settings}/>
                    <MedicalFacility settings={settings}/>
                    <OutStandingDoctor settings={settings}/>
                    <HandBook settings={settings}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
