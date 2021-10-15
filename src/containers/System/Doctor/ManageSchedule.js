import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { dateFormat, LANGUAGES } from '../../../utils';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import './ManageSchedule.scss';
import { saveBulkScheduleDoctor } from "../../../services/userService";

class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
        }
    }

    componentDidMount() {
        this.props.fechAllDoctors()
        this.props.fetchAllScheduleTime()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map(item => {
                    item.isSelected = false
                    return item
                })
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    buildDataInputSelect = (data) => {
        let result = [];
        let { language } = this.props
        if (data && data.length > 0) {
            data.map((item, index) => {
                let obj = {}
                let labelVi = `${item.firstName} ${item.lastName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                obj.value = item.id
                result.push(obj)
            })
        }
        return result;
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        let result = []
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Plase choose your doctor !")
            return;
        }

        if (!currentDate) {
            toast.error("Plase enter the date !")
            return;
        }

        let formattedDate = new Date(currentDate).getTime()
        if (rangeTime && rangeTime.length > 0) {
            let seclectedTime = rangeTime.filter(item => item.isSelected === true)
            if (seclectedTime && seclectedTime.length > 0) {
                seclectedTime.map(schedule => {
                    let obj = {}
                    obj.doctorId = selectedDoctor.value
                    obj.date = formattedDate
                    obj.timeType = schedule.keyMap
                    result.push(obj)
                })
            } else {
                toast.error('Plase selected time !')
                return
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formattedDate: formattedDate
        })
        if (res && res.errCode === 0) {
            toast.success('Thành công .')
            if (rangeTime && rangeTime.length > 0) {
                rangeTime = rangeTime.map(item => {
                    if (item.id) item.isSelected = false;
                    return item
                })
                this.setState({
                    rangeTime: rangeTime
                })
            }
            return
        } else {
            toast.error('Vui lòng thử lại .')
            return
        }
    }

    render() {
        let { rangeTime } = this.state
        let { language } = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <>
                <div className="manage-schedule">
                    <div className="container">
                        <div className="text-center h2 mt-5 text-uppercase font-weight-bold">
                            <FormattedMessage id="manage-schedule.title" />
                        </div>
                        <div className="row mt-5">
                            <div className="col-12 row">
                                <div className="col-5">
                                    <label>
                                        <FormattedMessage id="manage-schedule.choose-doctor" />
                                    </label>
                                    <Select
                                        value={this.state.selectedDoctor}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.listDoctors}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-schedule.choose-date" />
                                    </label>
                                    <DatePicker
                                        className="form-control choose-date"
                                        value={this.state.currentDate}
                                        minDate={yesterday}
                                        onChange={this.handleOnChangeDatePicker}
                                    />
                                </div>
                            </div>
                            <div className="pick-hour-container col-12 mt-3">
                                <div className="col-10 row">
                                    {
                                        rangeTime && rangeTime.length > 0 &&
                                        rangeTime.map((item, index) => {
                                            return (
                                                <button className={item.isSelected === true ?
                                                    "choose-hours active" : "choose-hours"}
                                                    key={index}
                                                    onClick={() => this.handleClickBtnTime(item)}
                                                >
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                                <div className="mt-5">
                                    <button className="btn-save-date"
                                        onClick={() => this.handleSaveSchedule()}
                                    >
                                        <FormattedMessage id="manage-schedule.save" />
                                    </button>
                                </div>
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
        isLoggedIn: state.user.isLoggedIn,
        allDoctor: state.admin.allDoctor,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fechAllDoctors: () => dispatch(actions.fechAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
