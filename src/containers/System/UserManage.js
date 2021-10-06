import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayUsers : [],
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL')
        if(response && response.errCode === 0) {
            this.setState({
                arrayUsers: response.users
            })
        }
    }


    render() {
        let arrayUsers  = this.state.arrayUsers;
        return (
            <div className="container mt-5">
                <table id="customers">
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>  <span>  </span> </th>
                    </tr>
                        {
                            arrayUsers &&
                            arrayUsers.map((item, index) => (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn btn-edit">
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button className="btn btn-delete">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
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
