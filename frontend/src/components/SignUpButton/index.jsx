import React from "react"

const SignUpButton = (props) => {

    const {input_lable_value, placeholder_value, type_value, is_required} = props


        if (is_required){
            return (<label className="is-block mb-4">
                
                <span className="is-block mb-2">{input_lable_value}</span>
                <input className="input" type={type_value} placeholder={placeholder_value} required/>

            </label>)

        }else{

            return (<label className="is-block mb-4">
                
                <span className="is-block mb-2">{input_lable_value}</span>
                <input className="input" type={type_value} placeholder={placeholder_value}/>

            </label>)


        }


}

export default SignUpInput