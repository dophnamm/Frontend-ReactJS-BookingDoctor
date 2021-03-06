import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss";

class HomePage extends Component {
	render() {
		let settings = {
			dots: false,
			infinity: true,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [
				{
					breakpoint: 1023,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						initialSlide: 3,
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						initialSlide: 2,
					},
				},
			],
		};
		return (
			<div>
				<div>
					<HomeHeader isShowBanner={true} />
					<Specialty settings={settings} />
					<MedicalFacility settings={settings} />
					<OutStandingDoctor settings={settings} />
					<About />
					<HomeFooter />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
