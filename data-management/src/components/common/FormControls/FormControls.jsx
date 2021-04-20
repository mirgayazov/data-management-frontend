import s from "./FormControls.module.css";

const FormControl = ({ input, meta, child, ...props }) => {
    const hasErr = meta.touched && meta.error;
    return (
        <div className={s.formControl + (hasErr ? " " + s.error : "")}>
            <div className={s.tooltip}>
                {props.children}
                {hasErr && <span className={s.tooltiptext}>{meta.error} <span className={s.blink}>❗</span></span>}
            </div>
        </div>
    )
}

export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props
    if (props.myValue) {
        return <FormControl {...props}><textarea {...input} {...restProps} value={props.myValue} /></FormControl>
    }
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props
    if (props.myValue) {
        return <FormControl {...props}><input {...input} {...restProps} value={props.myValue} /></FormControl>
    }
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}