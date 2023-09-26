"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';



export default function Register(){
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [email,setEmail] = useState('');
        const [role, setRole] = useState(''); // Default role
        const router = useRouter();
        // const [isFormValid, setIsFormValid] = useState(false);
      
        // const handleRegistration = async () => {
        //   // Perform user registration and include the selected role
        //   const userData = { username, password,email, role };

        // console.log(userData.username);
        //   // Send userData to your server for registration
        //   // ...
        // };
        const handleRegistration = async () => {
          
            const userData = { username,email, password,role};
          
            try {
              const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
              });
          
              if (response.status === 201) {
                // Registration successful
                const data = await response.json();
                console.log('User registered successfully',data);
                Swal.fire({
                    icon:'success',
                    title:'Registered Successfully'
                })
                // Redirect to a success page or login page
                router.push('/login');
              } else {
                // Handle registration failure
                const data = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Registration failed',
                    text: data.result,
                  });
              }
            } catch (error) {
              console.error('Error during registration:', error);
            }
          };
   
        return (
            <div className="p-4 max-w-md mx-auto bg-white rounded shadow-lg " style={{ marginTop: '5%' }}>
  <h2 className="text-xl font-semibold mb-4 text-center">Registration</h2>
  <label className="block mb-2">
    <span className="text-gray-700">Username:</span>
    <input
      className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required // Make the field mandatory
    />
  </label>
  <label className="block mb-2">
    <span className="text-gray-700">Email:</span>
    <input
      className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
      type="email" // Use type="email" for email input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required // Make the field mandatory
    />
  </label>
  <label className="block mb-2">
    <span className="text-gray-700">Password:</span>
    <input
      className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required // Make the field mandatory
    />
  </label>
  <label className="block mb-2">
    <span className="text-gray-700">Role:</span>
    <select
      className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
      value={role}
      onChange={(e) => setRole(e.target.value)}
      required // Make the field mandatory
    >
      <option value="">Select Role</option> {/* Add a default option */}
      <option value="admin">Admin</option>
      {/* <option value="driver">Driver</option> */}
    </select>
  </label>
  <button
    className="w-full bg-blue-500 text-white rounded px-3 py-2 mt-4 hover:bg-blue-600 transition duration-300"
    onClick={handleRegistration}
    // disabled={!isFormValid}
  >
    Register
  </button>
  <Link href="/login" className="text-center block mt-2 text-blue-500 hover:underline">
    Login Here
  </Link>
</div>

        )
};








  


