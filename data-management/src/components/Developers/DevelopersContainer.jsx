import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getDevelopers } from '../../redux/developers-reducer'
import { Preloader } from "../Common/preloader/Preloader";
import Developers from "./Developers";

class DevelopersContainer extends React.Component {
    componentDidMount() {
        this.props.getDevelopers();
    }

    render() {
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

export default compose(connect(mapStateToProps, { getDevelopers }))(DevelopersContainer);
