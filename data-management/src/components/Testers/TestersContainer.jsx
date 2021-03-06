import React from 'react';
import { connect } from 'react-redux';
import { getTesters } from '../../redux/testers-reducer'
import Testers from './Testers'
import Panel from '../Panel/Panel';
import { compose } from 'redux';

class TestersContainer extends React.Component {
    componentDidMount() {
        this.props.getTesters();
    }

    render() {
        return (
            <div>
                <Panel target={'TESTERS'} />
                {this.props.testers.length === 0 ? null : <Testers testers={this.props.testers} />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        testers: state.testersPage.testers,
    }
}

export default compose(connect(mapStateToProps, { getTesters }))(TestersContainer);