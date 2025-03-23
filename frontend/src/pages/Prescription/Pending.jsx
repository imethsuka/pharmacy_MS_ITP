import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderStripe from "../../components/HeaderStripe";
import PSidebar from "../../components/Prescription/PSidebar";
//import FilteredOrders from "../../components/Prescription/FilteredOrders";

import FilteredOrders from "../../components/Prescription/FilteredOrders";

const Pending = () => <FilteredOrders statusFilter="Pending" title="Pending Orders" />;

export default Pending;