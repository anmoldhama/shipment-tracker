"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import {useSession} from 'next-auth/react';



export default function AddShipment() {
        const [customerName, setCustomerName] = useState('');
        const [destinationAddress, setDestinationAddress] = useState('');
        const [plannedDeliveryDate,setPlannedDeliveryDate] = useState('');
        const router = useRouter();
        const {data} = useSession();
         const handleAddShipment = async () => {
          
            const userData = { customerName,destinationAddress, plannedDeliveryDate};
          
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
                // console.log('Shipment Added Successfully',data);
                Swal.fire({
                    icon:'success',
                    title:'Shipment Added Successfully'
                })
                // Redirect to a success page or login page
                // router.push('/login');
                window.location.reload();
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
          };
          if(!data){
            router.push("/login");
          }else{
        return (
            <div className="p-4 max-w-md mx-auto bg-white rounded shadow-lg " style={{ marginTop: '5%' }}>
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
    // disabled={!isFormValid}
  >
    Add Shipment
  </button>
  <Link href="/admindashboard/trackShipment" className="text-center block mt-2 text-blue-500 hover:underline">
    Back
  </Link>
</div>

        )
          }
};








  


