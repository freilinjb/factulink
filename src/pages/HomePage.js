import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

import { ToastProvider } from "react-toast-notifications";

// pages
import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

import Prueba from "./Prueba";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";

import NavbarPOS from "../components/NavbarPOS";


import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";

import AuthState from "../context/auth/AuthState";
import ProductState from "../context/product/ProductState";
import CustomerState from "../context/customer/CustomerState";
import SupplierState from "../context/supplier/SupplierState";
import CategoryState from "../context/category/CategoryState";
import SubCategoryState from "../context/subcategory/SubCategoryState";
import UnidState from "../context/unid/UnidState";

import ProductEdit from "./adminProduct/edit/ProductEdit";
import AdminProduct from "./adminProduct/AdminProduct";

import Supplier from "./adminSupplier/Supplier";
import addSupplier from "./adminSupplier/add/Supplier";
import SupplierEdit from "./adminSupplier/edit/SupplierEdit";
//Category
import Category from "./category/Category";
import SubCategory from "./sucategory/SubCategory";

//Unid
import Unid from "./unid/Unid";

//AdminCustomer
import AdminCustomer from "./customer/AdminCustomer";
import CustomerEdit from "./customer/edit/CustomerEdit";
import CustomerAdd from "./customer/add/CustomerAdd";

//Billing
import Billing from "./Billing";


const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithNavbarPOS = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> 
          <main className="">
          <NavbarPOS/>
          <Component {...props} />{" "}
          </main>
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            <Navbar />
            <Component {...props} />
            <Footer
              toggleSettings={toggleSettings}
              showSettings={showSettings}
            />
          </main>
        </>
      )}
    />
  );
};

export default () => (
  <ToastProvider>
    <AuthState>
    <CustomerState>
      <SupplierState>
        <ProductState>
          <CategoryState>
            <SubCategoryState>
              <UnidState>
              <Switch>
                <RouteWithLoader
                  exact
                  path={Routes.Presentation.path}
                  component={Presentation}
                />
                <RouteWithLoader
                  exact
                  path={Routes.Signin.path}
                  component={Signin}
                />
                <RouteWithLoader
                  exact
                  path={Routes.Signup.path}
                  component={Signup}
                />
                <RouteWithLoader
                  exact
                  path={Routes.ForgotPassword.path}
                  component={ForgotPassword}
                />
                <RouteWithLoader
                  exact
                  path={Routes.ResetPassword.path}
                  component={ResetPassword}
                />
                <RouteWithLoader
                  exact
                  path={Routes.Lock.path}
                  component={Lock}
                />
                <RouteWithLoader
                  exact
                  path={Routes.NotFound.path}
                  component={NotFoundPage}
                />
                <RouteWithLoader
                  exact
                  path={Routes.ServerError.path}
                  component={ServerError}
                />

                {/* pages */}
                <RouteWithSidebar
                  exact
                  path={Routes.DashboardOverview.path}
                  component={DashboardOverview}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Upgrade.path}
                  component={Upgrade}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Transactions.path}
                  component={Transactions}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Settings.path}
                  component={Settings}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.BootstrapTables.path}
                  component={BootstrapTables}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Prueba.path}
                  component={Prueba}
                />

                {/* components */}
                <RouteWithSidebar
                  exact
                  path={Routes.Accordions.path}
                  component={Accordion}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Alerts.path}
                  component={Alerts}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Badges.path}
                  component={Badges}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Breadcrumbs.path}
                  component={Breadcrumbs}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Buttons.path}
                  component={Buttons}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Forms.path}
                  component={Forms}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Modals.path}
                  component={Modals}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Navs.path}
                  component={Navs}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Navbars.path}
                  component={Navbars}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Pagination.path}
                  component={Pagination}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Popovers.path}
                  component={Popovers}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Progress.path}
                  component={Progress}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Tables.path}
                  component={Tables}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Tabs.path}
                  component={Tabs}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Tooltips.path}
                  component={Tooltips}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.Toasts.path}
                  component={Toasts}
                />

                {/* documentation */}
                <RouteWithSidebar
                  exact
                  path={Routes.DocsOverview.path}
                  component={DocsOverview}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.DocsDownload.path}
                  component={DocsDownload}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.DocsQuickStart.path}
                  component={DocsQuickStart}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.DocsLicense.path}
                  component={DocsLicense}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.DocsFolderStructure.path}
                  component={DocsFolderStructure}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.DocsBuild.path}
                  component={DocsBuild}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.DocsChangelog.path}
                  component={DocsChangelog}
                />

                {/* PAGINAS DE PRUEBAS */}
                <RouteWithSidebar
                  exact
                  path={Routes.AdminProduct.path}
                  component={AdminProduct}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.AdminUnid.path}
                  component={Unid}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.editProduct.path}
                  component={ProductEdit}
                />

                <RouteWithSidebar
                  exact
                  path={Routes.AdminSupplier.path}
                  component={Supplier}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.AddSupplier.path}
                  component={addSupplier}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.EditSupplier.path}
                  component={SupplierEdit}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.AdminCategory.path}
                  component={Category}
                />
                <RouteWithSidebar
                  exact
                  path={Routes.AdminSubCategory.path}
                  component={SubCategory}
                />

                <RouteWithSidebar
                  exact
                  path={Routes.AdminCustomer.path}
                  component={AdminCustomer}
                />
                
                <RouteWithSidebar
                  exact
                  path={Routes.AddCustomer.path}
                  component={CustomerAdd}
                />

                <RouteWithSidebar
                  exact
                  path={Routes.UpdateCustomer.path}
                  component={CustomerAdd}
                />
                {/* START USER */}
                <RouteWithSidebar
                  exact
                  path={Routes.AdminUser.path}
                  component={AdminCustomer}
                />
                
                <RouteWithSidebar
                  exact
                  path={Routes.AddUser.path}
                  component={CustomerAdd}
                />

                <RouteWithSidebar
                  exact
                  path={Routes.UpdateUser.path}
                  component={CustomerAdd}
                />

                {/* END USER */}

                <RouteWithNavbarPOS
                  exact
                  path={Routes.Billing.path}
                  component={Billing}
                />

                <Redirect to={Routes.NotFound.path} />
              </Switch>
              </UnidState>
            </SubCategoryState>
          </CategoryState>
        </ProductState>
      </SupplierState>
      </CustomerState>
    </AuthState>
  </ToastProvider>
);
