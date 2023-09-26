'use client';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState,useEffect } from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

const NavBar = () => {
  const [navbar, setNavbar] = useState(false);
  // const [shipmentid, setShipmentId] = useState('');
  const [driverData, setDriverData] = useState([]);
  const {data} = useSession();
  const router = useRouter();
  

  //--------------------------------
  // useEffect(() => {
  //   const fetchData = async () => {
  //      const userData = {assigneddriverid: assigneddriverid};
  //     try {
  //       const response = await fetch('/api/assignedShipment', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(userData),
  //       });
  //       if (response.status === 201) {
  //         const data = await response.json();
  //         console.log('Searched successfully', data);
  //         setDriverData(data.data || []);
  //       } else {
  //         const data = await response.json();
  //         console.error('Search failed:', data.error);
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'No Data found',
  //           text: data.result,
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Error during tracking:', error);
  //     }
  //   };

  //   fetchData();

  // }, []);
  if(!data){
    router.push("/login");
  }else{
  return (
    <div>
      <Head>
        <title>Driver Dashboard</title>
        <meta
          name="description"
          content="Create Next JS Responsive Menu with Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="w-full bg-gray-800 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              
                <h2 className="text-2xl text-white font-bold">DRIVER DASHBOARD</h2>
            
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'block' : 'hidden'
              }`}
            >
              
            </div>
          </div>
        </div>
      </nav>


    </div>
  );

            }
};

export default NavBar;