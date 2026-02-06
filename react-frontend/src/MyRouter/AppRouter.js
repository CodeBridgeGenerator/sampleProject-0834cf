import React from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

import SingleVendorsPage from "../components/app_components/VendorsPage/SingleVendorsPage";
import VendorProjectLayoutPage from "../components/app_components/VendorsPage/VendorProjectLayoutPage";
import SingleContractsPage from "../components/app_components/ContractsPage/SingleContractsPage";
import ContractProjectLayoutPage from "../components/app_components/ContractsPage/ContractProjectLayoutPage";
import SingleIncidentsPage from "../components/app_components/IncidentsPage/SingleIncidentsPage";
import IncidentProjectLayoutPage from "../components/app_components/IncidentsPage/IncidentProjectLayoutPage";
import SingleWorkOrdersPage from "../components/app_components/WorkOrdersPage/SingleWorkOrdersPage";
import WorkOrderProjectLayoutPage from "../components/app_components/WorkOrdersPage/WorkOrderProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
  return (
    <Routes>
      {/* ~cb-add-unprotected-route~ */}
      <Route element={<ProtectedRoute redirectPath={"/login"} />}>
        
<Route path="/vendors/:singleVendorsId" exact element={<SingleVendorsPage />} />
<Route path="/vendors" exact element={<VendorProjectLayoutPage />} />
<Route path="/contracts/:singleContractsId" exact element={<SingleContractsPage />} />
<Route path="/contracts" exact element={<ContractProjectLayoutPage />} />
<Route path="/incidents/:singleIncidentsId" exact element={<SingleIncidentsPage />} />
<Route path="/incidents" exact element={<IncidentProjectLayoutPage />} />
<Route path="/workOrders/:singleWorkOrdersId" exact element={<SingleWorkOrdersPage />} />
<Route path="/workOrders" exact element={<WorkOrderProjectLayoutPage />} />
        {/* ~cb-add-protected-route~ */}
      </Route>
    </Routes>
  );
};

const mapState = (state) => {
  const { isLoggedIn } = state.auth;
  return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(AppRouter);
