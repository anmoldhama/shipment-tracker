'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Swal from 'sweetalert2';
import NavBar from '../../Navbar';
import AddDriver from '../../components/AddDriverModal'
import {useSession} from 'next-auth/react';
import 'font-awesome/css/font-awesome.min.css';




export default function Drivers() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

  
  const [drivers, setDrivers] = useState([]);
  const [driverid, setDriverId] = useState([]);
  const {data} = useSession();
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = (driverid) => {
    router.push(`/admindashboard/driverModify/${driverid}`);
  };
  const handleDeleteClick = async (driverid) =>{
    const userData = {driverid:driverid};
    
    try {
        const response = await fetch(`/api/deleteDriver`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if (response.status === 201) {
          const data = await response.json();
        //   console.log('Delete  successfully', data);
          Swal.fire({
            icon: 'success',
            title: 'Driver Deleted',
           
          });
          window.location.reload();
        } else {
          const data = await response.json();
        //   console.error('failed:', data.error);
          Swal.fire({
            icon: 'error',
            title: 'No Data found',
           
          });
        }
      } catch (error) {
        // console.error('Error during tracking:', error);
      }
  };

  useEffect(() => {
    const fetchData = async () => {
       
      try {
        const response = await fetch('/api/driverModify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        if (response.status === 201) {
          const data = await response.json();
        //   console.log('Searched successfully', data);
          setDrivers(data.data || []);
        } else {
          const data = await response.json();
        //   console.error('Search failed:', data.error);
          Swal.fire({
            icon: 'error',
            title: 'No Data found',
            text: data.result,
          });
        }
      } catch (error) {
        // console.error('Error during tracking:', error);
      }
    };

    fetchData();

  }, []);


  const handleDriver = async () => {
    // Perform shipment tracking logic
    const userData = { driverid };

    try {
      const response = await fetch('/api/driverModify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.status === 201) {
        const data = await response.json();
        console.log('Searched successfully', data);
        setDrivers(data.data || []);
        Swal.fire({
            icon: 'success',
            title: 'Searched successfully'
          });
      } else {
        const data = await response.json();
        console.error('Searching failed:', data.error);
        Swal.fire({
          icon: 'error',
          title: 'No Data Found'
        });
      }
    } catch (error) {
      console.error('Error during tracking:', error);
    }
  };
  if(!data){
    router.push("/login");
  }else{
  return (
    <div>
        <NavBar/>
    
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-4">
  {/* <label className="block text-gray-600 mr-4">Enter Driver ID:</label> */}
  <input
    type="text"
    className="border rounded px-4 py-2 w-full sm:w-48 text-sm focus:outline-none focus:ring focus:border-blue-300"
    value={driverid}
    placeholder='Enter Driver ID:'
    onChange={(e) => setDriverId(e.target.value)}
  />
  <button
    className="bg-gray-500 hover:bg-blue-600 text-white rounded px-6 py-2 ml-4"
    onClick={handleDriver}
  >
    Search Driver
  </button>

  {/* <Link href="/admindashboard/addDriver"> */}
          <button className="bg-gray-500 hover:bg-blue-600 text-white px-6 py-2 rounded mr-4 ml-4"
          onClick={handleOpenModal}>
            Add Driver
          </button>
        {/* </Link> */}
        {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="z-10">
            <AddDriver handleClose={handleCloseModal} />
          </div>
        </div>
      )}
</div>

<div className="bg-white rounded-lg overflow-hidden shadow-md">
  <table className="min-w-full">
    <thead>
      <tr className="bg-gray-500 text-white">
        <th className="px-4 py-2 text-center text-sm font-normal">Driver ID</th>
        <th className="px-4 py-2 text-center text-sm font-normal">UserName</th>
        <th className="px-4 py-2 text-center text-sm font-normal">Email</th>
        <th className="px-4 py-2 text-center text-sm font-normal">Password</th>
        <th className="px-4 py-2 text-center text-sm font-normal">Vehicle Number</th>
        <th className="px-4 py-2 text-center text-sm font-normal">License Number</th>
        <th className="px-4 py-2 text-center text-sm font-normal">Contact Number</th>
        <th className="px-4 py-2 text-center text-sm font-normal">Shipment Id</th>
        <th className="px-4 py-2 text-center text-sm font-normal">Customer Name</th>
        <th className="px-4 py-2 text-center text-sm font-normal">Shipment Status</th>
        <th className="px-4 py-2 text-center text-sm font-normal">Actions</th>
      </tr>
    </thead>
    <tbody>
      {drivers.map((driver) => (
        <tr key={driver.driverid} className="hover:bg-gray-100">
          <td className="px-4 py-2 text-center text-sm">{driver.driverid}</td>
          <td className="px-4 py-2 text-center text-sm">{driver.username}</td>
          <td className="px-4 py-2 text-center text-sm">{driver.email}</td>
          <td className="px-4 py-2 text-center text-sm">{driver.password}</td>
          <td className="px-4 py-2 text-center text-sm">{driver.vehiclenumber}</td>
          <td className="px-4 py-2 text-center text-sm">{driver.licensenumber}</td>
          <td className="px-4 py-2 text-center text-sm">{driver.contactnumber}</td>
          <td className="px-4 py-2 text-center text-sm">{driver.shipmentid}</td>
          <td className="px-4 py-2 text-center text-sm">{driver.customername}</td>
          <td className="px-4 py-2 text-center text-sm">{driver.shipmentstatus}</td>
          <td className="px-4 py-2 text-center text-sm space-x-2">
            {/* <button onClick={() => handleEditClick(driver.driverid)}>
              <a className="text-blue-500 hover:underline">Edit</a>
            </button>
            <button onClick={() => handleDeleteClick(driver.driverid)}>
              <a className="text-blue-500 hover:underline">Delete</a>
            </button> */}
            <i className="fa fa-edit text-blue-500 hover:text-blue-600 cursor-pointer" onClick={() => handleEditClick(driver.driverid)}></i>
            <i className="fa fa-trash text-red-500 hover:text-red-600  cursor-pointer" onClick={() => handleDeleteClick(driver.driverid)}></i>

          </td>
          
        </tr>
      ))}
    </tbody>
  </table>
</div>



      <div className="mt-4 ">
        
        <Link href="/admindashboard">
          <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded">
            Back
          </button>
        </Link>
      </div>
    </div>
    </div>
  );
      }
};












// export default Drivers;
