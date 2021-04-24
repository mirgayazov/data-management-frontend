import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getDevelopers } from '../../redux/developers-reducer'
import Panel from '../Panel/Panel';
import Developers from './Developers';
const DEVELOPERS = 'DEVELOPERS'

class DevelopersContainer extends React.Component {
    componentDidMount() {
        this.props.getDevelopers();
    }

    render() {
        return (
            <div>
                <Panel target={DEVELOPERS} />
                {this.props.developers.length === 0 ? null : <Developers developers={this.props.developers} />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        developers: state.developersPage.developers,
        isFetching: state.developersPage.isFetching,
    }
}

export default compose(connect(mapStateToProps, { getDevelopers }))(DevelopersContainer);
