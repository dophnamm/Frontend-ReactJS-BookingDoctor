import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DetailClinic.scss"
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailClinicById, getAllServiecs } from '../../../services/userService';
import _ from 'lodash';

class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataClinic: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id

            let res = await getAllDetailClinicById({
                id: id,
            })
            if (res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }


    render() {
        let { arrDoctorId, dataClinic } = this.state
        let { language } = this.props
        console.log()
        return (
            <>
                <HomeHeader />
                <div className="detail-specialty-container mt-5">
                    <div className="container">
                        <div className="desc-specialty">
                            <div className="content-specialty">
                                {
                                    dataClinic && !_.isEmpty(dataClinic) &&
                                    <>
                                        <h1>{dataClinic.name}</h1>
                                        <div dangerouslySetInnerHTML={{ __html: dataClinic.descriptionHTML }}>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>

                        {
                            arrDoctorId && arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {
                                return (
                                    <div className="detail-item" key={index}>
                                        <div className="row">
                                            <div className="col-6 content-left">
                                                <ProfileDoctor doctorId={item}
                                                    isShowDescription={true}
                                                    isShowLinkDetail={true}
                                                />
                                            </div>
                                            <div className="col-6 content-right">
                                                <DoctorSchedule
                                                    doctorIdFromParent={item}
                                                />
                                                <br />
                                                <DoctorExtraInfo
                                                    doctorIdFromParent={item}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
