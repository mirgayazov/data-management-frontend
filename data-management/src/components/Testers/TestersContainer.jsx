import React from "react";
import { connect } from "react-redux";
import { getTesters } from '../../redux/testers-reducer'
import Testers from './Testers'
import { Preloader } from "../Common/preloader/Preloader";
import Panel from "../Panel/Panel";
import { compose } from "redux";

class TestersContainer extends React.Component {
    componentDidMount() {
        this.props.getTesters();
    }

    render() {
        return (
            <div>
                {this.props.isFetching
                    ? <Preloader />
                    : <div><Panel /><Testers testers={this.props.testers} /></div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        testers: state.testersPage.testers,
        isFetching: state.testersPage.isFetching,
    }
}

export default compose(connect(mapStateToProps, { getTesters }))(TestersContainer);