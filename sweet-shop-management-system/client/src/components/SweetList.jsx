import React from "react";
import { purchaseSweet, deleteSweet } from "../api/api.js";
import { useHistory } from "react-router-dom";
import { isAdmin, isAuthenticated } from "../utils/auth";

const SweetList = ({ sweets }) => {
  const history = useHistory();

  if (!Array.isArray(sweets) || sweets.length === 0) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500 text-lg">
        No sweets available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sweets.map((sweet) => (
        <div
          key={sweet._id}
          className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-5 flex flex-col"
        >
          {/* Sweet thumbnail */}
          <div className="w-16 h-16 bg-purple-100 text-purple-700 font-bold flex items-center justify-center rounded-full mb-4">
            {sweet.name
              ?.split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join("")}
          </div>

          {/* Sweet name */}
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{sweet.name}</h3>

          {/* Category and price */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500">{sweet.category}</span>
            <span className="bg-purple-600 text-white text-sm px-2 py-1 rounded">
              ${Number(sweet.price).toFixed(2)}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{sweet.description}</p>

          {/* Actions */}
          <div className="mt-auto flex items-center gap-2 flex-wrap">
            <button
              className={`flex-1 px-3 py-2 rounded text-white font-medium ${
                sweet.quantity <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              } transition`}
              disabled={sweet.quantity <= 0}
              onClick={() => purchaseSweet(sweet._id, 1)}
            >
              {sweet.quantity <= 0 ? "Sold Out" : "Purchase"}
            </button>

            {isAuthenticated() && isAdmin() && (
              <>
                <button
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
                  onClick={() => history.push(`/sweets/${sweet._id}/edit`)}
                >
                  Edit
                </button>

                <button
                  className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
                  onClick={async () => {
                    if (!window.confirm("Delete this sweet?")) return;
                    await deleteSweet(sweet._id);
                  }}
                >
                  Delete
                </button>
              </>
            )}

            <span className="ml-auto text-gray-700 font-medium">
              Qty: {sweet.quantity}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SweetList;
