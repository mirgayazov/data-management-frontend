import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import DeveloperInfo from './DeveloperInfo';


class DeveloperInfoContainer extends React.Component {
    render() {
        return (
            <DeveloperInfo developer={this.props.developers.filter(developer => developer.personnel_number === this.props.match.params.pn)[0]} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        developers: state.developersPage.developers,
    }
}

export default compose(
    connect(mapStateToProps, {}),
    withRouter
)(DeveloperInfoContainer);