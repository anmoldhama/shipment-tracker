'use client'
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {

    // If session is loading, do nothing
    if (!data) {
      // console.log("data id not available:",data);
      // Redirect to login if data is undefined or null
      
      router.push('/login');
    } else {
      // console.log("data if available:",data);
      // If user is logged in, redirect based on role
      const userRole = data?.user?.role;

      if (userRole === 'driver') {
        router.push(`/driverdashboard/${data?.user?.driverid}`);
      } else if (userRole === 'admin') {
        router.push('/admindashboard');
      }
    }
  }, [data, router]);

}
