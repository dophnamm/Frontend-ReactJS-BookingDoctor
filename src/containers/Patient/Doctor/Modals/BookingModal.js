import React, { Component } from 'react';
import { connect } from "react-redux";
import "./BookingModal.scss"
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            doctorId: '',
            selectedGender: '',
            timeType: '',

        }
    }

    async componentDidMount() {
        this.props.getGender()
    }

    buildDataGender = (data) => {
        let result = [];
        let { language } = this.props

        if (data && data.length > 0) {
            data.map(item => {
                let obj = {}
                obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                obj.value = item.keyMap
                result.push(obj)
            })
        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId
                let timeType = this.props.dataTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                })
            }
        }
    }

    handleOnChangeInput = (e, id) => {
        let valueInput = e.target.value
        let stateCopy = { ...this.state }
        stateCopy[id] = valueInput
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleOnChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption })
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return `${time} - ${date}`
        }
        return <></>
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name
        }
        return <></>
    }

    handleConfirmBooking = async () => {
        // validate input
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let doctorName = this.buildDoctorName(this.props.dataTime)

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            doctorId: this.state.doctorId,
            selectedGender: this.state.selectedGender.value,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })

        if (res && res.errCode === 0) {
            toast.success('Đăng ký khám bệnh thành công .')
            this.props.closeBookingModal()
        } else {
            toast.error('Vui lòng nhập đầy đủ thông tin .')
        }
        this.setState({
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: ''
        })
    }

    render() {
        let { isOpenModalBooking, closeBookingModal, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        return (

            <>
                <Modal
                    isOpen={isOpenModalBooking}
                    className={'booking-modal-container'}
                    size="lg"
                    centered
                >
                    <ModalHeader className="booking-modal-header">
                        <div className="header">
                            <FormattedMessage id="patient.booking-modal.title" />
                        </div>
                        <div className="btn-close-modal"
                            onClick={closeBookingModal}
                        >
                            <i className="fas fa-times"></i>
                        </div>
                    </ModalHeader>
                    <ModalBody >
                        <div className="header-modal-booking">
                            <ProfileDoctor doctorId={doctorId}
                                dataTime={dataTime}
                                isShowDescription={false}
                                isShowLinkDetail={false}
                            />
                        </div>

                        <div className="booking-body">
                            <div className="row">
                                <div className="col-6 form-group booking-input">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.fullname" />
                                    </label>
                                    <input className="form-control"
                                        value={this.state.fullName}
                                        onChange={(e) => this.handleOnChangeInput(e, 'fullName')}
                                    />
                                </div>

                                <div className="col-6 form-group booking-input">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.phone" />
                                    </label>
                                    <input className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}
                                    />
                                </div>

                                <div className="col-6 form-group booking-input">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.email" />
                                    </label>
                                    <input className="form-control" type="email"
                                        value={this.state.email}
                                        onChange={(e) => this.handleOnChangeInput(e, 'email')}
                                    />
                                </div>

                                <div className="col-6 form-group booking-input">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.address" />
                                    </label>
                                    <input className="form-control"
                                        value={this.state.address}
                                        onChange={(e) => this.handleOnChangeInput(e, 'address')}
                                    />
                                </div>

                                <div className="col-12 form-group booking-input">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.reason" />
                                    </label>
                                    <input className="form-control"
                                        value={this.state.reason}
                                        onChange={(e) => this.handleOnChangeInput(e, 'reason')}
                                    />
                                </div>

                                <div className="col-6 form-group booking-input">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.birthday" />
                                    </label>
                                    <DatePicker
                                        className="form-control choose-date"
                                        value={this.state.birthday}
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control"

                                    />
                                </div>

                                <div className="col-6 form-group booking-input">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.gender" />
                                    </label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleOnChangeSelect}
                                        options={this.state.genders}
                                        placeholder={<FormattedMessage id="patient.booking-modal.choose" />}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="btn-submit"
                            onClick={() => this.handleConfirmBooking()}
                        >
                            <FormattedMessage id="patient.booking-modal.confirm" />
                        </Button>{' '}
                        <Button className="btn-cancel" onClick={closeBookingModal}>
                            <FormattedMessage id="patient.booking-modal.close" />
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
