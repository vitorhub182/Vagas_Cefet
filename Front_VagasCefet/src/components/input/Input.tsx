import { forwardRef, InputHTMLAttributes, useId } from "react"
import * as S from '../../styles/input.Module'
type InputProps = InputHTMLAttributes<HTMLInputElement> &{
    label?: string;
    helperText?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({type ='text', name = '', helperText='', ...props}, ref) => {
        const inputId = useId();
        const hasError = helperText.length > 0;
        return(
            <>
                <S.Label htmlFor= {inputId}>{props.label}</S.Label>
                <S.Input id={inputId} type={type} name={name} ref={ref} hasError={hasError} {...props}/>
                {hasError && <S.HelperText>{helperText}</S.HelperText>}
            </>
            
        )
    }
)