import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorSchedule.scss"
import { getDetailInfoDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import localization from 'moment/locale/vi'
import moment from 'moment';
import { getScheduleDoctorbyDate } from '../../../services/userService';
import FailData from "../../../assets/notdata.png"
import { FormattedMessage } from 'react-intl';


class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            availableTime: [],
        }
    }

    async componentDidMount() {
        let { language } = this.props
        let allDays = this.getArrDays(language)
        this.setState({
            allDays: allDays,
        })
    }

    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let obj = {}
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`
                    obj.label = today
                } else {
                    obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Today - ${ddMM}`
                    obj.label = today
                } else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
                }
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDays.push(obj)
        }
        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language)
            let res = await getScheduleDoctorbyDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                availableTime: res.data ? res.data : []
            })
        }
    }

    handleOnChangeSelect = async (e) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = e.target.value
            let res = await getScheduleDoctorbyDate(doctorId, date)
            if (res && res.errCode === 0) {
                this.setState({
                    availableTime: res.data ? res.data : []
                })
            }
        }
    }

    render() {
        let { allDays, availableTime } = this.state
        let { language } = this.props
        return (
            <>
                <div className="main-schedule-container">
                    <div className="all-schedule mb-4">
                        <select onChange={(e) => this.handleOnChangeSelect(e)}>
                            {
                                allDays && allDays.length > 0 &&
                                allDays.map((item, index) => (
                                    <option
                                        key={index}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calendar">
                            <i className="far fa-calendar-alt"></i>
                            <FormattedMessage id="detail-doctor.calendar" />
                        </div>
                        <div className="time-content">
                            {
                                availableTime && availableTime.length > 0
                                    ?
                                    <>
                                        <div className="container-btn">
                                            {
                                                availableTime.map((item, index) => {
                                                    let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                                    return (
                                                        <button className="choose-time" key={index}>
                                                            {timeDisplay}
                                                        </button>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="book-free">
                                            <FormattedMessage id="detail-doctor.choose" />
                                            <i className="far fa-hand-point-up"></i>
                                            <FormattedMessage id="detail-doctor.booking" />
                                        </div>
                                    </>
                                    :
                                    <div className="not-data">
                                        <p><FormattedMessage id="detail-doctor.text" /></p>
                                        <img src={FailData} alt="not data" />
                                    </div>
                            }
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
