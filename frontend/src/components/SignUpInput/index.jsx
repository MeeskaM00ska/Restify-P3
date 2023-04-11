import { event } from "jquery"
import React from "react"

const SignUpInput = (props) => {




        if (props.type_value === "file"){

            const {input_lable_value, type_value, input_value, update} = props

            return(<>

                    <label className="is-block mb-4" htmlFor={input_lable_value}>

                        <span className="is-block mb-2">{input_lable_value}</span>

                        <input id={input_lable_value} className="input" type={type_value} value={input_value} onChange={(event) => update(event.target.value)} accept="image/*"/>
                        
                    </label>                    
                </>


            )

        }

        const {input_lable_value, type_value, input_value, update, placeholder_value, is_required} = props


        if (is_required){
            return (<label className="is-block mb-4" htmlFor={input_lable_value}>
                
                <span className="is-block mb-2">{input_lable_value}</span>
                <input id={input_lable_value} className="input" type={type_value} placeholder={placeholder_value} value={input_value} onChange={(event) => update(event.target.value)} required/>

            </label>)

        }else{

            return (<label className="is-block mb-4" htmlFor={input_lable_value}>
                
                <span className="is-block mb-2">{input_lable_value}</span>
                <input id={input_lable_value} className="input" type={type_value} placeholder={placeholder_value} value={input_value} onChange={(event) => update(event.target.value)}/>

            </label>)


        }


}

export default SignUpInput