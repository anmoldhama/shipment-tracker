'use client';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState,useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';



const NavBar = () => {
const [navbar, setNavbar] = useState(false);
let { data: session, status } = useSession();
const router = useRouter();
const {data} = useSession();

const handleSignOut = async () => {
    
    try {
       
       
        // console.log('Session before sign-out:', session);
        session = undefined;
        // console.log('Session after sign-out:', session);
        router.push('/login');
        // await signOut();
    } catch (error) {
        console.error('Error signing out:', error);
    }
};


return(
    <div>
    <Head>
        <title>ADMIN DASHBOARD</title>
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
              <h2 className="text-2xl text-white font-bold">ADMIN DASHBOARD</h2>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <ul className="items-center justify-center hidden md:flex md:space-x-6">
              <li className="text-white">
                <Link href="/admindashboard/trackShipment" passHref>
                  <button className="text-white font-bold hover:text-gray-200">
                    Manage Shipments
                  </button>
                </Link>
              </li>
              <li className="text-white">
                <Link href="/admindashboard/driverModify" passHref>
                  <button className="text-white font-bold hover:text-gray-200">
                    Manage Drivers
                  </button>
                </Link>
              </li>
            </ul>
            <ul className="flex items-center space-x-6">
            {/* <span className="text-2xl text-white text-sm">Welcome,{data.user.username}</span> */}

              <li className="text-white">
              <span className="text-2xl text-white text-sm">Welcome,{data.user.username} </span>

                {/* <Link href="/login" passHref> */}
                  <button className="bg-gray-500 text-white rounded px-6 py-2 hover:bg-gray-600 transition duration-300"
                  onClick={handleSignOut}>
                    Log Out
                  </button>
                {/* </Link> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </div>
     
)
            };
export default NavBar;