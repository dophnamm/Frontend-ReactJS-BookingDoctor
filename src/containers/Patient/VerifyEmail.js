import React, { Component } from 'react';
import { connect } from "react-redux";
import "./VerifyEmail.scss"
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../HomePage/HomeHeader';
import { postVerifyBookAppointment } from '../../services/userService';
import logoSuccess from '../../assets/success.png';
import logoError from '../../assets/notdata.png';

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlPramas = new URLSearchParams(this.props.location.search)
            let token = urlPramas.get('token')
            let doctorId = urlPramas.get('doctorId')
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })

            if (res && res.errCode === 0) {
                this.setState({ statusVerify: true, errCode: res.errCode })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    render() {
        let { statusVerify, errCode } = this.state
        return (
            <>
                <HomeHeader />
                {
                    statusVerify === false ?
                        <div className="info-booking-load">
                            Loading ...
                        </div>

                        :

                        <div>
                            {+errCode === 0 ?

                                <div className="info-booking-success">
                                    <div className="title-booking">
                                        <h3>
                                            <FormattedMessage id="verify.success" />
                                        </h3>
                                        <p>
                                            <b>
                                                <FormattedMessage id="verify.title-success-one" />
                                            </b>.
                                            <FormattedMessage id="verify.title-success-two" />
                                        </p>
                                    </div>
                                    <img className="logo-booking" src={logoSuccess} alt='logoSuccess' />
                                </div>

                                :

                                <div className="info-booking-error">
                                    <div className="title-booking">
                                        <h3>
                                            <FormattedMessage id="verify.error" />
                                        </h3>
                                        <p> <FormattedMessage id="verify.title-error-one" />
                                            <a href="/">hotline</a>
                                            <FormattedMessage id="verify.title-error-two" />
                                        </p>
                                    </div>
                                    <img className="logo-booking" src={logoError} alt='logoError' />
                                </div>}
                        </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
