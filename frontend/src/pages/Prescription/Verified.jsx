import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderStripe from "../../components/HeaderStripe";
import AddPSidebar from "../../components/Prescription/PSidebar";

import FilteredOrders from "../../components/Prescription/FilteredOrders";


const Verified = () => <FilteredOrders statusFilter="approved" title="Approved  Orders" />;

export default Verified;