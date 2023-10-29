import React, { useEffect, useState } from "react";
import {useAuth} from "../context/AuthContext";

const Toast = () => {
  const {toast, setToast} = useAuth();

  useEffect(() => {
    if (toast.isOpen) {
      const timer = setTimeout(() => {
        setToast(false);
      }, 3000); // Close the toast after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    toast.isOpen && (
      <div
        className={`fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded`}
      >
        <p>{toast.message}</p>
      </div>
    )
  );
};

export default Toast;
