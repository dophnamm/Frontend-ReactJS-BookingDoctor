import React, { Component } from 'react';
import { connect } from "react-redux";
import "./BookingModal.scss"
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import imageTest from '../../../../assets/about.png'

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
        let { isOpenModalBooking, closeBookingModal, dataTime } = this.props
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
                            <div className="doctor-info">
                                <img className="doctor-img" src={imageTest} alt="avt" />
                                <div className="intro-doctor">
                                    <div className="booking-schedule">Đặt lịch khám</div>
                                    <div className="name-doctor">Phó giao sư, tiến sĩ, bác sĩ Doctor One</div>
                                    <div className="dated-choose">15:00 - 15:30 - Thứ 4 - 13/10/2021</div>
                                    <p>Miễn phí đặt lịch</p>
                                </div>
                            </div>
                        </div>

                        <div className="booking-body">
                            <div className="price"> Giá Khám: 250.000 </div>
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
                                    <label>Đặ cho ai</label>
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
