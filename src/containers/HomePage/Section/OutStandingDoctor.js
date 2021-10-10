import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutStandingDoctor.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpecialtyImg from "../../../assets/specialty/co-xuong-khop.png";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/";
import { withRouter } from 'react-router';


class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors()
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props
        return (
           <div className="section-outstanding-doctor">
                <div className="section-content">

                    <div className="section-header">
                        <div className="sub-header">
                            <FormattedMessage id="homepage.outstanding-doctor"/>
                        </div>
                        <button>
                            <FormattedMessage id="homepage.more"/>
                        </button>
                    </div>

                    <Slider {...this.props.settings}>
                        {
                            arrDoctors && arrDoctors.length > 0 &&
                            arrDoctors.map((item, index) => {
                                let imageBase64 = ''
                                if(item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                let nameVi= `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`
                                let nameEn= `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                return (
                                    <div className="item-block" key={index} 
                                        onClick={() => this.handleViewDetailDoctor(item)}
                                    >
                                        <div className="item">
                                            <div className="bg-img"
                                                style={{ backgroundImage: `url(${imageBase64})`}}
                                            />
                                            <p>{language === LANGUAGES.VI ? nameVi : nameEn}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
           </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
