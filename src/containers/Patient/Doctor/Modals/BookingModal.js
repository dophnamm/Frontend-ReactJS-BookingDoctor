import React, { Component } from 'react';
import { connect } from "react-redux";
import "./BookingModal.scss"
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import imageTest from '../../../../assets/about.png'
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import { getProfileDoctorById } from '../../../../services/userService';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
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
                            Thông tin đặt lịch khám bệnh
                        </div>
                        <div className="btn-close-modal"
                            onClick={closeBookingModal}
                        >
                            <i className="fas fa-times"></i>
                        </div>
                    </ModalHeader>
                    <ModalBody >
                        <div className="header-modal-booking">
                            <ProfileDoctor doctorId={doctorId} dataTime={dataTime} />
                        </div>

                        <div className="booking-body">
                            <div className="row">
                                <div className="col-6 form-group booking-input">
                                    <label>Họ tên bệnh nhân</label>
                                    <input className="form-control" />
                                </div>

                                <div className="col-6 form-group booking-input">
                                    <label>Số điện thoại</label>
                                    <input className="form-control" />
                                </div>

                                <div className="col-6 form-group booking-input">
                                    <label>Địa chỉ Email</label>
                                    <input className="form-control" />
                                </div>

                                <div className="col-6 form-group booking-input">
                                    <label>Địa chỉ liên hệ</label>
                                    <input className="form-control" />
                                </div>

                                <div className="col-12 form-group booking-input">
                                    <label>Lý do khám</label>
                                    <input className="form-control" />
                                </div>

                                <div className="col-6 form-group booking-input">
                                    <label>Đặt cho ai</label>
                                    <input className="form-control" />
                                </div>

                                <div className="col-6 form-group booking-input">
                                    <label>Giới tính</label>
                                    <input className="form-control" />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="btn-submit"
                            onClick={() => this.handleAddNewUser()}
                        >
                            Xác Nhận
                        </Button>{' '}
                        <Button className="btn-cancel" onClick={closeBookingModal}>Thoát</Button>
                    </ModalFooter>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
