import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ProfileDoctor.scss"
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import "./ProfileDoctor.scss"
import { getProfileDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import _ from 'lodash';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        }
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data,
        })
    }

    getInfoDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            // this.getInfoDoctor(this.props.doctorId)
        }

    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <span>{time} - {date}</span>
            )
        }
        return <></>
    }

    render() {
        let { dataProfile } = this.state
        let { language, dataTime } = this.props
        let nameEn = '', nameVi = '', priceVi = '', priceEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        if (dataProfile && dataProfile.Doctor_Infor) {
            priceVi = `${dataProfile.Doctor_Infor.priceTypeData.valueVi}`
            priceEn = `${dataProfile.Doctor_Infor.priceTypeData.valueEn}`
        }
        return (
            <>
                <div className="doctor-info">
                    <div className="doctor-img"
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    />
                    <div className="intro-doctor">
                        <div className="booking-schedule">
                            <FormattedMessage id="patient.booking-modal.book" />
                        </div>
                        <div className="name-doctor">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="dated-choose">
                            {this.renderTimeBooking(dataTime)}
                        </div>
                        <p>
                            <FormattedMessage id="patient.booking-modal.book-free" />
                        </p>
                    </div>
                </div>
                <div className="price">
                    <FormattedMessage id="patient.booking-modal.price" />
                    <span>
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI &&
                            <NumberFormat
                                value={priceVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'₫'}
                            />
                        }
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN &&
                            <NumberFormat
                                value={priceEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'}
                            />
                        }
                    </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
