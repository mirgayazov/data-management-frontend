import styles from './Testers.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

function levenshtein(s1, s2, costs) {
    var i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
    l1 = s1.length;
    l2 = s2.length;

    costs = costs || {};
    var cr = costs.replace || 1;
    var cri = costs.replaceCase || costs.replace || 1;
    var ci = costs.insert || 1;
    var cd = costs.remove || 1;

    cutHalf = flip = Math.max(l1, l2);

    var minCost = Math.min(cd, ci, cr);
    var minD = Math.max(minCost, (l1 - l2) * cd);
    var minI = Math.max(minCost, (l2 - l1) * ci);
    var buf = new Array((cutHalf * 2) - 1);

    for (i = 0; i <= l2; ++i) {
        buf[i] = i * minD;
    }

    for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
        ch = s1[i];
        chl = ch.toLowerCase();

        buf[flip] = (i + 1) * minI;

        ii = flip;
        ii2 = cutHalf - flip;

        for (j = 0; j < l2; ++j, ++ii, ++ii2) {
            cost = (ch === s2[j] ? 0 : (chl === s2[j].toLowerCase()) ? cri : cr);
            buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
        }
    }
    return buf[l2 + cutHalf - flip];
}

class Testers extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    state = {
        testers: this.props.testers,
        rollbackTesters: this.props.testers,
    }

    findTester() {
        const target = this.myRef.current.value;
        let code = /^\d+$/.test(target);
        if (code) {
            let foundUsers = this.state.rollbackTesters.filter(tester => tester.personnel_number === target)
            this.setState({ testers: foundUsers });
        } else {
            let foundUsers = this.state.rollbackTesters.filter(tester => levenshtein(tester.full_name, target) <= 5)
            this.setState({ testers: foundUsers });
        }
    }

    rollback() {
        let rollbackTesters = this.state.rollbackTesters;
        this.myRef.current.value = '';
        this.setState({ testers: rollbackTesters });
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
                    <input ref={this.myRef} placeholder='Введите ФИО или табельный номер сотрудника'></input>
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