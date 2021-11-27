import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

import { handleLogin } from "../../services/userService";
import { userLoginSuccess } from "../../store/actions";
import RingLoader from "react-spinners/RingLoader";
import LoadingOverlay from "react-loading-overlay";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			password: "",
			errMessage: "",
			isShowOverlay: false,
		};
	}

	handleOnChangeUserName = (e) => {
		this.setState({
			userName: e.target.value,
		});
	};

	handleOnChangePass = (e) => {
		this.setState({
			password: e.target.value,
		});
	};

	handleLogin = async () => {
		this.setState({
			errMessage: "",
			isShowOverlay: true,
		});
		try {
			let data = await handleLogin(this.state.userName, this.state.password);
			if (data && data.errCode !== 0) {
				this.setState({
					errMessage: data.message,
				});
			}

			if (data && data.errCode === 0) {
				this.props.userLoginSuccess(data.user);
				this.setState({
					isShowOverlay: false,
				});
			}
		} catch (error) {
			if (error.response) {
				if (error.response.data) {
					this.setState({
						errMessage: error.response.data.message,
					});
				}
			}
		}
	};

	handleEnterLogin = (e) => {
		if (e.keyCode === 13) {
			this.handleLogin();
		}
	};

	render() {
		return (
			<LoadingOverlay active={this.state.isShowOverlay} spinner={<RingLoader color={"rgb(209, 228, 239)"} />}>
				<div className="login-form">
					<div className="login-form-container">
						<div className="login-content row">
							<div className="col-12 text-center login-content-header"> Login </div>
							<div className="col-12 form-group">
								<label>User Name</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter Your User Name"
									value={this.state.userName}
									onChange={(e) => this.handleOnChangeUserName(e)}
								/>
							</div>
							<div className="col-12 form-group">
								<label>Password</label>
								<input
									type="password"
									className="form-control"
									value={this.state.password}
									placeholder="Enter Your Password"
									onChange={(e) => this.handleOnChangePass(e)}
									onKeyDown={this.handleEnterLogin}
								/>
							</div>
							<div className="col-12" style={{ color: "red" }}>
								{this.state.errMessage}
							</div>
							<div className="col-12">
								<button className="btn-login" onClick={() => this.handleLogin()}>
									Login
								</button>
							</div>
							<div className="col-12">
								<span className="forgot-password">Forgot your password ?</span>
							</div>
							<div className="col-12 text-center mt-4 mb-4 bt">
								<span className="h2 text-uppercase">Login with</span>
							</div>
							<div className="col-12 social-login text-center mb-4">
								<span>
									<i className="fab fa-facebook-square"></i>Facebook
								</span>
								<span>
									<i className="fab fa-google-plus-square"></i>Google
								</span>
							</div>
						</div>
					</div>
				</div>
			</LoadingOverlay>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		navigate: (path) => dispatch(push(path)),
		userLoginFail: () => dispatch(actions.userLoginFail()),
		userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
