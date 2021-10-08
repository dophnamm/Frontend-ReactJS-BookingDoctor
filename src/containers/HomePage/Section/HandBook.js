import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HandBook.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpecialtyImg from "../../../assets/specialty/co-xuong-khop.png";

class HandBook extends Component {

    render() {
        return (
           <div className="section-handbook">
                <div className="section-content">

                    <div className="section-header">
                        <div className="sub-header">Cẩm Nang</div>
                        <button>Xem Thêm</button>
                    </div>

                    <Slider {...this.props.settings}>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
