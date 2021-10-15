import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageClinic.scss"
import { LANGUAGES, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';
import { createNewClinic } from "../../../services/userService"

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: ''
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

    handleOnChangeInput = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value
        this.setState({
            ...stateCopy
        })
    }

    onChangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64,
            })
        }
    }

    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success('Tạo mới thành công .')
            this.setState({
                name: '',
                imageBase64: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        } else {
            toast.error('Tạo mới thất bại, vui lòng điền đầy đủ .')
        }
    }

    render() {
        return (
            <>
                <div className="manage-specialty-container mt-5">
                    <div className="container">
                        <div className="manage-title">
                            <h3 className="font-weight-bold text-center">Quản Lý phòng khám</h3>
                        </div>
                        <div className="manage-body mt-5">
                            <div className="row">
                                <div className="col-7 form-group">
                                    <label>Tên Phòng Khám</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.name}
                                        onChange={(e) => this.handleOnChangeInput(e, 'name')}
                                    />
                                </div>
                                <div className="col-7 form-group">
                                    <label>Địa Chỉ Phòng Khám</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.address}
                                        onChange={(e) => this.handleOnChangeInput(e, 'address')}
                                    />
                                </div>
                                <div className="col-5">
                                    <label>Ảnh Phòng Khám</label>
                                    <div className="choose-img">
                                        <label htmlFor="upload">
                                            Tải ảnh lên
                                            <i className="fas fa-camera-retro"></i>
                                        </label>
                                        <input
                                            id="upload"
                                            hidden type="file"
                                            onChange={(e) => this.onChangeImage(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <MdEditor
                                style={{ height: '500px', marginTop: '50px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                            <div className="section-btn">
                                <button className="mt-4"
                                    onClick={() => this.handleSaveNewClinic()}
                                >Lưu thông tin</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
