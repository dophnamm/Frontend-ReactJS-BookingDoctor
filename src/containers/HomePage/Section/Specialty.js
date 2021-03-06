import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from "react-router";

class Specialty extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSpecialty: [],
		};
	}

	async componentDidMount() {
		let res = await getAllSpecialty();
		console.log("check response", res);
		if (res && res.errCode === 0) {
			this.setState({
				dataSpecialty: res.data ? res.data : [],
			});
		}
	}

	handleViewDetailSpecialty = (item) => {
		if (this.props.history) {
			this.props.history.push(`/detail-specialty/${item.id}`);
		}
	};

	render() {
		let { dataSpecialty } = this.state;
		return (
			<div className="section-specialty">
				<div className="section-content">
					<div className="section-header">
						<div className="sub-header">
							<FormattedMessage id="homepage.specialty" />
						</div>
						<button>
							<FormattedMessage id="homepage.more" />
						</button>
					</div>

					<Slider {...this.props.settings}>
						{dataSpecialty &&
							dataSpecialty.length > 0 &&
							dataSpecialty.map((item) => {
								return (
									<div
										className="item-block"
										key={item.id}
										onClick={() => this.handleViewDetailSpecialty(item)}
									>
										<div className="item">
											<img src={item.image} alt={item.name} />
											<p>{item.name}</p>
										</div>
									</div>
								);
							})}
					</Slider>
				</div>
			</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
