import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserRedux.scss";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: '',
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
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        // Role redux
        if(prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }

        // Position redux
        if(prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position:  arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }

        if(prevProps.listUsers !== this.props.listUsers) {
            let arrRoles = this.props.roleRedux
            let arrGenders = this.props.genderRedux
            let arrPositions = this.props.positionRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                avatar: '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position:  arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }
    }

    onChangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if(file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    openImage = () => {
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        })
    }

    onChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 
                        'firstName', 'lastName', 
                        'phoneNumber', 'address']
        for(let i = 0; i < arrCheck.length; i++) {
            if(!this.state[arrCheck[i]]) {
                isValid = false
                alert('This input is require ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if(isValid === false) return;
        let { action } = this.state;


        if(action === CRUD_ACTIONS.CREATE) {
            // action create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                phonenumber: this.state.phoneNumber,
                avatar: this.state.avatar
            })
        }

        if(action === CRUD_ACTIONS.EDIT) {
            // action edit
            this.props.editAUser({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                phonenumber: this.state.phoneNumber,
                avatar: this.state.avatar,
            })
        }
        
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = ''
        if(user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'hardcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            avatar: '',
            previewImgURL: imageBase64,
            role: user.roleId,
            gender: user.gender,
            position:  user.positionId,
            action:  CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }

    render() {
        let genders = this.state.genderArr
        let roles = this.state.roleArr
        let positions = this.state.positionArr
        let language = this.props.language
        let isLoadingGender = this.props.isLoadingGender
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state

        return (
            <div className="container-user">
                <div className="user-body">
                    <div className="container mt-5 height-custom">
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
                                    <input 
                                        className="form-control" 
                                        type="email" 
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => this.onChangeInput(e, 'email')}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    />
                                </div>
                            </div>

                            <div className="col-6">
                               <div className="item-input">
                                    <p>
                                        <FormattedMessage id="manage-user.password"/>
                                    </p>
                                    <input 
                                        className="form-control" 
                                        type="password" 
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => this.onChangeInput(e, 'password')}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    />
                               </div>
                            </div>

                            <div className="col-6">
                                <div className="item-input">
                                    <p>
                                        <FormattedMessage id="manage-user.first-name"/>
                                    </p>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={(e) => this.onChangeInput(e, 'firstName')}
                                    />
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="item-input">
                                    <p>
                                        <FormattedMessage id="manage-user.last-name"/>
                                    </p>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={(e) => this.onChangeInput(e, 'lastName')}
                                    />
                                </div>
                            </div>

                            <div className="col-4">
                                <div className="item-input">
                                    <p>
                                        <FormattedMessage id="manage-user.phone"/>
                                    </p>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="Phone Number"
                                        value={phoneNumber}
                                        onChange={(e) => this.onChangeInput(e, 'phoneNumber')}
                                    />
                                </div>
                            </div>

                            <div className="col-8">
                                <div className="item-input">
                                    <p>
                                        <FormattedMessage id="manage-user.address"/>
                                    </p>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => this.onChangeInput(e, 'address')}
                                    />
                                </div>
                            </div>

                            <div className="col-5">
                                <div className="item-input">
                                    <p>
                                        <FormattedMessage id="manage-user.position"/>
                                    </p>
                                    <select className="form-control"
                                        onChange={(e) => this.onChangeInput(e, 'position')}
                                        value={position}
                                    >
                                        {
                                            positions && positions.length > 0 &&
                                            positions.map((item, index) => (
                                                <option key={index} value={item.keyMap}>
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
                                    <select className="form-control"
                                        onChange={(e) => this.onChangeInput(e, 'role')}
                                        value={role}
                                    >
                                        {
                                            roles && roles.length > 0 &&
                                            roles.map((item, index) => (
                                                <option key={index} value={item.keyMap}>
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
                                    <select className="form-control"
                                        onChange={(e) => this.onChangeInput(e, 'gender')}
                                        value={gender}
                                    >
                                        {
                                            genders && genders.length &&
                                            genders.map((item, index) => (
                                                <option key={index} value={item.keyMap}>
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
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn-save-edit" : "btn-save"}
                                    onClick={() => this.handleSaveUser()}
                                >   
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit"/> : <FormattedMessage id="manage-user.save"/>
                                    } 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table show user */}
                <TableManageUser 
                    handleEditUserFromParent={this.handleEditUserFromParent}
                    action={this.state.action}
                />
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
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()), 
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editAUser: (data) => dispatch(actions.editAUser(data)),


        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
