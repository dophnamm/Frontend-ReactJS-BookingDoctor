import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }

    componentDidMount() {
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

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === true) {
            //call api
            this.props.createNewUser(this.state);
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
                    Create A New User
                </ModalHeader>
                    <ModalBody className="formInput">
                        <div className="input-container">
                            <label> Email </label>
                            <input 
                                type="text" 
                                value={this.state.email}
                                onChange={(e) => this.handleOnchange(e, "email")}
                            />
                        </div>
                        <div className="input-container">
                            <label> Password </label>
                            <input 
                                type="password"
                                value={this.state.password}
                                onChange={(e) => this.handleOnchange(e, "password")}
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
                        onClick={() => this.handleAddNewUser()}
                    >
                        Create
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


