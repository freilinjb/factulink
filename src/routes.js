
export const Routes = {
    // pages
    Presentation: { path: "/dashboard/overview" },
    DashboardOverview: { path: "/" },
    Transactions: { path: "/transactions" },
    Prueba: { path: "/prueba" },
    Settings: { path: "/settings" },
    Upgrade: { path: "/upgrade" },
    BootstrapTables: { path: "/tables/bootstrap-tables" },
    Billing: { path: "/examples/billing" },
    Invoice: { path: "/examples/invoice" },
    // Signin: { path: "/examples/sign-in" },
    Signin: { path: "/sign-in" },
    Signup: { path: "/sign-up" },
    ForgotPassword: { path: "/examples/forgot-password" },
    ResetPassword: { path: "/examples/reset-password" },
    Lock: { path: "/examples/lock" },
    NotFound: { path: "/examples/404" },
    ServerError: { path: "/examples/500" },

    // docs
    DocsOverview: { path: "/documentation/overview" },
    DocsDownload: { path: "/documentation/download" },
    DocsQuickStart: { path: "/documentation/quick-start" },
    DocsLicense: { path: "/documentation/license" },
    DocsFolderStructure: { path: "/documentation/folder-structure" },
    DocsBuild: { path: "/documentation/build-tools" },
    DocsChangelog: { path: "/documentation/changelog" },

    // components
    Accordions: { path: "/components/accordions" },
    Alerts: { path: "/components/alerts" },
    Badges: { path: "/components/badges" },
    Widgets: { path: "/widgets" },
    Breadcrumbs: { path: "/components/breadcrumbs" },
    Buttons: { path: "/components/buttons" },
    Forms: { path: "/components/forms" },
    Modals: { path: "/components/modals" },
    Navs: { path: "/components/navs" },
    Navbars: { path: "/components/navbars" },
    Pagination: { path: "/components/pagination" },
    Popovers: { path: "/components/popovers" },
    Progress: { path: "/components/progress" },
    Tables: { path: "/components/tables" },
    Tabs: { path: "/components/tabs" },
    Tooltips: { path: "/components/tooltips" },
    Toasts: { path: "/components/toasts" },
    WidgetsComponent: { path: "/components/widgets" },
    ///REGISTROS DE PRUEBAS
   // Product: { path: "/add/Product" }
    AdminProduct: { path: "/product" },
    Product: { path: "/product/add" },
    editProduct: { path: "/product/edit/:id" },
    AdminSupplier: { path: "/admin/supplier" },
    AddSupplier: { path: "/supplier/add" },
    EditSupplier: { path: "/supplier/edit/:id" },
    //CATEGORY
    AdminCategory: { path: '/product/category' },
    //SUBCATEGORY
    AdminSubCategory: { path: '/product/subCategory' },
    //SUBCATEGORY
    AdminUnid: { path: '/product/unid' },
    //CUSTOMER
    AdminCustomer: { path: '/customer' },
    AddCustomer: { path: '/customer/add' },
    UpdateCustomer: { path: '/customer/edit/:id' },
    //Billing
    Billing: { path: '/billing' },
    Invoice: { path: '/billing/invoice/:id' },
    //CUSTOMER
    AdminUser: { path: '/user' },
    AddUser: { path: '/user/add' },
    UpdateUser: { path: '/user/edit/:id' },
    //CUSTOMER
    AdminComprobantes: { path: '/comprobantes' },
    AddComprobante: { path: '/comprobantes/add' },
    UpdateComprobante: { path: '/comprobantes/edit/:id' },
};