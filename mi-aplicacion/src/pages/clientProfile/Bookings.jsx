import React, { useState, useEffect } from 'react';
import { getMyBookings } from '../../utils/js/apiCallController';
import './Bookings.css';



function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadBookings() {
            try {
                const response = await getMyBookings();
                setBookings(response || []); // Quitamos el .data
                setLoading(false);
            } catch (err) {
                console.error('Error detallado:', err);
                setError('Error loading bookings');
                setLoading(false);
            }
        }
    
        loadBookings();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!bookings.length) return <div>No bookings yet.</div>;

    return (
        <div className="bookings-content">
        <div className="bookings-header">
            <div className='color'></div>
            <h3>My bookings</h3>
        </div>
        {bookings.map((booking) => (
            <div key={booking.id} className="booking-item">
                <div className='orderRef'>
                    <h5>Orders</h5>
                    <p>Ref: {booking.id}</p>
                    <p>on {booking.application_date}</p>
                </div>
                <div className='orderDetails'>
                    <h5>Details</h5>
                    <p>{booking.pack.name}</p>
                    <p>{booking.pack.duration} days</p>
                    <p>Requested dates: {booking.requested_dates}</p>
                </div>
                <div className='total'>  
                    <h5>Total</h5>  
                    <p>EUR {booking.pack.price}</p>
                    {/* <p>Your message: {booking.message}</p> */}
                </div>
                <div className='status'>
                    <h5>STATUS</h5>
                    <p>{booking.status}</p>
                </div>
                <div className='actions'>
                    <h5>Actions</h5>
                    <button>CANCEL</button>
                </div>
            </div>
        ))}
    </div>
    );
}

export default Bookings;