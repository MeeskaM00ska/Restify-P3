import { Link } from "react-router-dom";

const AvailCard = (avail) => {
    return (
        <>
            <li>
                <div className="block mb-4">

                    <div>
                        <strong>Start Date:</strong> {avail['start_date']}<br/>
                    </div>

                    <div>
                        <strong>End Date:</strong> {avail['end_date']}<br/>
                    </div>

                    <div>
                        <strong>Price:</strong> {avail['price']}<br/>
                    </div>

                    <div>
                        <Link to={`/authenticated/property/${avail['property_id']}/avail/${avail['avail_id']}/delete`}
                        className="button">
                            Delete
                        </Link>
                    </div>

                </div>
            </li>
        </>
    )
};

export default AvailCard;
