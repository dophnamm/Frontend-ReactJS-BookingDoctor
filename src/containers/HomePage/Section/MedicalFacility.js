import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpecialtyImg from "../../../assets/specialty/co-xuong-khop.png";
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`)
        }
    }

    render() {
        let { dataClinics } = this.state
        return (
            <div className="section-medical-facility">
                <div className="section-content">

                    <div className="section-header">
                        <div className="sub-header">
                            <FormattedMessage id="homepage.clinic" />
                        </div>
                        <button>
                            <FormattedMessage id="homepage.more" />
                        </button>
                    </div>

                    <Slider {...this.props.settings}>
                        {
                            dataClinics && dataClinics.length > 0 &&
                            dataClinics.map((item, index) => (
                                <div className="item-block" key={index}
                                    onClick={() => this.handleViewDetailClinic(item)}
                                >
                                    <div className="item">
                                        <img src={item.image} alt={item.name} />
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            ))
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
