import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from "../../utils";

class Header extends Component {

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className="languages">
                    
                    <span className={ language === LANGUAGES.VI ? "language-vi active" : "language-vi" }
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                    > 
                            VI
                    </span>
                    
                    <span className={ language === LANGUAGES.EN ? "language-en active" : "language-en" }
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                    > 
                            EN
                    </span>
                    <span className="welcome"> 
                        <FormattedMessage id="homeHeader.welcome"/>
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''}  
                        {userInfo && userInfo.lastName ? userInfo.lastName : ''} 
                    </span>
                </div>
                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout} title="Logout">
                    {/* <i className="fas fa-sign-out-alt"></i> */}
                    <span>Logout</span>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
