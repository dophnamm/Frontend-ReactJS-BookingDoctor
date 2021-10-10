import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./ManageDoctor.scss";
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';

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
        }
    }

    buildDataInputSelect = (data) => {
        let result = [];
        let { language } = this.props
        if(data && data.length > 0 ) {
            data.map((item, index) => {
                let obj = {}
                let labelVi = `${item.firstName} ${item.lastName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                obj.value = item.id
                result.push(obj)
            })
        }
        return result;
    }

    componentDidMount() {
        this.props.fechAllDoctors()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                listDoctors: dataSelect
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
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value
        })
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    }

    handleOnChangDesc = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    render() {
        return (
            <>
                <div className="main-manage">
                    <div className="container mt-5">
                        <div className="main-manage mt-5 mb-5">
                            <h3 className="font-weight-bold">Tạo Thông Tin Bác Sĩ</h3>
                        </div>
                        <div className="row flex-start">
                            <div className="col-6 content-left">
                                <label className="mb-2">Chọn Bác Sĩ</label>
                                <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className="col-6 content-right">
                                <label className="mb-2">Thông Tin Giới Thiệu</label>
                                <textarea className="form-control"
                                    onChange={(e) => this.handleOnChangDesc(e)}
                                    value={this.state.description}
                                ></textarea>
                            </div>
                        </div>
                        <MdEditor 
                            style={{ height: '500px', marginTop: '50px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                        />
                        <div className="mt-5 mb-5 custom">
                            <button className="btn-save"
                                onClick={() => this.handleSaveContentMarkDown()}
                            >
                                Lưu Thông Tin
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
        allDoctor: state.admin.allDoctor,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fechAllDoctors: () => dispatch(actions.fechAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
