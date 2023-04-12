import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AvailDelete = () => {
    
    const navigate = useNavigate();

    var avail_id = useParams().availID;
    var property_id = useParams().propertyID;

    const deleteAvail = () => {
        fetch(`http://localhost:8000/property/${property_id}/avail/${avail_id}/delete/`, {
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
                <h1 style={{fontSize: "50px"}}>You are about to delete this availability!!!</h1>
                <br />
                <div className="columns">
                    <div className="column is-3"></div>
                    <div className="column">
                        <button className="button is-primary" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                    <div className="column">
                        <button className="button is-danger" onClick={() => deleteAvail()}>Confirm Deletion</button>
                    </div>
                    <div className="column is-3"></div>
                </div>
            </div>

        </div>
        </>
    );

}

export default AvailDelete;
