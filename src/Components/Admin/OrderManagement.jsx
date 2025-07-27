import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  updateDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

const HelpRequestsTable = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "helpRequests"), (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(fetched);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id, newStatus) => {
    const docRef = doc(db, "helpRequests", id);
    try {
      await updateDoc(docRef, {
        status: newStatus,
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Pending Help Requests</h2>
      <div className="w-full">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-sm">Name</th>
              <th className="border px-4 py-2 text-sm">Phone</th>
              <th className="border px-4 py-2 text-sm">Type</th>
              <th className="border px-4 py-2 text-sm">Description</th>
              <th className="border px-4 py-2 text-sm">Status</th>
              <th className="border px-4 py-2 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.filter((req) => req.status === "Pending").length > 0 ? (
              requests
                .filter((req) => req.status === "Pending")
                .map((req) => (
                  <tr key={req.id} className="text-sm">
                    <td className="border px-4 py-2">{req.name}</td>
                    <td className="border px-4 py-2">{req.phone}</td>
                    <td className="border px-4 py-2">{req.helpType}</td>
                    <td className="border px-4 py-2 max-w-xs">
                      <div className="max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 pr-2">
                        {req.description}
                      </div>
                    </td>
                    <td className="border px-4 py-2 text-center font-semibold text-yellow-600">
                      {req.status}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex flex-col md:flex-row gap-2 justify-center">
                        <button
                          onClick={() => updateStatus(req.id, "Approved")}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(req.id, "Rejected")}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No pending help requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HelpRequestsTable;
