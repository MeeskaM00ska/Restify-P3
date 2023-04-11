
const PersonalInfoRow = ({label, value}) => {

    return(

        <tr>
            <td>{label}</td>
            <td>{value}</td>
        </tr>

    )

}







const PersonalInfoTable = () => {

    
        const data = {
            "Username": "andy",
            "Email": "1@mail.com",
            "First Name": "Andy",
        }


    return(



        <table class="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th colspan="2" class="has-text-centered">Personal Information</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>








    )







}

