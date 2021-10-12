import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss"
import { LANGUAGES } from '../../../utils';

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false
        }
    }

    async componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    showHide = (status) => {
        this.setState({ isShowDetailInfo: status })
    }

    render() {
        let { isShowDetailInfo } = this.state
        return (
            <>
                <div className="main-extra-info">
                    <div className="content-up">
                        <div className="address-doctor">Địa Chỉ Khám </div>
                        <div className="name-clinic">Phòng khám Chuyên Khoa Da Liễu</div>
                        <p className="detail-address">207 pho hue hai ba trung ha noi</p>
                    </div>

                    <div className="content-down">
                        <div className="title-price">
                            <h3>Giá Khám</h3>
                            {
                                isShowDetailInfo === false ?
                                    <p onClick={() => this.showHide(true)}>Xem Thông Tin</p>
                                    :
                                    <p onClick={() => this.showHide(false)}>Ẩn Thông Tin</p>
                            }
                        </div>


                        <div className={isShowDetailInfo === true ? "detail-price active" : "detail-price"}>
                            <div className="detail-price-up">
                                <div className="sub-price">
                                    <div className="left">Giá Khám</div>
                                    <div className="right">250.000</div>
                                </div>
                                <p>Được ưu tiên khám trước khi đặt khám qua Healthy Happy. Giá Khám cho
                                    người nước ngoài là 30 USD </p>
                            </div>
                            <div className="detail-price-down">Người bệnh có thể thanh toán chi phí bằng hình thức
                                tiền mặt và quẹt thẻ .
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
