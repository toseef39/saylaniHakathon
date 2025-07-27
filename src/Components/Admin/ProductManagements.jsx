import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const ProductManagement = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "appointments"));
      const fetchedOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteDoc(doc(db, "appointments", id));
        fetchOrders();
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const docRef = doc(db, "appointments", id);
      await updateDoc(docRef, { status: newStatus });
      fetchOrders(); // Refresh list
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Appointments Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-gray-500 border border-gray-300">
          <thead className="bg-gray-200 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Reason</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => {
                const dateObj = order.dateTime ? new Date(order.dateTime) : null;
                const date = dateObj ? dateObj.toLocaleDateString() : "N/A";
                const time = dateObj
                  ? dateObj.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A";

                return (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-blue-50 transition duration-150"
                  >
                    <td className="p-4">{order.name || "N/A"}</td>
                    <td className="p-4">{order.phone || "N/A"}</td>
                    <td className="p-4">{order.reason || "N/A"}</td>
                    <td className="p-4">{date}</td>
                    <td className="p-4">{time}</td>
                    <td className="p-4 font-semibold">
                      <span
                        className={`${
                          order.status === "Approved"
                            ? "text-green-600"
                            : order.status === "Rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => handleStatusUpdate(order.id, "Approved")}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(order.id, "Rejected")}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
