import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';

class HomeHeader extends Component {
    render() {
        console.log('check props' , this.props)
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <div className="header-icon-nav">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="header-logo"></div>
                        </div>

                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b> <FormattedMessage id="homeHeader.specialty"/> </b>
                                </div>
                                <div>
                                    <p> <FormattedMessage id="homeHeader.searchdoctor"/> </p>
                                </div>
                            </div>

                            <div className="child-content">
                                <div>
                                    <b> <FormattedMessage id="homeHeader.health"/> </b>
                                </div>
                                <div>
                                    <p> <FormattedMessage id="homeHeader.selectroom"/> </p>
                                </div>
                            </div>

                            <div className="child-content">
                                <div>
                                    <b> <FormattedMessage id="homeHeader.doctor"/> </b>
                                </div>
                                <div>
                                    <p> <FormattedMessage id="homeHeader.selectdoctor"/> </p>
                                </div>
                            </div>

                            <div className="child-content">
                                <div>
                                    <b> <FormattedMessage id="homeHeader.fee"/> </b>
                                </div>
                                <div>
                                    <p> <FormattedMessage id="homeHeader.checkhealth"/> </p>
                                </div>
                            </div>
                        </div>

                        <div className="right-content">
                            <div className="support">
                                <i className="far fa-question-circle"></i> 
                                <FormattedMessage id="homeHeader.support"/>
                            </div>
                            <div className="choose-language">
                                <div className="language-vi">VI</div>
                                <div className="language-en">EN</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="home-header-banner">
                    <div className="banner-header-content">
                        <h2><FormattedMessage id="banner.h2-1"/></h2>
                        <h2><FormattedMessage id="banner.h2-2"/></h2>
                    </div>

                    <div className="search">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Tìm kiếm..."/>
                    </div>

                    <div className="option">
                        <div className="option-item">
                            <div className="item-icon">
                                <img src="https://cdn1.iconfinder.com/data/icons/medical-2-19/512/medical-healthcare-hospital-02-512.png" alt="item1"/>
                            </div>
                            <p className="item-text"><FormattedMessage id="option.itemone"/></p>
                        </div>

                        <div className="option-item">
                            <div className="item-icon">
                                <img src="https://cdn1.iconfinder.com/data/icons/medical-2-19/512/medical-healthcare-hospital-32-512.png" alt="item1"/>
                            </div>
                            <p className="item-text"><FormattedMessage id="option.itemtwo"/></p>
                        </div>

                        <div className="option-item">
                            <div className="item-icon">
                                <img src="https://cdn1.iconfinder.com/data/icons/medical-2-19/512/medical-healthcare-hospital-33-512.png" alt="item1"/>
                            </div>
                            <p className="item-text"><FormattedMessage id="option.itemthree"/></p>
                        </div>

                        <div className="option-item">
                            <div className="item-icon">
                                <img src="https://cdn1.iconfinder.com/data/icons/medical-2-19/512/medical-healthcare-hospital-01-512.png" alt="item1"/>
                            </div>
                            <p className="item-text"><FormattedMessage id="option.itemfour"/></p>
                        </div>

                        <div className="option-item">
                            <div className="item-icon">
                                <img src="https://cdn1.iconfinder.com/data/icons/medical-2-19/512/medical-healthcare-hospital-34-512.png" alt="item1"/>
                            </div>
                            <p className="item-text"><FormattedMessage id="option.itemfive"/></p>
                        </div>

                        <div className="option-item">
                            <div className="item-icon">
                                <img src="https://cdn1.iconfinder.com/data/icons/medical-2-19/512/medical-healthcare-hospital-27-512.png" alt="item1"/>
                            </div>
                            <p className="item-text"><FormattedMessage id="option.itemsix"/></p>
                        </div>
                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
