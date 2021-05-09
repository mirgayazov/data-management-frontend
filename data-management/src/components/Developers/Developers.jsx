import styles from './Developers.module.css';
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

class Developers extends React.Component {
    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
        this.state.currentMaxPage = 10;
    }

    state = {
        pageSize: 10,
        currentMaxPage: 10,
        developers: this.props.developers.slice(0, 10),
        rollbackDevelopers: this.props.developers,
        pageCount: Math.ceil(this.props.developers.length / 10),
    }

    Previous(newPage) {
        this.setState({ developers: this.state.rollbackDevelopers.slice(this.state.currentMaxPage - this.state.pageSize * 2, this.state.currentMaxPage - this.state.pageSize), currentMaxPage: this.state.currentMaxPage - this.state.pageSize })
    }

    Next(newPage) {
        this.setState({ developers: this.state.rollbackDevelopers.slice(this.state.currentMaxPage, this.state.currentMaxPage + this.state.pageSize), currentMaxPage: this.state.currentMaxPage + this.state.pageSize })
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
            this.setState({ developers: this.props.developers.slice(0, this.state.pageSize) })
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

                <div className={styles.tools2}>
                    <Paginator pageCount={this.state.pageCount} onNext={this.Next.bind(this)} onPrevious={this.Previous.bind(this)} />
                </div>
            </div>
        )
    }
}

export default Developers