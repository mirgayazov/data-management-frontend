import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import TesterInfo from "./TesterInfo";
import { withRouter } from "react-router";


class TesterInfoContainer extends React.Component {
    render() {
        return (
            <TesterInfo tester={this.props.testers.filter(tester => tester.personnel_number === this.props.match.params.pn)[0]} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        testers: state.testersPage.testers,
    }
}

export default compose(
    connect(mapStateToProps, {}),
    withRouter
)(TesterInfoContainer);