import React, { Component } from 'react';
import { connect } from "react-redux";
import "./RemedyModal.scss"
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import { toast } from 'react-toastify';
import moment from 'moment';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: ''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    onChangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }

    render() {
        let { isOpenRemedyOpenModal, isCloseModal, dataModal, sendRemedy } = this.props
        return (
            <>
                <Modal
                    isOpen={isOpenRemedyOpenModal}
                    className={'booking-modal-container'}
                    size="lg"
                    centered
                >
                    <ModalHeader className="booking-modal-header">
                        <div className="header">
                            <FormattedMessage id="patient.booking-modal.bill" />
                        </div>
                        <div className="btn-close-modal"
                            onClick={isCloseModal}
                        >
                            <i className="fas fa-times"></i>
                        </div>
                    </ModalHeader>
                    <ModalBody >
                        <div className="container mt-4 p-4">
                            <div className="row">
                                <div className="col-12 form-group">
                                    <label className="mb-2">
                                        <FormattedMessage id="patient.detail.email-patient" />
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control custom"
                                        value={this.state.email}
                                        onChange={(e) => this.handleOnChangeEmail(e)}
                                    />
                                </div>
                                <div className="col-12 form-group mt-2">
                                    <div className="mb-2">
                                        <FormattedMessage id="patient.detail.file" />
                                    </div>
                                    <label className="choose-file" htmlFor="viewfile">
                                        <FormattedMessage id="patient.detail.choose-file" />
                                        <i className="fas fa-archive"></i>
                                    </label>
                                    <input id="viewfile" type="file" hidden
                                        onChange={(e) => this.onChangeImage(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="btn-submit"
                            onClick={() => this.handleSendRemedy()}
                        >
                            <FormattedMessage id="patient.detail.send" />
                        </Button>{' '}
                        <Button className="btn-cancel"
                            onClick={isCloseModal}
                        >
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
