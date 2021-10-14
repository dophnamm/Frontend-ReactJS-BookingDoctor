import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Specialty.scss";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpecialtyImg from "../../../assets/specialty/co-xuong-khop.png";
import { getAllSpecialty } from '../../../services/userService';

class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        console.log('check response', res)
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }


    render() {
        let { dataSpecialty } = this.state
        return (
            <div className="section-specialty">
                <div className="section-content">
                    <div className="section-header">
                        <div className="sub-header">
                            <FormattedMessage id="homepage.specialty" />
                        </div>
                        <button>
                            <FormattedMessage id="homepage.more" />
                        </button>
                    </div>

                    <Slider {...this.props.settings}>
                        {
                            dataSpecialty && dataSpecialty.length > 0 &&
                            dataSpecialty.map((item, index) => {
                                return (
                                    <div className="item-block" key={item.id}>
                                        <div className="item">
                                            <img src={item.image} alt={item.name} />
                                            <p>{item.name}</p>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
