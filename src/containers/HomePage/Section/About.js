import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';
import { FormattedMessage } from 'react-intl';
import AboutImg from "../../../assets/about.png";

class About extends Component {

    render() {
        return (
           <div className="section-about">
               <div className="section-content-about">
                    <div className="about-main">
                        <div className="about-left">
                        </div>

                        <div className="about-right">
                            <iframe width="1109" height="624" src="https://www.youtube.com/embed/wQ2TN_gI3sE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
               </div>
           </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
