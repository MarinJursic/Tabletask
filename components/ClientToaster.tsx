"use client"; // ✅ Ensure this runs on the client

import { Toaster } from "react-hot-toast";

const ClientToaster = () => {
  return <Toaster position="top-left" reverseOrder={false} />;
};

export default ClientToaster;
