import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const PropertyDelete = () => {
    
    const navigate = useNavigate();

    var property_id = useParams().propertyID;

    const deleteProperty = () => {
        fetch(`http://localhost:8000/property/delete/${property_id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }).then((response) => {
            console.log(response);
            navigate(-1);
        }
        );
    };

    return (
        <>
        <div className="hero is-large has-text-centered">
            <div className="hero-body">
                <h1 style={{fontSize: "50px"}}>You are about to delete the property!!!</h1>
                <br />
                <div className="columns">
                    <div className="column is-3"></div>
                    <div className="column">
                        <button className="button is-primary" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                    <div className="column">
                        <button className="button is-danger" onClick={() => deleteProperty()}>Confirm Deletion</button>
                    </div>
                    <div className="column is-3"></div>
                </div>
            </div>

        </div>
        </>
    );

}

export default PropertyDelete;
