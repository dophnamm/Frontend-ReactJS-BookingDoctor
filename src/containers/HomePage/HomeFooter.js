import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";
import { FormattedMessage } from "react-intl";
import logo from "../../assets/logo.svg";
import { BsPhone, BsInstagram } from "react-icons/bs";
import { IoMailUnread } from "react-icons/io5";
import { FaFacebookSquare, FaTwitter } from "react-icons/fa";
import { ImLinkedin2 } from "react-icons/im";
import { Link } from "react-router-dom";

class HomeFooter extends Component {
	render() {
		return (
			<>
				<div className="footer-total-services">
					<div className="container-lg">
						<div className="row">
							<div className="col-4">
								<div className="main-link-logo">
									<div className="footer-logo">
										<img src={logo} alt="logo-img" />
										<h2>Health Care</h2>
									</div>
									<div className="logo-social">
										<ul>
											<li>
												<FaFacebookSquare className="logo-icon-sc" />
											</li>
											<li>
												<FaTwitter className="logo-icon-sc" />
											</li>
											<li>
												<BsInstagram className="logo-icon-sc" />
											</li>
											<li>
												<ImLinkedin2 className="logo-icon-sc" />
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-8 ">
								<div className="main-link">
									<div className="item-link">
										<h3 className="title-link">
											<FormattedMessage id="footer.site-link.site" />
										</h3>
										<ul>
											<li>
												<Link to="/home">
													<FormattedMessage id="footer.site-link.home" />{" "}
												</Link>
											</li>
											<li>
												<FormattedMessage id="footer.site-link.about-us" />
											</li>
											<li>
												<FormattedMessage id="footer.site-link.services" />
											</li>
											<li>
												<FormattedMessage id="footer.site-link.doctors" />
											</li>
											<li>
												<FormattedMessage id="footer.site-link.blog" />
											</li>
										</ul>
									</div>

									<div className="item-link">
										<h3 className="title-link">
											<FormattedMessage id="footer.our-services.our" />
										</h3>
										<ul>
											<li>
												<FormattedMessage id="footer.our-services.dermetology" />
											</li>
											<li>
												<FormattedMessage id="footer.our-services.cardiology" />
											</li>
											<li>
												<FormattedMessage id="footer.our-services.surgery" />
											</li>
											<li>
												<FormattedMessage id="footer.our-services.family-medicine" />
											</li>
										</ul>
									</div>

									<div className="item-link">
										<h3 className="title-link">
											<FormattedMessage id="footer.contact.contact" />
										</h3>
										<ul>
											<li>
												<BsPhone className="footer-icon-link" />
												+84 76464 1209
											</li>
											<li>
												<IoMailUnread className="footer-icon-link" />
												healthcare@gmail.com
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="section-footer">
					<div className="section-content">
						<div className="footer-main">
							<div className="footer-left">
								<p>&copy; Copyright 2021 HUTECH, Inc. </p>
							</div>

							<div className="footer-center">
								<ul>
									<li>
										<a href="/">
											<i className="fab fa-facebook-square"></i>
										</a>
									</li>

									<li>
										<a href="/">
											<i className="fab fa-linkedin"></i>
										</a>
									</li>

									<li>
										<a href="/">
											<i className="fab fa-instagram"></i>
										</a>
									</li>

									<li>
										<a href="/">
											<i className="fas fa-hospital"></i>
										</a>
									</li>
								</ul>
							</div>

							<div className="footer-right">
								<p>Design By Phuong Nam</p>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
