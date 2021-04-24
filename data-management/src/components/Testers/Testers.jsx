import styles from './Testers.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { levenshtein } from '../../utils/levenshtein'

class Testers extends React.Component {
    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
    }

    state = {
        testers: this.props.testers,
        rollbackTesters: this.props.testers,
    }

    findTester() {
        const target = this.searchInput.current.value;
        let code = /^\d+$/.test(target);
        if (code) {
            let foundItems = this.state.rollbackTesters.filter(tester => tester.personnel_number === target)
            this.setState({ testers: foundItems });
        } else {
            let foundItems = this.state.rollbackTesters.filter(tester => levenshtein(tester.full_name, target) <= 5)
            this.setState({ testers: foundItems });
        }
    }

    rollback() {
        this.searchInput.current.value = '';
        this.setState({ testers: this.state.rollbackTesters });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.testers !== this.props.testers) {
            this.setState({ testers: this.props.testers })
        }
    }

    render() {
        return (
            <div className={styles.tester} >
                <div className={styles.tools}>
                    <input ref={this.searchInput} placeholder='Введите ФИО или табельный номер сотрудника'></input>
                    <button onClick={() => this.findTester()}>поиск</button>
                    <button onClick={() => this.rollback()}>сброс</button>
                </div>
                { this.state.testers.map(t => {
                    return (
                        <NavLink key={t.personnel_number} className={styles.link} to={`/testers/${t.personnel_number}`}>
                            <div className={styles.item} >
                                {t.full_name}
                            </div>
                        </NavLink>
                    )
                })}
            </div >
        )
    }
}

export default Testers