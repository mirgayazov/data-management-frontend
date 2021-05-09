import styles from './Testers.module.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { levenshtein } from '../../utils/levenshtein'

let Paginator = (props) => {
    let [currentPage, setCurrentPage] = useState(1)

    let next = () => {
        if (currentPage <= props.pageCount - 1) {
            setCurrentPage(++currentPage)
            props.onNext(currentPage)
        }
    }

    let previous = () => {
        if (currentPage >= 2) {
            setCurrentPage(--currentPage)
            props.onPrevious(currentPage)
        }
    }

    return (
        <div>
            <button style={{ marginLeft: "10px" }} onClick={previous}>◀</button>
            <input type="text" value={currentPage} />
            <button onClick={next}>▶</button>
        </div >
    )
}

class Testers extends React.Component {
    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
        this.state.currentMaxPage = 10;
    }

    state = {
        pageSize: 10,
        currentMaxPage: 10,
        testers: this.props.testers.slice(0, 10),
        rollbackTesters: this.props.testers,
        pageCount: Math.ceil(this.props.testers.length / 10),
    }

    Previous(newPage) {
        this.setState({ testers: this.state.rollbackTesters.slice(this.state.currentMaxPage - this.state.pageSize * 2, this.state.currentMaxPage - this.state.pageSize), currentMaxPage: this.state.currentMaxPage - this.state.pageSize })
    }

    Next(newPage) {
        this.setState({ testers: this.state.rollbackTesters.slice(this.state.currentMaxPage, this.state.currentMaxPage + this.state.pageSize), currentMaxPage: this.state.currentMaxPage + this.state.pageSize })
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
            this.setState({ testers: this.props.testers.slice(0, this.state.pageSize) })
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
                 <div className={styles.tools2}>
                    <Paginator pageCount={this.state.pageCount} onNext={this.Next.bind(this)} onPrevious={this.Previous.bind(this)} />
                </div>
            </div >
            
        )
    }
}

export default Testers