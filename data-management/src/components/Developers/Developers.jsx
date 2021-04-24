import styles from './Developers.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { levenshtein } from '../../utils/levenshtein'

class Developers extends React.Component {
    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
    }

    state = {
        developers: this.props.developers,
        rollbackDevelopers: this.props.developers,
    }

    findDeveloper() {
        const target = this.searchInput.current.value;
        let code = /^\d+$/.test(target);
        if (code) {
            let foundItems = this.state.rollbackDevelopers.filter(developer => developer.personnel_number === target)
            this.setState({ developers: foundItems });
        } else {
            let foundItems = this.state.rollbackDevelopers.filter(developer => levenshtein(developer.full_name, target) <= 5)
            this.setState({ developers: foundItems });
        }
    }

    rollback() {
        this.searchInput.current.value = '';
        this.setState({ developers: this.state.rollbackDevelopers });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.developers !== this.props.developers) {
            this.setState({ developers: this.props.developers })
        }
    }

    render() {
        return (
            <div className={styles.developer}>
                <div className={styles.tools}>
                    <input ref={this.searchInput} placeholder='Введите ФИО или табельный номер сотрудника'></input>
                    <button onClick={() => this.findDeveloper()}>поиск</button>
                    <button onClick={() => this.rollback()}>сброс</button>
                </div>
                {this.state.developers.map(d => {
                    return (
                        <NavLink key={d.personnel_number} className={styles.link} to={`/developers/${d.personnel_number}`}>
                            <div className={styles.item} >
                                {d.full_name}
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        )
    }
}

export default Developers