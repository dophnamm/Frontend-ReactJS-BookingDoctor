import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss"
import { LANGUAGES } from '../../../utils';
import { getExtraInfoById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            extraInfo: {}
        }
    }

    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInfoById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }
        }
    }

    showHide = (status) => {
        this.setState({ isShowDetailInfo: status })
    }

    render() {
        let { isShowDetailInfo, extraInfo } = this.state
        let { language } = this.props
        return (
            <>
                <div className="main-extra-info">
                    <div className="content-up">
                        <div className="address-doctor">
                            <FormattedMessage id="patient.extra-info.address-clinic" />
                        </div>
                        <div className="name-clinic">
                            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                        </div>
                        <p className="detail-address">
                            {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                        </p>
                    </div>

                    <div className="content-down">
                        <div className="title-price">
                            <h3><FormattedMessage id="patient.extra-info.price" /> :</h3>
                            {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI
                                &&
                                <NumberFormat
                                    value={extraInfo.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'₫'}
                                />
                            }

                            {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN
                                &&
                                <NumberFormat
                                    value={extraInfo.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            }

                            {
                                isShowDetailInfo === false ?
                                    <p onClick={() => this.showHide(true)}>
                                        <FormattedMessage id="patient.extra-info.show" />
                                    </p>
                                    :
                                    <p onClick={() => this.showHide(false)}>
                                        <FormattedMessage id="patient.extra-info.hide" />
                                    </p>
                            }
                        </div>


                        <div className={isShowDetailInfo === true ? "detail-price active" : "detail-price"}>
                            <div className="detail-price-up">
                                <div className="sub-price">
                                    <div className="left">
                                        <FormattedMessage id="patient.extra-info.price" />
                                    </div>
                                    <div className="right">
                                        {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI
                                            &&
                                            <NumberFormat
                                                value={extraInfo.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'₫'}
                                            />
                                        }

                                        {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN
                                            &&
                                            <NumberFormat
                                                value={extraInfo.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        }
                                    </div>
                                </div>
                                <p>
                                    {
                                        extraInfo && extraInfo.note ? extraInfo.note : ''
                                    }
                                </p>
                            </div>
                            <div className="detail-price-down">
                                <FormattedMessage id="patient.extra-info.infomation" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
