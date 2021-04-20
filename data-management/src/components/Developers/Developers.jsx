import styles from "./Developers.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
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

class Developers extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    state = {
        developers: this.props.developers,
        rollbackdevelopers: this.props.developers,
    }

    findDeveloper() {
        const target = this.myRef.current.value;
        let code = /^\d+$/.test(target);
        if (code) {
            let foundUsers = this.state.rollbackdevelopers.filter(developer => developer.personnel_number === target)
            this.setState({ developers: foundUsers });
        } else {
            let foundUsers = this.state.rollbackdevelopers.filter(developer => levenshtein(developer.full_name, target) <= 5)
            this.setState({ developers: foundUsers });
        }
    }

    rollback() {
        let rollbackdevelopers = this.state.rollbackdevelopers;
        this.myRef.current.value = '';
        this.setState({ developers: rollbackdevelopers });
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
                    <input ref={this.myRef} placeholder='Введите ФИО или табельный номер сотрудника'></input>
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