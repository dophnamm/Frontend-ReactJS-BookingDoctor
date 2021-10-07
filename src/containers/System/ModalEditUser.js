import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnchange = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({ ...copyState })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for(let i = 0; i < arrInput.length; i++) {
            if(!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === true) {
            //call api
            this.props.editUser(this.state);
        }
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => this.toggle()} 
                className={'modal-user'}
                size="lg"
            >
                <ModalHeader 
                    className="modalHeader" 
                    toggle={() => this.toggle()}
                >
                    Edit User
                </ModalHeader>
                    <ModalBody className="formInput">
                        <div className="input-container">
                            <label> Email </label>
                            <input 
                                type="text" 
                                value={this.state.email}
                                onChange={(e) => this.handleOnchange(e, "email")}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label> Password </label>
                            <input 
                                type="password"
                                value={this.state.password}
                                onChange={(e) => this.handleOnchange(e, "password")}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label> First Name </label>
                            <input 
                                type="text" 
                                value={this.state.firstName}
                                onChange={(e) => this.handleOnchange(e, "firstName")}
                            />
                        </div>
                        <div className="input-container">
                            <label> Last Name </label>
                            <input 
                                type="text" 
                                value={this.state.lastName}
                                onChange={(e) => this.handleOnchange(e, "lastName")}
                            />
                        </div>
                        <div className="input-container">
                            <label> Address </label>
                            <input 
                                type="text" 
                                value={this.state.address}
                                onChange={(e) => this.handleOnchange(e, "address")}
                            />
                        </div>
                    </ModalBody>
                <ModalFooter>
                    <Button 
                        color="primary" 
                        onClick={() => this.handleSaveUser()}
                    >
                        Save Changes
                    </Button>{' '}
                    <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);


