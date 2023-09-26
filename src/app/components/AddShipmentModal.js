import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const AddShipmentModal = ({ handleClose }) => {
    const [customerName, setCustomerName] = useState('');
    const [destinationAddress, setDestinationAddress] = useState('');
    const [plannedDeliveryDate, setPlannedDeliveryDate] = useState('');

    const handleAddShipment = async () => {
        // Add your shipment handling logic here
        // ...
        const userData = { customerName, destinationAddress, plannedDeliveryDate };

        try {
            const response = await fetch('/api/addShipment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.status === 201) {
                // Registration successful
                const data = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Shipment Added Successfully'
                })
                // Redirect to a success page or login page
                // router.push('/login');
            } else {
                // Handle registration failure
                const data = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Add Shipment',
                    text: data.result,
                });
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
        // Display a success message
        Swal.fire({
            icon: 'success',
            title: 'Shipment Added Successfully',
        });

        // Close the modal
        handleClose();
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded shadow-lg relative">
            <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-black-500 text-2xl hover:underline"
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">Add New Shipment</h2>
            <label className="block mb-2">
                <span className="text-gray-700">customerName:</span>
                <input
                    className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required // Make the field mandatory
                />
            </label>
            <label className="block mb-2">
                <span className="text-gray-700">DestinationAddress:</span>
                <input
                    className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                    type="text" // Use type="email" for email input
                    value={destinationAddress}
                    onChange={(e) => setDestinationAddress(e.target.value)}
                    required // Make the field mandatory
                />
            </label>
            <label className="block mb-2">
                <span className="text-gray-700">PlannedDeliveryDate:</span>
                <input
                    className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                    type="date"
                    value={plannedDeliveryDate}
                    onChange={(e) => setPlannedDeliveryDate(e.target.value)}
                    required // Make the field mandatory
                />
            </label>

            <button
                className="w-full bg-blue-500 text-white rounded px-3 py-2 mt-4 hover:bg-blue-600 transition duration-300"
                onClick={handleAddShipment}
            >
                Add Shipment
            </button>
        </div>
    );
};

export default AddShipmentModal;
