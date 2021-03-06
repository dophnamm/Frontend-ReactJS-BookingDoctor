import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getAllDetailSpecialtyById, getAllServiecs } from "../../../services/userService";
import _ from "lodash";
import notData from "../../../assets/notdata.png";

class DetailSpecialty extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrDoctorId: [],
			dataDetailSpecialty: {},
			listProvince: [],
		};
	}

	async componentDidMount() {
		if (this.props.match && this.props.match.params && this.props.match.params.id) {
			let id = this.props.match.params.id;

			let res = await getAllDetailSpecialtyById({
				id: id,
				location: "ALL",
			});
			let resProvince = await getAllServiecs("PROVINCE");
			if (res && res.errCode === 0 && resProvince.errCode === 0) {
				let data = res.data;
				let arrDoctorId = [];
				if (data && !_.isEmpty(res.data)) {
					let arr = data.doctorSpecialty;
					if (arr && arr.length > 0) {
						arr.map((item) => {
							arrDoctorId.push(item.doctorId);
						});
					}
				}
				let dataProvince = resProvince.data;
				if (dataProvince && dataProvince.length > 0) {
					dataProvince.unshift({
						createAt: null,
						keyMap: "ALL",
						type: "PROVINCE",
						valueEn: "ALL",
						valueVi: "Toàn Quốc",
					});
				}
				this.setState({
					dataDetailSpecialty: res.data,
					arrDoctorId: arrDoctorId,
					listProvince: dataProvince ? dataProvince : [],
				});
			}
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.language !== prevProps.language) {
		}
	}

	handleOnChangeSelect = async (e) => {
		if (this.props.match && this.props.match.params && this.props.match.params.id) {
			let id = this.props.match.params.id;
			let location = e.target.value;

			let res = await getAllDetailSpecialtyById({
				id: id,
				location: location,
			});

			if (res && res.errCode === 0) {
				let data = res.data;
				let arrDoctorId = [];
				if (data && !_.isEmpty(res.data)) {
					let arr = data.doctorSpecialty;
					if (arr && arr.length > 0) {
						arr.map((item) => {
							arrDoctorId.push(item.doctorId);
						});
					}
				}

				this.setState({
					dataDetailSpecialty: res.data,
					arrDoctorId: arrDoctorId,
				});
			}
		}
	};

	render() {
		let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
		let { language } = this.props;
		return (
			<>
				<HomeHeader />
				<div className="detail-specialty-container mt-5">
					<div className="container">
						<div className="desc-specialty">
							<div className="content-specialty">
								{dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
									<div
										dangerouslySetInnerHTML={{
											__html: dataDetailSpecialty.descriptionHTML,
										}}
									></div>
								)}
							</div>
						</div>
						<div className="search-location mt-3">
							<select className="selected-location" onChange={(e) => this.handleOnChangeSelect(e)}>
								{listProvince &&
									listProvince.length > 0 &&
									listProvince.map((item, index) => (
										<option key={index} value={item.keyMap}>
											{language === LANGUAGES.VI
												? item.valueVi
												: item.valueEn}
										</option>
									))}
							</select>
						</div>
						{arrDoctorId.length === 0 ? (
							<div className="not-container">
								<h1 className="not-doctor">
									<FormattedMessage id="other.not" />
								</h1>
								<div className="img-not">
									<img src={notData} alt="not-data" />
								</div>
							</div>
						) : (
							<>
								{arrDoctorId &&
									arrDoctorId.length > 0 &&
									arrDoctorId.map((item, index) => {
										return (
											<div className="detail-item" key={index}>
												<div className="row">
													<div className="col-6 content-left">
														<ProfileDoctor
															doctorId={
																item
															}
															isShowDescription={
																true
															}
															isShowLinkDetail={
																true
															}
														/>
													</div>
													<div className="col-6 content-right">
														<DoctorSchedule
															doctorIdFromParent={
																item
															}
														/>
														<br />
														<DoctorExtraInfo
															doctorIdFromParent={
																item
															}
														/>
													</div>
												</div>
											</div>
										);
									})}
							</>
						)}
					</div>
				</div>
				<HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
