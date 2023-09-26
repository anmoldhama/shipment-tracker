'use client';

import { useRouter } from 'next/navigation';
import { useState,useEffect  } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import {useSession} from 'next-auth/react';
import Select from 'react-select';
const DriverUpdate = ({params}) => {
    
    const shipmentParams = Number(params.shipmentid);
  const [shipment, setShipment] = useState({
    customername: '',
    destinationaddress: '',
    vehiclenumber: '',
    shipmentstatus: '',
    assigneddriverid: '',
    planneddeliverydate: '',
    actualdeliverydate:'',
    // vehiclenumber:'',
    // licensenumber:'',
    // contactnumber:'',
    shipmentid: shipmentParams // Initial driverid, change as needed
  });
  const {data} = useSession();
  const router = useRouter();
  const [driverList, setDriverList] = useState([]);
  // const [selectedOption, setSelectedOption] = useState(null);


  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipment({ ...shipment, [name]: value });
    
  };
  // const handleSelectChange = selectedOption => {
  //   setSelectedOption(selectedOption);
  // };
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
        
       const userData = {shipmentid:shipment.shipmentid};
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
          // console.log('main data search successfully', data.data[0]);
          Swal.fire({
            icon: 'success',
            title: 'Data Searched',
           
          });
        //   setDrivers(data.data || []);
        setShipment({
                  ...shipment,
                  customername: data.data[0].customername,
                  destinationaddress: data.data[0].destinationaddress,
                  vehiclenumber: data.data[0].vehiclenumber,
                  shipmentstatus: data.data[0].shipmentstatus,
                  assigneddriverid: data.data[0].assigneddriverid,
                  planneddeliverydate: data.data[0].planneddeliverydate_str,
                  actualdeliverydate: data.data[0].actualdeliverydate_str
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

    const fetchDrivers = async () =>{
      
      // const userData = {shipmentid:shipment.shipmentid};
      try {
        const response = await fetch('/api/driverList', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify(userData),
        });
        if (response.status === 201) {
          const data = await response.json();
          // console.log('drivers search successfully', data.data[0]);
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Data Searched',
           
          // });
           
          setDriverList(data.data || []);
          // console.log(driverList);
        
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
    }

    fetchData();
    fetchDrivers();

  }, []);
  // const options = driverList.map(item => ({
  //       value: item.driverid, // Unique identifier for the option
  // }));
  // console.log(options);
  // console.log(value);

  
  const handleSubmit = async(e) => {
    e.preventDefault();
  
    try {
        const response = await fetch('/api/updateShipment', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(shipment),
        });
        if (response.status === 201) {
          const data = await response.json();
          // console.log('Shipment updated successfully:', data);
          Swal.fire({
            icon: 'success',
            title: 'Driver Updated',
           
          });
       
        } else {
          const data = await response.json();
          // console.error('Updation failed:', data.error);
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
   
  if(!data){
    router.push("/login");
  }else{
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg">
    <h2 className="text-2xl mb-4 text-center">Update Shipment</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="driverid" className="block">Shipment Id</label>
          <input
            type="text"
            id="shipmentid"
            value={shipment.shipmentid}
            name="shipmentid"
            onChange={handleChange}
            className="border rounded p-2 w-full"
            readOnly
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="customername" className="block">Customer Name</label>
          <input
            type="text"
            id="customername"
            value={shipment.customername}
            name="customername"
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="destinationaddress" className="block">Destination Address</label>
          <input
            type="text"
            id="email"
            value={shipment.destinationaddress}
            name="destinationaddress"
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
  <label htmlFor="shipmentstatus" className="block">Shipment Status</label>
  <select
    id="shipmentstatus"
    value={shipment.shipmentstatus}
    name="shipmentstatus"
    onChange={handleChange}
    className="border rounded p-2 w-full"
  >
    <option value="pending">Pending</option>
    <option value="inTransit">In Transit</option>
    <option value="delivered">Delivered</option>
  </select>
</div>

<div className="w-full md:w-1/2 px-2 mb-4">
    <label htmlFor="assigneddriverid" className="block">
      Assigned Driver ID
    </label>
    <select
      value={shipment.assigneddriverid}
      onChange={handleChange}
      className="border rounded p-2 w-full"
      id="assigneddriverid"
      name="assigneddriverid"
    >
      <option value="">Choose a driver</option>
      {driverList.map((driver) => (
        <option key={driver.driverid} value={driver.driverid}>
          {driver.driverid} - {driver.username}
        </option>
      ))}
    </select>
  </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="planneddeliverydate" className="block">planned deliverydate</label>
          <input
            type="date"
            id="planneddeliverydate"
            value={shipment.planneddeliverydate}
            name="planneddeliverydate"
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="actualdeliverydate" className="block">actual deliverydate</label>
          <input
            type="date"
            id="actualdeliverydate"
            value={shipment.actualdeliverydate}
            name="actualdeliverydate"
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        {/* <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="vehiclenumber" className="block">vehicle number</label>
          <input
            type="text"
            id="vehiclenumber"
            value={shipment.vehiclenumber}
            name="vehiclenumber"
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="licensenumber" className="block">license number</label>
          <input
            type="text"
            id="licensenumber"
            value={shipment.licensenumber}
            name="licensenumber"
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="contactnumber" className="block">contact number</label>
          <input
            type="text"
            id="contactnumber"
            value={shipment.contactnumber}
            name="contactnumber"
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div> */}
        <button type="submit" className="w-full md:w-1/2 mb-4 bg-blue-500 text-white px-4 py-2 rounded">
        Update Shipment
      </button>
      </div>
      
      <div className="mt-4 text-center">
        <Link href="/admindashboard/trackShipment">
          <button className="bg-gray-300 text-gray-700 px-2 py-2 rounded text-center">
            Back To Shipments
          </button>
        </Link>
      </div>
    </form>
  </div>
  
  );
      }
};

export default DriverUpdate;









