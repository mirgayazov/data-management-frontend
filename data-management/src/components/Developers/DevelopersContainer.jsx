import React from "react";
import { connect } from "react-redux";
import { setDevelopers, toggleIsFetching } from '../../redux/developers-reducer'
import axios from 'axios'
import { Preloader } from "../common/preloader/Preloader";
import Developers from "./Developers";

class DevelopersContainer extends React.Component {
    componentDidMount() {
        debugger
        if (this.props.developers.length === 0) {
            this.props.toggleIsFetching(true);
            axios.get('http://localhost:3001/developers')
                .then(response => {
                    debugger
                    this.props.toggleIsFetching(false);
                    this.props.setDevelopers(response.data.developers);
                })
        }
    }

    render() {
        debugger
        return (
            <>
                { this.props.isFetching ? <Preloader /> : <Developers developers={this.props.developers} />}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        developers: state.developersPage.developers,
        isFetching: state.developersPage.isFetching,
    }
}



export default connect(mapStateToProps, { setDevelopers, toggleIsFetching })(DevelopersContainer)