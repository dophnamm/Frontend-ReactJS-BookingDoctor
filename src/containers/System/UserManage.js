import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss";
import { getAllUsers,
        createNewUserServices,
        deleteUserServices,
        editUserServices 
} from "../../services/userService";
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayUsers : [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
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

    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
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

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let response = await editUserServices(user);
            if(response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUser()
            } else {
                alert(response.errCode)
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

                { 
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser 
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }

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
                            <th><FormattedMessage id="manage-user.email"/></th>
                            <th><FormattedMessage id="manage-user.first-name"/></th>
                            <th><FormattedMessage id="manage-user.last-name"/></th>
                            <th><FormattedMessage id="manage-user.address"/></th>
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
                                        <button 
                                            className="btn btn-edit"
                                            onClick={() => this.handleEditUser(item)}
                                        >
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
