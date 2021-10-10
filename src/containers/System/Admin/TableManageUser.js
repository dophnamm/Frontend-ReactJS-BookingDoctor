import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableManageUser.scss";
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRudex(user.id)
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }

    render() {
        let arrUsers = this.state.userRedux
        return (
            <>
                <div className="container mt-5 mb-5 height-custom">
                    <table id="TableManageUser">
                        <tbody>
                            <tr>
                                <th><FormattedMessage id="manage-user.email"/></th>
                                <th><FormattedMessage id="manage-user.first-name"/></th>
                                <th><FormattedMessage id="manage-user.last-name"/></th>
                                <th><FormattedMessage id="manage-user.address"/></th>
                                <th><span></span></th>
                            </tr>
                            {
                                arrUsers && arrUsers.length > 0 &&
                                arrUsers.map((item, index) => (
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
                <MdEditor style={{ height: '500px', marginTop: '80px', marginBottom: '80px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRudex: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
