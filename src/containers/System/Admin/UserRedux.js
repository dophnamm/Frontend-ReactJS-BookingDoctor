import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserRedux.scss";
import { LANGUAGES } from "../../../utils";
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //render => Didupdate
        if(prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }

        // Role redux
        if(prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }

        // Position redux
        if(prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }
    }

    onChangeImage = (e) => {
        let data = e.target.files
        let file = data[0]
        if(file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl
            })
        }
    }

    openImage = () => {
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    render() {
        let genders = this.state.genderArr
        let roles = this.state.roleArr
        let positions = this.state.positionArr
        let language = this.props.language
        let isLoadingGender = this.props.isLoadingGender
        return (
            <div className="container-user">
                <div className="user-body">
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-12 text-center h2">
                                {isLoadingGender === true ? 'Loading ...' : ''}
                            </div>
                            <div className="col-12">
                                 <div className="body-header">
                                     <h3>
                                         <FormattedMessage id="manage-user.add"/>
                                     </h3>
                                 </div>
                            </div>
                            <div className="col-6">
                                <div className="item-input">
                                    <p>
                                        <FormattedMessage id="manage-user.email"/>
                                    </p>
                                    <input className="form-control" type="email" placeholder="Email"/>
                                </div>
                            </div>

                            <div className="col-6">
                               <div className="item-input">
                                    <p>
                                        <FormattedMessage id="manage-user.password"/>
                                    </p>
                                    <input className="form-control" type="password" placeholder="Password"/>
                               </div>
                            </div>

                            <div className="col-6">
                                <div className="item-input">
                                    <p>
                                        <FormattedMessage id="manage-user.first-name"/>
                                    </p>
                                    <input className="form-control" type="text" placeholder="First Name"/>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="item-input">
                                    <p>
                                        <FormattedMessage id="manage-user.last-name"/>
                                    </p>
                                    <input className="form-control" type="text" placeholder="Last Name"/>
                                </div>
                            </div>

                            <div className="col-4">
                                <div className="item-input">
                                    <p>
                                        <FormattedMessage id="manage-user.phone"/>
                                    </p>
                                    <input className="form-control" type="text" placeholder="Phone Number"/>
                                </div>
                            </div>

                            <div className="col-8">
                                <div className="item-input">
                                    <p>
                                        <FormattedMessage id="manage-user.address"/>
                                    </p>
                                    <input className="form-control" type="text" placeholder="Address"/>
                                </div>
                            </div>

                            <div className="col-5">
                                <div className="item-input">
                                    <p>
                                        <FormattedMessage id="manage-user.position"/>
                                    </p>
                                    <select defaultValue={'DEFAULT'} className="form-control">
                                        <option value="DEFAULT" selected>
                                            {/* <FormattedMessage id="manage-user.choose"/> */}
                                            Choose...
                                        </option>
                                        {
                                            positions && positions.length > 0 &&
                                            positions.map((item, index) => (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI ?
                                                    item.valueVi : item.valueEn}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="col-5">
                                <div className="item-input">
                                    <p>
                                        <FormattedMessage id="manage-user.role"/>
                                    </p>
                                    <select defaultValue={'DEFAULT'} className="form-control">
                                        <option value="DEFAULT" selected>
                                            {/* <FormattedMessage id="manage-user.choose"/> */}
                                            Choose...
                                        </option>
                                        {
                                            roles && roles.length > 0 &&
                                            roles.map((item, index) => (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI ?
                                                    item.valueVi : item.valueEn}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>


                            <div className="col-2">
                                <div className="item-input">
                                    <p>
                                        <FormattedMessage id="manage-user.gender"/>
                                    </p>
                                    <select defaultValue={'DEFAULT'} className="form-control">
                                        <option value="DEFAULT" selected>
                                            {/* <FormattedMessage id="manage-user.choose"/> */}
                                            Choose...
                                        </option>
                                        {
                                            genders && genders.length &&
                                            genders.map((item, index) => (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI ?
                                                    item.valueVi : item.valueEn}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="item-input">
                                    <p>
                                        <FormattedMessage id="manage-user.image"/>
                                    </p>
                                    <div className="choose-image">
                                        <input id="previewImg" hidden type="file" 
                                            onChange={(e) => this.onChangeImage(e)}
                                        />
                                        <label htmlFor="previewImg">
                                            <FormattedMessage id="manage-user.upimage"/>
                                            <i className="fas fa-camera-retro"></i> 
                                        </label>
                                        <div className="preview-image" 
                                            style={{ backgroundImage: `url(${this.state.previewImgURL})`}}
                                            onClick={() => this.openImage()}
                                        >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {this.state.isOpen &&
                                <Lightbox
                                    mainSrc={this.state.previewImgURL}
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                />
                            }

                            <div className="col-12">
                                <button className="btn-save">
                                    <FormattedMessage id="manage-user.save"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()), 
        getRoleStart: () => dispatch(actions.fetchRoleStart())

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
