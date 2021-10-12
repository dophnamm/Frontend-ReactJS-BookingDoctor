import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./ManageDoctor.scss";
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInfoDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            handOldData: false,

            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    componentDidMount() {
        this.props.fechAllDoctors()
        this.props.getRequireDoctorInfo()
    }

    buildDataInputSelect = (data, type) => {
        let result = [];
        let { language } = this.props
        if (data && data.length > 0) {
            if (type === 'USERS') {
                data.map((item, index) => {
                    let obj = {}
                    let labelVi = `${item.firstName} ${item.lastName}`
                    let labelEn = `${item.firstName} ${item.lastName}`
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = item.id
                    result.push(obj)
                })
            }

            if (type === 'PRICE') {
                data.map((item, index) => {
                    let obj = {}
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn} USD`
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = item.keyMap
                    result.push(obj)
                })
            }

            if (type === 'PAYMENT' || type === 'PROVINCE') {
                data.map((item, index) => {
                    let obj = {}
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn}`
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = item.keyMap
                    result.push(obj)
                })
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkDown = () => {
        let { handOldData } = this.state
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: handOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        })
    }


    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayment, listProvince, listPrice } = this.state
        let res = await getDetailInfoDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            let addressClinic = '', nameClinic = '', paymentId = '',
                priceId = '', provinceId = '', note = '', selectedPayment = '',
                selectedPrice = '', selectedProvince = ''

            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic
                nameClinic = res.data.Doctor_Infor.nameClinic
                note = res.data.Doctor_Infor.note
                paymentId = res.data.Doctor_Infor.paymentId
                provinceId = res.data.Doctor_Infor.provinceId
                priceId = res.data.Doctor_Infor.priceId

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })

                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                handOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                handOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: ''
            })
        }
    }

    handleChangSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangText = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value
        this.setState({
            ...stateCopy
        })
    }

    render() {
        let { handOldData } = this.state
        console.table(this.state)
        return (
            <>
                <div className="main-manage">
                    <div className="container mt-5">
                        <div className="main-manage mt-5 mb-5">
                            <h3 className="font-weight-bold">
                                <FormattedMessage id="admin.manage-doctor.title" />
                            </h3>
                        </div>
                        <div className="row">
                            <div className="col-7 content-left">
                                <label className="mb-2">
                                    <FormattedMessage id="admin.manage-doctor.select-doctor" />
                                </label>
                                <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                    className="form-group"
                                    placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor-plhd" />}
                                />
                                <div className="doctor-info-extra row">
                                    <div className="col-5 form-group option-doctor">
                                        <label>
                                            <FormattedMessage id="admin.manage-doctor.price" />
                                        </label>
                                        <Select
                                            value={this.state.selectedPrice}
                                            onChange={this.handleChangSelectDoctorInfo}
                                            options={this.state.listPrice}
                                            className="form-group"
                                            name="selectedPrice"
                                            placeholder={<FormattedMessage id="admin.manage-doctor.price-plhd" />}
                                        />
                                    </div>
                                    <div className="col-7 form-group option-doctor">
                                        <label>
                                            <FormattedMessage id="admin.manage-doctor.payment" />
                                        </label>
                                        <Select
                                            value={this.state.selectedPayment}
                                            onChange={this.handleChangSelectDoctorInfo}
                                            options={this.state.listPayment}
                                            className="form-group"
                                            name="selectedPayment"
                                            placeholder={<FormattedMessage id="admin.manage-doctor.payment-plhd" />}
                                        />
                                    </div>
                                    <div className="col-6 form-group option-doctor">
                                        <label>
                                            <FormattedMessage id="admin.manage-doctor.province" />
                                        </label>
                                        <Select
                                            value={this.state.selectedProvince}
                                            onChange={this.handleChangSelectDoctorInfo}
                                            options={this.state.listProvince}
                                            className="form-group"
                                            name="selectedProvince"
                                            placeholder={<FormattedMessage id="admin.manage-doctor.province-plhd" />}
                                        />
                                    </div>
                                    <div className="col-6 form-group option-doctor">
                                        <label>
                                            <FormattedMessage id="admin.manage-doctor.nameClinic" />
                                        </label>
                                        <input className="form-control"
                                            onChange={(e) => this.handleOnChangText(e, 'nameClinic')}
                                            value={this.state.nameClinic}
                                        />
                                    </div>
                                    <div className="col-12 form-group option-doctor">
                                        <label>
                                            <FormattedMessage id="admin.manage-doctor.addressClinic" />
                                        </label>
                                        <input className="form-control"
                                            onChange={(e) => this.handleOnChangText(e, 'addressClinic')}
                                            value={this.state.addressClinic} />
                                    </div>
                                    <div className="col-12 form-group option-doctor">
                                        <label>
                                            <FormattedMessage id="admin.manage-doctor.note" />
                                        </label>
                                        <input className="form-control"
                                            onChange={(e) => this.handleOnChangText(e, 'note')}
                                            value={this.state.note} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-5 content-right">
                                <label className="mb-2">
                                    <FormattedMessage id="admin.manage-doctor.info" />
                                </label>
                                <textarea className="form-control"
                                    onChange={(e) => this.handleOnChangText(e, 'description')}
                                    value={this.state.description}
                                ></textarea>
                            </div>
                        </div>
                        <MdEditor
                            style={{ height: '500px', marginTop: '50px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                        <div className="mt-5 mb-5 custom">
                            <button className="btn-save"
                                onClick={() => this.handleSaveContentMarkDown()}
                            >
                                {handOldData === true ?
                                    <span><FormattedMessage id="admin.manage-doctor.save-info" /></span> :
                                    <span><FormattedMessage id="admin.manage-doctor.add-info" /></span>}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctor: state.admin.allDoctor,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fechAllDoctors: () => dispatch(actions.fechAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getRequireDoctorInfo: () => dispatch(actions.getRequireDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
