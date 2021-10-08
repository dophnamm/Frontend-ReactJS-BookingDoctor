import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';
import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component {

    render() {
        return (
           <div className="section-footer">
               <div className="section-content">
                    <div className="footer-main">
                        <div className="footer-left">
                            <p>&copy; Copyright 2021 HUTECH, Inc. </p>
                        </div>

                        <div className="footer-center">
                            <ul>
                                <li>
                                    <a href="/">
                                        <i class="fab fa-facebook-square"></i>
                                    </a>
                                </li>

                                <li>
                                    <a href="/">
                                        <i class="fab fa-linkedin"></i>
                                    </a>
                                </li>

                                <li>
                                    <a href="/">
                                        <i class="fab fa-instagram"></i>
                                    </a>
                                </li>

                                <li>
                                    <a href="/">
                                        <i class="fas fa-hospital"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-right">
                            <p>Design By Phuong Nam</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
