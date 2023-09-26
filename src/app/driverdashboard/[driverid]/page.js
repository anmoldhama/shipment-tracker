'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import EditModal from './EditModal';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';



const AssignedShipment = ({ params }) => {
    const driverParams = Number(params.driverid);
    const [shipment, setShipment] = useState([]);
    const [editedShipment, setEditedShipment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    //   let { data } = useSession();
    let { data } = useSession();
    const router = useRouter();

    //  console.log('data:',data.user.username);
    //   const name = session.user.username;
    const handleEditClick = (shipmentId) => {
        const shipmentToEdit = shipment.find((item) => item.shipmentid === shipmentId);
        setEditedShipment(shipmentToEdit);
        setIsModalOpen(true);
    };

    const handleSignOut = async () => {

        try {



            data = undefined;


            router.push('/login');
            // await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            const userData = { assigneddriverid: driverParams };
            try {
                const response = await fetch('/api/assignedShipment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
                if (response.status === 201) {
                    const data = await response.json();
                    Swal.fire({
                        icon: 'success',
                        title: 'Data Searched',
                    });
                    setShipment(data.data || []);
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

    if (!data) {
        router.push("/login");
    } else {
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
                    <div className=" justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                        <div className="flex items-center py-3 md:py-5 md:block">
                            <h2 className="text-2xl text-white font-bold mr-4">DRIVER DASHBOARD</h2>
                        </div>
                        <div>
                            <span className="text-2xl text-white font-bold">Welcome, {data.user.username} </span>

                            <button className="bg-gray-500 text-white rounded px-6 py-2 mt-4 hover:bg-gray-600 transition duration-300" onClick={handleSignOut}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </nav>
                <div className="container mx-auto p-6">
                    <h1 className="text-2xl font-semibold mb-4 text-center">Assigned Shipments</h1>
                    <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-300 text-gray-700">
                                    <th className="px-6 py-3 text-sm text-center">Shipment ID</th>
                                    <th className="px-6 py-3 text-sm text-center">Customer Name</th>
                                    <th className="px-6 py-3 text-sm text-center">Destination Address</th>
                                    <th className="px-6 py-3 text-sm text-center">Shipment Status</th>
                                    <th className="px-6 py-3 text-sm text-center">Planned Delivery Date</th>
                                    <th className="px-6 py-3 text-sm text-center">Actual Delivery Date</th>
                                    <th className="px-6 py-3 text-sm text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shipment.map((shipment) => (
                                    <tr key={shipment.shipmentid} className="hover:bg-gray-100">
                                        <td className="px-6 py-4 text-sm text-center">{shipment.shipmentid}</td>
                                        <td className="px-6 py-4 text-sm text-center">{shipment.customername}</td>
                                        <td className="px-6 py-4 text-sm text-center">{shipment.destinationaddress}</td>
                                        <td className="px-6 py-4 text-sm text-center">{shipment.shipmentstatus}</td>
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
                                                    // hour: '2-digit',
                                                    // minute: '2-digit',
                                                })
                                                : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button onClick={() => handleEditClick(shipment.shipmentid)}>
                                                <a className="text-blue-500 hover:underline">Edit</a>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal */}
                    {editedShipment && (
                        <div
                            className={`fixed inset-0 flex items-center justify-center z-50 ${isModalOpen ? '' : 'hidden'
                                }`}
                        >
                            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                                <div className="modal-content py-4 text-left px-6">
                                    {/* Modal header */}
                                    <div className="flex justify-between items-center pb-3 text-center">
                                        <p className="text-2xl font-bold text-center">Edit Shipment</p>
                                        <button
                                            onClick={() => {
                                                setIsModalOpen(false);
                                                setEditedShipment(null);
                                            }}
                                            className="modal-close"
                                        >
                                            X
                                        </button>
                                    </div>
                                    {/* Modal body */}
                                    <EditModal
                                        isOpen={isModalOpen}
                                        onClose={() => {
                                            setIsModalOpen(false);
                                            setEditedShipment(null);
                                        }}
                                        shipment={editedShipment}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        );
    }
};

export default AssignedShipment;
