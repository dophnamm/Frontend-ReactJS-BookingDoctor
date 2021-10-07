import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => this.toggle()} 
                className={'modal-user'}
                size="lg"
            >
                <ModalHeader className="modalHeader" toggle={() => this.toggle()}>Create A New User</ModalHeader>
                    <ModalBody className="formInput">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text" />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password" />
                        </div>
                        <div className="input-container">
                            <label>First Name</label>
                            <input type="text" />
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input type="text" />
                        </div>
                        <div className="input-container">
                            <label>Address</label>
                            <input type="text" />
                        </div>
                    </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.toggle()}>Create</Button>{' '}
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


