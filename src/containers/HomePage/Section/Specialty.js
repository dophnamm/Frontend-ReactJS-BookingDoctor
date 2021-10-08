import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpecialtyImg from "../../../assets/specialty/co-xuong-khop.png";

class Specialty extends Component {

    render() {
        let settings = {
            dots: false,
            infinity: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
        }

        return (
           <div className="section-specialty">
                <div className="specialty-content">

                    <div className="specialty-header">
                        <div className="sub-header">Chuyên Khoa Phổ Biến</div>
                        <button>Xem Thêm</button>
                    </div>

                    <Slider {...settings}>
                        <div className="item-block">
                            <div className="item">
                                <img src={SpecialtyImg} alt="co-xuong-khop"/>
                                <p>Cơ Xương Khớp</p>
                            </div>
                        </div>
                        <div className="item-block">
                            <div className="item">
                                <img src={SpecialtyImg} alt="co-xuong-khop"/>
                                <p>Cơ Xương Khớp</p>
                            </div>
                        </div>
                        <div className="item-block">
                            <div className="item">
                                <img src={SpecialtyImg} alt="co-xuong-khop"/>
                                <p>Cơ Xương Khớp</p>
                            </div>
                        </div>
                        <div className="item-block">
                            <div className="item">
                                <img src={SpecialtyImg} alt=" co-xuong-khop"/>
                                <p>Cơ Xương Khớp</p>
                            </div>
                        </div>
                        <div className="item-block">
                            <div className="item">
                                <img src={SpecialtyImg} alt="co-xuong-khop"/>
                                <p>Cơ Xương Khớp</p>
                            </div>
                        </div>
                        <div className="item-block">
                            <div className="item">
                                <img src={SpecialtyImg} alt="co-xuong-khop"/>
                                <p>Cơ Xương Khớp</p>
                            </div>
                        </div>
                        <div className="item-block">
                            <div className="item">
                                <img src={SpecialtyImg} alt="co-xuong-khop"/>
                                <p>Cơ Xương Khớp</p>
                            </div>
                        </div>
                        <div className="item-block">
                            <div className="item">
                                <img src={SpecialtyImg} alt="co-xuong-khop"/>
                                <p>Cơ Xương Khớp</p>
                            </div>
                        </div>
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
