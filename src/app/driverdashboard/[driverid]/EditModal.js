import { useState } from 'react';
import Swal from 'sweetalert2';
import styles from './EditModal.module.css';

const EditModal = ({ isOpen, onClose, shipment }) => {
  const [editedShipmentData, setEditedShipmentData] = useState(shipment);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedShipmentData({
      ...editedShipmentData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch('/api/editShipmentByDriver', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedShipmentData),
      });

      if (response.status === 201) {
        const data = await response.json();

        Swal.fire({
          icon: 'success',
          title: 'Shipment Updated',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
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
    onClose();
  };

  return (
    //   <div className={`modal ${isOpen ? 'is-active' : ''}`}>
    //   <div className="modal-background" onClick={onClose}></div>
    //   <div className="modal-card mx-auto mt-20">
    //     <header className="modal-card-head bg-gray-500 text-white text-center">
    //       <p className="modal-card-title">Edit Shipment</p>
    //       <button className="delete" aria-label="close" onClick={onClose}></button>
    //     </header>
    //     <section className="modal-card-body">
    //       <form onSubmit={handleSubmit}>
    //       <div className="mb-4">
    //           <label className="block text-gray-700">Shipment ID</label>
    //           <input
    //             className="input border rounded w-full py-2 px-3"
    //             type="text"
    //             name="shipmentid"
    //             value={editedShipmentData.shipmentid}
    //             onChange={handleInputChange}
    //             readOnly
    //           />
    //         </div>
    //         <div className="mb-4">
    //           <label className="block text-gray-700">Customer Name</label>
    //           <input
    //             className="input border rounded w-full py-2 px-3"
    //             type="text"
    //             name="customername"
    //             value={editedShipmentData.customername}
    //             onChange={handleInputChange}
    //           />
    //         </div>

    //         <div className="mb-4">
    //           <label className="block text-gray-700">Destination Address</label>
    //           <input
    //             className="input border rounded w-full py-2 px-3"
    //             type="text"
    //             name="destinationaddress"
    //             value={editedShipmentData.destinationaddress}
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //         <div className="mb-4">
    //           <label className="block text-gray-700">Shipment Status</label>
    //           <select
    //   id="shipmentstatus"
    //   value={editedShipmentData.shipmentstatus}
    //   name="shipmentstatus"
    //   onChange={handleInputChange}
    //   className="input border rounded w-full py-2 px-3"
    // >
    //   <option value="pending">Pending</option>
    //   <option value="inTransit">In Transit</option>
    //   <option value="delivered">Delivered</option>
    // </select>
    //         </div>
    //         <div className="mb-4">
    //           <label className="block text-gray-700">Planned Delivery Date</label>
    //           <input
    //             className="input border rounded w-full py-2 px-3"
    //             type="date"
    //             name="planneddeliverydate"
    //             value={editedShipmentData.planneddeliverydate}
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //         <div className="mb-6">
    //           <label className="block text-gray-700">Actual Delivery Date</label>
    //           <input
    //             className="input border rounded w-full py-2 px-3"
    //             type="date"
    //             name="actualdeliverydate"
    //             value={editedShipmentData.actualdeliverydate}
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //         <button type="submit" className="bg-gray-500 text-white rounded px-6 py-2 mt-4 hover:bg-gray-600 transition duration-300">
    //           Save Changes
    //         </button>
    //       </form>
    //     </section>
    //   </div>
    // </div>





    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className={`modal-background ${styles.modalBackground}`} onClick={onClose}></div>
      <div className={`modal-card ${styles.modalCard}`}>
        {/* <header className={`modal-card-head ${styles.modalHeader}`}>
      <button className="delete" aria-label="close" onClick={onClose}></button>
    </header> */}
        <section className={`modal-card-body ${styles.modalBody}`}>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Shipment ID</label>
              <input
                className="input border rounded w-full py-2 px-3"
                type="text"
                name="shipmentid"
                value={editedShipmentData.shipmentid}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Shipment Status</label>
              <select
                id="shipmentstatus"
                value={editedShipmentData.shipmentstatus}
                name="shipmentstatus"
                onChange={handleInputChange}
                className="input border rounded w-full py-2 px-3"
              >
                <option value="pending">Pending</option>
                <option value="inTransit">In Transit</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Actual Delivery Date</label>
              <input
                className="input border rounded w-full py-2 px-3"
                type="date"
                name="actualdeliverydate"
                value={editedShipmentData.actualdeliverydate}
                onChange={handleInputChange}

              />
            </div>
            <button
              type="submit"
              className={`bg-gray-500 text-white rounded px-6 py-2 mt-4 hover:bg-gray-600 transition duration-300 ${styles.submitButton}`}
            >
              Save Changes
            </button>

          </form>
        </section>
      </div>
    </div>




  );
};

export default EditModal;
