import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import "./DetailDoctor.scss";
import { getDetailInfoDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import LoadingOverlay from "react-loading-overlay";
import RingLoader from "react-spinners/RingLoader";
import LikeShare from "../../SocialPlugin/LikeShare";
import Comment from "../../SocialPlugin/Comment";

class DetailDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailDoctor: {},
			currentDoctorId: -1,
			isShowLoading: false,
		};
	}

	async componentDidMount() {
		if (this.props.match && this.props.match.params && this.props.match.params.id) {
			let id = this.props.match.params.id;
			this.setState({
				currentDoctorId: id,
			});
			let res = await getDetailInfoDoctor(id);
			if (res && res.errCode === 0) {
				this.setState({
					detailDoctor: res.data,
				});
			}
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {}

	handleLoadingOverlay = () => {
		this.setState({
			isShowLoading: !this.state.isShowLoading,
		});
	};

	render() {
		let { detailDoctor } = this.state;
		let { language } = this.props;
		let nameVi = "";
		let nameEn = "";
		if (detailDoctor && detailDoctor.positionData) {
			nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
			nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
		}

		let currentURL = +process.env.REACT_APP_IS_LOCALHOST === 1 ? "https://healthbooking.herokuapp.com/" : window.location.href;
		return (
			<>
				<LoadingOverlay active={this.state.isShowLoading} spinner={<RingLoader color={"rgb(209, 228, 239)"} />}>
					<HomeHeader isShowBanner={false} />
					<div className=" container doctor-detail-container mt-5">
						<div className="row intro-doctor">
							<div className="col-4 content-left ">
								<div
									className="doctor-img"
									style={{
										backgroundImage: `url(${
											detailDoctor && detailDoctor.image
												? detailDoctor.image
												: ""
										})`,
									}}
								></div>
							</div>

							<div className="col-8 content-right">
								<h3 className="name-doctor">{language === LANGUAGES.VI ? nameVi : nameEn}</h3>
								<div className="desc-doctor">
									{detailDoctor.Markdown && detailDoctor.Markdown.description && (
										<span>
											{detailDoctor.Markdown.description} <br />
										</span>
									)}
								</div>
								<LikeShare dataHref={currentURL} />
							</div>
						</div>

						<div className="schedule-doctor row">
							<div className="content-left col-7">
								<DoctorSchedule
									handleLoadingOverlay={this.handleLoadingOverlay}
									doctorIdFromParent={this.state.currentDoctorId}
								/>
							</div>

							<div className="content-right col-5">
								<DoctorExtraInfo doctorIdFromParent={this.state.currentDoctorId} />
							</div>
						</div>
					</div>
					<div className="main-detail">
						<div className="container">
							<div className=" detail-info-doctor">
								{detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
									<div
										dangerouslySetInnerHTML={{
											__html: detailDoctor.Markdown.contentHTML,
										}}
									></div>
								)}
							</div>
							<div className="container comment-doctor">
								<Comment dataHref={currentURL} width={"100%"} />
							</div>
						</div>
					</div>
					<HomeFooter />
				</LoadingOverlay>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
