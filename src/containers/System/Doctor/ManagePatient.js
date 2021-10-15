import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManagePatient.scss"
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postRemedy } from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyOpenModal: false,
            dataModal: {}
        }
    }

    async componentDidMount() {

        this.getDataPatien()
    }

    getDataPatien = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })

        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatien()
        })
    }

    handleBtnConfirm = (item) => {
        console.log('check timetye', item)
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyOpenModal: true,
            dataModal: data
        })
    }

    isCloseModal = () => {
        this.setState({
            isOpenRemedyOpenModal: false
        })
    }

    sendRemedy = async (dataFromModal) => {
        let { dataModal } = this.state
        let res = await postRemedy({
            ...dataFromModal,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName

        })
        if (res && res.errCode === 0) {
            toast.success('Gửi hoá đơn thành công .')
            this.setState({
                isOpenRemedyOpenModal: false
            })
            await this.getDataPatien()
        } else {
            toast.error('Gửi hoá đơn thất bại, vui lòng thử lại.')
        }
    }

    render() {
        let { dataPatient, isOpenRemedyOpenModal, dataModal } = this.state
        let { language } = this.props
        return (
            <>
                <RemedyModal
                    isOpenRemedyOpenModal={isOpenRemedyOpenModal}
                    isCloseModal={this.isCloseModal}
                    dataModal={dataModal}
                    sendRemedy={this.sendRemedy}
                />
                <div className="manage-patient-container mt-5">
                    <div className="container">
                        <h2 className="text-center font-weight-bold text-uppercase">
                            <FormattedMessage id="manage-schedule.title-patient" />
                        </h2>
                        <div className="manage-body-body mt-5">
                            <div className="row">
                                <div className="col-4 form-group">
                                    <label>
                                        <FormattedMessage id="manage-schedule.choose-date" />
                                    </label>
                                    <DatePicker
                                        className="form-control choose-date"
                                        value={this.state.currentDate}
                                        onChange={this.handleOnChangeDatePicker}
                                    />
                                </div>
                                <div className="col-12 mt-4">
                                    <table id="TableManageUser">
                                        <tbody>
                                            <tr>
                                                <th> <FormattedMessage id="patient.detail.number" /> </th>
                                                <th> <FormattedMessage id="patient.detail.time" />  </th>
                                                <th> <FormattedMessage id="patient.detail.fullname" />  </th>
                                                <th> <FormattedMessage id="patient.detail.address" />  </th>
                                                <th> <FormattedMessage id="patient.detail.gender" /> </th>
                                                <th><span></span></th>
                                            </tr>
                                            {
                                                dataPatient && dataPatient.length > 0 ?
                                                    dataPatient.map((item, index) => {
                                                        let time = language === LANGUAGES.VI ?
                                                            item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn

                                                        let gender = language === LANGUAGES.VI ?
                                                            item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{time}</td>
                                                                <td>{item.patientData.firstName}</td>
                                                                <td>{item.patientData.address}</td>
                                                                <td>{gender}</td>
                                                                <td>
                                                                    <button
                                                                        className="btn-confirm"
                                                                        onClick={() => this.handleBtnConfirm(item)}
                                                                    >
                                                                        <FormattedMessage id="patient.detail.confirm" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    <>
                                                        <tr className="none">
                                                            <td className="nodata">
                                                                <FormattedMessage id="patient.detail.nodata" />
                                                            </td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    </>
                                            }
                                        </tbody>
                                    </table>
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
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
