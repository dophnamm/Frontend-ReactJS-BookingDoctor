import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import "./DetailDoctor.scss"
import { getDetailInfoDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class DetailDoctor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailInfoDoctor(id)
            if(res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { detailDoctor } = this.state
        let { language } = this.props
        let nameVi = ''
        let nameEn = ''
        if(detailDoctor && detailDoctor.positionData){
            nameVi= `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
            nameEn= `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className=" container doctor-detail-container mt-5">
                    <div className="row intro-doctor">
                        <div className="col-4 content-left ">
                            <div className="doctor-img"
                                style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`}}
                            >
                            </div>
                        </div>

                        <div className="col-8 content-right">
                            <h3 className="name-doctor">
                                {
                                    language === LANGUAGES.VI ? nameVi : nameEn
                                }
                            </h3>
                            <div className="desc-doctor">
                                {detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                    <span>
                                        {detailDoctor.Markdown.description} <br/>                                    </span>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="schedule-doctor">

                    </div>
                </div>
                <div className="main-detail">
                    <div className="container">
                        <div className=" detail-info-doctor">
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                                    && 
                                    <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML}}>
                                    </div>
                                }
                        </div>
                        <div className="container comment-doctor">

                        </div>
                    </div>
                </div>
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
