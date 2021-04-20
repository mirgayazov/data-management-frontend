import styles from "./Orders.module.css";
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

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    state = {
        orders: this.props.orders,
        rollbackOrders: this.props.orders,
    }

    findOrder() {
        const target = this.myRef.current.value;
        let code = /^\d+$/.test(target);
        if (code) {
            let foundUsers = this.state.rollbackOrders.filter(tester => tester.personnel_number === target)
            this.setState({ orders: foundUsers });
        } else {
            let foundUsers = this.state.rollbackOrders.filter(tester => levenshtein(tester.full_name, target) <= 5)
            this.setState({ orders: foundUsers });
        }
    }

    rollback() {
        let rollbackOrders = this.state.rollbackOrders;
        this.myRef.current.value = '';
        this.setState({ orders: rollbackOrders });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.orders !== this.props.orders) {
            this.setState({ orders: this.props.orders })
        }
    }

    render() {
        return (
            <div className={styles.order}>
                {this.state.orders.map(o => {
                    return (
                        <NavLink key={o.id} className={styles.link} to={`/orders/${o.id}`}>
                            <div className={styles.item} >
                                {o.name}
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        )
    }
}

export default Orders