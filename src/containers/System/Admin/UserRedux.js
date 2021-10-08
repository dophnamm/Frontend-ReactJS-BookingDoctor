import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserRedux.scss";
import { getAllServiecs } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllServiecs('gender');
            if(res && res.errCode === 0) {
                this.setState({
                    genderArr: res.data
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let genders = this.state.genderArr
        let language = this.props.language
        return (
            <div className="container-user">
                <div className="user-body">
                    <div className="container mt-5">
                        <div className="row">
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
                                    <input type="text" className="form-control"/>
                                </div>
                            </div>

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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
