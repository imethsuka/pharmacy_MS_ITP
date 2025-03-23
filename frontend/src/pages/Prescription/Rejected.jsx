import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderStripe from "../../components/HeaderStripe";
import AddPSidebar from "../../components/Prescription/PSidebar";

import FilteredOrders from "../../components/Prescription/FilteredOrders";


const Rejected = () => <FilteredOrders statusFilter="rejected" title="Rejected Orders" />;

export default Rejected;
