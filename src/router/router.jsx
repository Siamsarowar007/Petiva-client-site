// import {createBrowserRouter} from "react-router";
// import RootLayout from "../layout/RootLayout";
// import Home from "../pages/Home/Home/Home";
// import AuthLayout from "../layout/AuthLayout";
// import Login from "../pages/Authentication/Login/Login";
// import Register from "../pages/Authentication/Register/Register";
// import JoinUs from "../pages/JoinUs/JoinUs";
// import Membership from "../pages/Membership/Membership";
// import PrivateRoutes from "../routes/PrivateRoutes";
// import DashboardLayout from "../layout/DashboardLayout";
// import DashboardHome from "../pages/Dashboard/DashboardHome";
// import AdminRoute from "../routes/AdminRoute";
// import AdminDashboardHome from "../pages/Dashboard/AdminDashboardHome";
// import AdminDashboardLayout from "../layout/AdminDashboardLayout";
// import ManageUsers from "../pages/Dashboard/ManageUsers";





// export const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: RootLayout,
//     children:[
//         {
//             index: true,
//             Component: Home,
//         },
//         {
//           path: '/join-us',
//           Component: JoinUs,
//         },
//         {
//           path: '/membership',
//           Component: Membership,
//         },
//     ]
//   },
//   {
//     path: '/',
//     Component: AuthLayout,
//     children:[
//       {
//         path: '/login',
//         Component: Login,
//       },
//       {
//         path: '/register',
//         Component: Register,
//       },
//     ]
//   },

//   {
//     path: '/dashboard',
//     element: <PrivateRoutes>
//       <DashboardLayout></DashboardLayout>
//     </PrivateRoutes>,
//     children: [
//       {
//         index: true,
//         Component: DashboardHome,
//       },
//     ]
//   },

//   {
//     path: 'admin-dashboard',
//     element: <AdminRoute>
//       <AdminDashboardLayout></AdminDashboardLayout>
//     </AdminRoute>,
//     children:[
//       {
//         index: true,
//         Component: AdminDashboardHome,
//       },
//       {
//         path: 'admin-manageUsers',
//         Component: ManageUsers,
//       },
//     ]
//   },
// ]);

import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import JoinUs from "../pages/JoinUs/JoinUs";
import Membership from "../pages/Membership/Membership";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AdminDashboardHome from "../pages/Dashboard/AdminDashboardHome";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import PrivateRoutes from "../routes/PrivateRoutes";
import AdminRoute from "../routes/AdminRoute";
import AddPost from "../pages/Dashboard/UserDashboard/AddPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "join-us",
        element: <JoinUs />,
      },
      {
        path: "membership",
        element: (
          <PrivateRoutes>
            <Membership />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  // ✅ User Dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      // Add: profile, add-post, my-posts later
      {
        path: 'add-post',
        Component: AddPost,
      },
    ],
  },

  // ✅ Admin Dashboard
  {
    path: "/admin-dashboard",
    element: (
      <AdminRoute>
        <AdminDashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboardHome />,
      },
      {
        path: "admin-manageUsers",
        element: <ManageUsers />,
      },
    ],
  },
]);
