import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';

class HomeHeader extends Component {
    render() {
        return (
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
                                    <b> Chuyên Khoa </b>
                                </div>
                                <div>
                                    <p> Tìm bác sĩ theo chuyên khoa </p>
                                </div>
                            </div>

                            <div className="child-content">
                                <div>
                                    <b> Cơ Sở Y Tế </b>
                                </div>
                                <div>
                                    <p> Chọn bệnh viện phòng khám </p>
                                </div>
                            </div>

                            <div className="child-content">
                                <div>
                                    <b> Bác Sĩ </b>
                                </div>
                                <div>
                                    <p> Chọn bác sĩ giỏi </p>
                                </div>
                            </div>

                            <div className="child-content">
                                <div>
                                    <b> Gói Khám </b>
                                </div>
                                <div>
                                    <p> Khám sức khoẻ tổng quát </p>
                                </div>
                            </div>
                        </div>

                        <div className="right-content">
                            <div className="support">
                                <i class="far fa-question-circle"></i> Hỗ Trợ
                            </div>
                            <div className="flag">
                                VN
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
