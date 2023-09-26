  'use client'
  import React, { useState,useEffect } from 'react';
  import Link from 'next/link';
  import Swal from 'sweetalert2';
  import { useRouter } from 'next/navigation';
  import Head from 'next/head';
  import NavBar from '../../Navbar';
  import AddShipmentModal from '../../components/AddShipmentModal';
  import { useSession } from 'next-auth/react';
  import Icon from "react-crud-icons";
  import 'font-awesome/css/font-awesome.min.css';



  const PAGE_SIZE = 5;
  const ShipmentTracking = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shipmentid, setShipmentId] = useState('');
    const [shipmentData, setShipmentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const {data} = useSession();
    
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

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

    const handleEditClick = (shipmentid) => {
      router.push(`/admindashboard/trackShipment/${shipmentid}`);
    };
    // const handleDeleteClick = async (shipmentid) =>{
    //   const userData = {shipmentid:shipmentid};
      
    //   try {
    //       const response = await fetch(`/api/deleteShipment`, {
    //         method: 'DELETE',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(userData),
    //       });
    //       if (response.status === 201) {
    //         const data = await response.json();
    //         console.log('Delete  successfully', data);
    //         Swal.fire({
    //           icon: 'success',
    //           title: 'Driver Deleted',
            
    //         });
    //         window.location.reload();
    //       } else {
    //         const data = await response.json();
    //         console.error('failed:', data.error);
    //         Swal.fire({
    //           icon: 'error',
    //           title: 'No Data found',
            
    //         });
    //       }
    //     } catch (error) {
    //       console.error('Error during tracking:', error);
    //     }
    // };
    const handleDeleteClick = (shipmentid) => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          // User confirmed, perform the delete operation
          try {
            const response = await fetch(`/api/deleteShipment`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ shipmentid }),
            });
            if (response.status === 201) {
              const data = await response.json();
              // console.log('Delete successfully', data);
              Swal.fire({
                icon: 'success',
                title: 'Shipment Deleted Successfully',
              });
              window.location.reload();
            } else {
              const data = await response.json();
              // console.error('Delete failed:', data.error);
              Swal.fire({
                icon: 'error',
                title: 'Failed to delete shipment',
                text: data.result,
              });
            }
          } catch (error) {
            // console.error('Error during delete:', error);
          }
        }
      });
    };
    
    const handleShipment = async () => {
      // Perform shipment tracking logic
      const userData = { shipmentid };

      try {
        const response = await fetch('/api/trackShipment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if (response.status === 201) {
          const data = await response.json();
          // console.log('Searched successfully', data);
          setShipmentData(data.data || []);

        } else {
          const data = await response.json();
          // console.error('Tracking failed:', data.error);
          Swal.fire({
            icon: 'error',
            title: 'Tracking failed',
            text: data.result,
          });
        }
      } catch (error) {
        console.error('Error during tracking:', error);
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        
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
          } else {
            const data = await response.json();
            console.error('Search failed:', data.error);
            Swal.fire({
              icon: 'error',
              title: 'No Data found',
              // text: data.result,
            });
          }
        } catch (error) {
          console.error('Error during tracking:', error);
        }
      };

      fetchData();

    }, []);
    
    if(!data){
      router.push("/login");
    }else{
    return (
      <div>
      <NavBar/>

      <div className="container mx-auto p-6">
        
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 rounded-lg shadow-md mb-1 p-4">
    {/* Enter Shipment Number input */}
    <div className="flex-grow md:w-1/2 md:mr-4">
      <input
        type="text"
        placeholder="Enter Shipment Id"
        className="border rounded px-4 py-2 w-full text-sm focus:outline-none focus:ring focus:border-blue-300"
        value={shipmentid}
        onChange={(e) => setShipmentId(e.target.value)}
      />
      
    </div>

    {/* Track Shipment button */}
    <div>
    <button className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-black transition duration-300 mr-40"
    onClick={handleShipment}>
      Track Shipment
    </button>
    </div>
    

    {/* Add Shipment button */}
    <button
        className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-black transition duration-300"
        onClick={handleOpenModal}
      >
        Add Shipment
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="z-10">
            <AddShipmentModal handleClose={handleCloseModal} />
          </div>
        </div>
      )}
  </div>



    

        <div className="bg-white rounded-lg overflow-hidden shadow-md">
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
                <th className="px-6 py-3 text-sm text-center">Actions</th>
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
      // hour: '2-digit',
      // minute: '2-digit',
    })}
  </td>
  {/* <td className="px-6 py-4 text-sm text-center"> */}
  <td className="px-6 py-4 text-sm text-center">
  {shipment.actualdeliverydate
    ? new Date(shipment.actualdeliverydate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        // hour: '2-digit',
        // minute: '2-digit',
      })
    : 'N/A'}
</td>

                  <td className="px-6 py-4 text-sm text-center">{shipment.vehiclenumber}</td>
                  <td className="px-6 py-4 text-sm text-center">{shipment.licensenumber}</td>
                  <td className="px-6 py-4 text-sm text-center">{shipment.contactnumber}</td>
                  <td className="px-6 py-4 text-center space-x-2">
  {/* Edit button */}
  {/* <button
    onClick={() => handleEditClick(shipment.shipmentid)}
    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded transition duration-300"
  >
    <i className="fas fa-edit mr-2"></i>Edit
  </button> */}
  {/* <Icon
        name = "edit"
        // tooltip = "Edit"
        theme = "light"
        size = "xs"
        onClick={() => handleEditClick(shipment.shipmentid)}
      /> */}
  {/* Delete button */}
  {/* <button
    onClick={() => handleDeleteClick(shipment.shipmentid)}
    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded transition duration-300"
  >
    <i className="fas fa-trash-alt mr-2"></i>Delete
  </button> */}
  {/* <Icon
        name = "delete"
        // tooltip = "Edit"
        theme = "light"
        style={{ fontSize: '5px' }}
        onClick={() => handleDeleteClick(shipment.shipmentid)}/> */}
 <i className="fa fa-edit text-blue-500 hover:text-blue-600 cursor-pointer" onClick={() => handleEditClick(shipment.shipmentid)}></i>
  <i className="fa fa-trash text-red-500 hover:text-red-600 cursor-pointer" onClick={() => handleDeleteClick(shipment.shipmentid)}></i>

</td>

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

        <Link href="/admindashboard" passHref>
          <button className="bg-gray-500 text-white rounded px-6 py-2 mt-4 hover:bg-gray-600 transition duration-300">
            Back
          </button>
        </Link>
      </div>
      </div>
    );
    }
  };

  export default ShipmentTracking;
