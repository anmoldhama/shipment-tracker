'use client';
import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import Login from './trackShipment/page';
import Head from 'next/head';
import { signOut } from 'next-auth/react';
import NavBar from '../Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';


const PAGE_SIZE = 5;
const admin = () => {
  const [navbar, setNavbar] = useState(false);
  // const [shipmentid, setShipmentId] = useState('');
  const [shipmentData, setShipmentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingCount,setPendingCount] = useState('');
  const [inTransitCount,setInTransitCount] = useState('');
  const [deliveredCount,setDeliveredCount] = useState('');
  const router = useRouter();
  // const {data} = useSession();
  // return (
  //   <nav className="bg-blue-500 p-4">
  //     <div className="container mx-auto flex justify-between items-center">
  //       <Link href="admindashboard/trackShipment" passHref>
  //         <button className="text-white font-semibold hover:text-gray-200 mr-4">
  //           Track Shipment
  //         </button>
  //       </Link>
       
        // <Link href="admindashboard/addShipment" passHref>
        //   <button className="text-white font-semibold hover:text-gray-200 mr-4">
        //     Add Shipment
        //   </button>
        // </Link>
        // <Link href="admindashboard/assignShipment">
        //   <button className="text-white font-semibold hover:text-gray-200 mr-4">
        //     Assign Shipment
        //   </button>
        // </Link>
        // <Link href="admindashboard/driverList">
        //   <button className="text-white font-semibold hover:text-gray-200 mr-4">
        //     Driver List
        //   </button>
        // </Link>
        // <Link href="admindashboard/driverModify">
        //   <button className="text-white font-semibold hover:text-gray-200 mr-4">
        //     Add Driver
        //   </button>
        // </Link>
  //     </div>
  //   </nav>
  // );

  //--------------------------------

  const {data} = useSession();
  useEffect(() => {
    const fetchData = async () => {
      
      //  console.log(data);
      try {
        const response = await fetch('/api/trackShipment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        if (response.status === 201) {
          const data = await response.json();
          // console.log('Searched successfully', data);
          setShipmentData(data.data || []);
          setPendingCount(data.data[0].pendingcount);
          setInTransitCount(data.data[0].intransitcount);
          setDeliveredCount(data.data[0].deliveredcount);

          // console.log('pendingcount',pendingCount);
          
        } else {
          const data = await response.json();
          console.error('Search failed:', data.error);
          Swal.fire({
            icon: 'error',
            title: 'No Data found',
            text: data.result,
          });
        }
      } catch (error) {
        console.error('Error during tracking:', error);
      }
    };

    fetchData();

  }, []);

  const totalPages = Math.ceil(shipmentData.length / PAGE_SIZE);
  const paginatedData = shipmentData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if(!data){
    router.push("/login");
  }else{
  return (
    <div>
      {/*  */}
      <NavBar/>
     

        {/* <h1 className="text-2xl font-bold text-purple-500">
          LIST OF ALL SHIPMENT
        </h1> */}
  <div className="flex justify-around p-4 bg-gray-100">
        <div className="flex flex-col items-center bg-white p-2 rounded-lg shadow-md">
          <span className="text-xl font-bold">Pending</span>
          <span className="text-3xl">{pendingCount}</span>
        </div>
        <div className="flex flex-col items-center bg-white p-2 rounded-lg shadow-md">
          <span className="text-xl font-bold">In Transit</span>
          <span className="text-3xl">{inTransitCount}</span>
        </div>
        <div className="flex flex-col items-center bg-white p-2 rounded-lg shadow-md">
          <span className="text-xl font-bold">Delivered</span>
          <span className="text-3xl">{deliveredCount}</span>
        </div>
      </div>
<div className="border mx-auto mt-1 p-3 bg-white rounded-lg overflow-hidden shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-300 text-gray-700">
              <th className="px-6 py-3 text-sm text-center">Shipment ID</th>
              <th className="px-6 py-3 text-sm text-center">Customer Name</th>
              <th className="px-6 py-3 text-sm text-center">Destination Address</th>
              <th className="px-6 py-3 text-sm text-center">Shipment Status</th>
              <th className="px-6 py-3 text-sm text-center">Assigned Driver ID</th>
              <th className="px-6 py-3 text-sm text-center">Planned Delivery Date</th>
              <th className="px-6 py-3 text-sm text-center">Actual Delivery Date</th>
              <th className="px-6 py-3 text-sm text-center">Vehicle Number</th>
              <th className="px-6 py-3 text-sm text-center">License Number</th>
              <th className="px-6 py-3 text-sm text-center">Contact Number</th>
             
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((shipment) => (
              <tr key={shipment.shipmentid} className="hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-center">{shipment.shipmentid}</td>
                <td className="px-6 py-4 text-sm text-center">{shipment.customername}</td>
                <td className="px-6 py-4 text-sm text-center">{shipment.destinationaddress}</td>
                <td className="px-6 py-4 text-sm text-center">{shipment.shipmentstatus}</td>
                <td className="px-6 py-4 text-sm text-center">{shipment.assigneddriverid}</td>
                {/* <td className="px-6 py-4 text-sm text-center">{shipment.planneddeliverydate}</td> */}
                <td className="px-6 py-4 text-sm text-center">
  {new Date(shipment.planneddeliverydate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })}
</td>
<td className="px-6 py-4 text-sm text-center">
  {shipment.actualdeliverydate
    ? new Date(shipment.actualdeliverydate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'N/A'}
</td>
                <td className="px-6 py-4 text-sm text-center">{shipment.vehiclenumber}</td>
                <td className="px-6 py-4 text-sm text-center">{shipment.licensenumber}</td>
                <td className="px-6 py-4 text-sm text-center">{shipment.contactnumber}</td>
                {/* <td className="px-6 py-4 text-center"> */}
                  {/* <Link href={`/drivers/edit/${driver.driverID}`}> */}
                  {/* <button
                  onClick={() => handleEditClick(shipment.shipmentid)}>
                    <a className="text-blue-500 hover:underline">Edit</a>
                  </button>
                  <button
                  onClick={() => handleDeleteClick(shipment.shipmentid)}>
                    <a className="text-blue-500 hover:underline">delete</a>
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4 items-center">
        <div className="flex items-center">
          {/* Display current page and total pages */}
          <div className="text-gray-700">
            Page {currentPage}/{totalPages}
          </div>
        </div>

        <div className="flex">
          {/* Display previous and next buttons */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white rounded px-4 py-2 mr-2 hover:bg-gray-600 transition duration-300"
          >
            &lt;
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600 transition duration-300"
          >
            &gt;
          </button>
        </div>
      </div>
      
      </div>
      
    </div>
  );
              }


};

export default admin;

