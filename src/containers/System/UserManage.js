import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss";
import { getAllUsers,
        createNewUserServices,
        deleteUserServices 
} from "../../services/userService";
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayUsers : [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
        await this.getAllUser();
    }

    getAllUser = async () => {
        let response = await getAllUsers('ALL')
        if(response && response.errCode === 0) {
            this.setState({
                arrayUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserServices(data)
            if(response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUser();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch(e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserServices(user.id)
            if(response && response.errCode === 0) {
                await this.getAllUser()
            } else {
                alert(response.errMessage)
            }
        } catch(e) {
            console.log(e)
        }
    }

    render() {
        let arrayUsers  = this.state.arrayUsers;
        return (
            <div className="container mt-5">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <div className="h2 text-center mb-5">User Management</div>
                <div 
                    className="btn btn-primary mb-2 addUser"
                    onClick={() => this.handleAddNewUser()}
                >
                    Add New Users
                </div>
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th><span></span></th>
                        </tr>
                        {
                            arrayUsers &&
                            arrayUsers.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn btn-edit">
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button 
                                            className="btn btn-delete"
                                            onClick={() => this.handleDeleteUser(item)}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
