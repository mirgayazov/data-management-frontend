import React from "react";
import { connect } from "react-redux";
import { addTester, setTesters, toggleIsFetching } from '../../redux/testers-reducer'
import Testers from './Testers'
import axios from 'axios'
import { Preloader } from "../common/preloader/Preloader";

class TestersContainer extends React.Component {
    componentDidMount() {
        if (this.props.testers.length === 0) {
            this.props.toggleIsFetching(true);
            axios.get('http://localhost:3001/testers')
                .then(response => {
                    this.props.toggleIsFetching(false);
                    this.props.setTesters(response.data.testers);
                })
        }
    }

    render() {
        debugger
        return (
            <>
                {this.props.isFetching ? <Preloader /> : <Testers testers={this.props.testers} />}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        testers: state.testersPage.testers,
        isFetching: state.testersPage.isFetching,
    }
}



export default connect(mapStateToProps, { addTester, setTesters, toggleIsFetching })(TestersContainer)