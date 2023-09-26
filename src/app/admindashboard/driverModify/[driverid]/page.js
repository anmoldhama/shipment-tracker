'use client';

import { useRouter } from 'next/navigation';
import { useState,useEffect  } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
const DriverUpdate = ({params}) => {
    const driverParams = Number(params.driverid);
  const [driver, setDriver] = useState({
    username: '',
    email: '',
    password: '',
    vehiclenumber: '',
    licensenumber: '',
    contactnumber: '',
    driverid: driverParams // Initial driverid, change as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver({ ...driver, [name]: value });
    
  };
//   useEffect(() => {
//     const fetchDriverData = async () => {
//     //   if (params.driverid) {
//     //     try {
//     //       const response = await fetch(`/api/driverModify`);
//     //       if (response.ok) {
//     //         const data = await response.json();
//     //         setDriver({
//     //           ...driver,
//     //           username: data.username,
//     //           email: data.email,
//     //           // ... populate other fields based on your data
//     //         });
//     //       } else {
//     //         console.error('Failed to fetch driver data');
//     //       }
//     //     } catch (error) {
//     //       console.error('Error fetching driver data:', error);
//     //     }
//     //   }


//     };

//     fetchDriverData();
//   }, [params.driverid]);
//    ---------------------------------search data------------------------------------
useEffect(() => {
    const fetchData = async () => {
        
       const userData = {driverid:driver.driverid};
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
        //   console.log('main data search successfully', data.data[0]);
          Swal.fire({
            icon: 'success',
            title: 'Data Searched',
           
          });
        //   setDrivers(data.data || []);
        setDriver({
                  ...driver,
                  username: data.data[0].username,
                  email: data.data[0].email,
                  password: data.data[0].password,
                  vehiclenumber: data.data[0].vehiclenumber,
                  licensenumber: data.data[0].licensenumber,
                  contactnumber: data.data[0].contactnumber
                  });
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

  
  const handleSubmit = async(e) => {

    e.preventDefault();
    try {
        const response = await fetch('/api/driverUpdate', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(driver),
        });
        if (response.status === 201) {
          const data = await response.json();
        //   console.log('Driver updated successfully:', data);
          Swal.fire({
            icon: 'success',
            title: 'Driver Updated',
           
          });
       
        } else {
          const data = await response.json();
          console.error('Updation failed:', data.error);
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

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg">
    <h2 className="text-2xl mb-4 text-center">Update Driver</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="driverid" className="block">Driver Id</label>
          <input
            type="text"
            id="driverid"
            value={driver.driverid}
            name="driverid"
            onChange={handleChange}
            className="border rounded p-2 w-full"
            readOnly
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="username" className="block">Username</label>
          <input
            type="text"
            id="username"
            value={driver.username}
            name="username"
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="email" className="block">Email</label>
          <input
            type="text"
            id="email"
            value={driver.email}
            name="email"
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="password" className="block">Password</label>
          <input
            // type="password"
            id="password"
            value={driver.password}
            name="password"
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="vehiclenumber" className="block">Vehicle Number</label>
          <input
            type="text"
            id="vehiclenumber"
            value={driver.vehiclenumber}
            name="vehiclenumber"
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="licensenumber" className="block">License Number</label>
          <input
            type="text"
            id="licensenumber"
            value={driver.licensenumber}
            name="licensenumber"
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="contactnumber" className="block">Contact Number</label>
          <input
            type="text"
            id="contactnumber"
            value={driver.contactnumber}
            name="contactnumber"
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <button type="submit" className="w-full md:w-1/2 mb-4 bg-blue-500 text-white px-4 py-2 rounded">
        Update Driver
      </button>
      </div>
      
      <div className="mt-4 text-center">
        <Link href="/admindashboard/driverModify">
          <button className="bg-gray-300 text-gray-700 px-2 py-2 rounded text-center">
            Back To Drivers
          </button>
        </Link>
      </div>
    </form>
  </div>
  
  );
};

export default DriverUpdate;









