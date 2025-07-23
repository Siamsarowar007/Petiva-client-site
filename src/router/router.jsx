import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import HomeLayout from "../pages/Home/HomeLayout";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import JoinUs from "../pages/JoinUs/JoinUs";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import PrivateRoutes from "../routes/PrivateRoutes";
import AddPost from "../pages/Dashboard/UserDashboard/AddPost";
import MyProfile from "../pages/Dashboard/UserDashboard/MyProfile";
import MyPost from "../pages/Dashboard/UserDashboard/MyPost";
import AllPost from "../pages/AllPost/AllPost";
import EditPost from "../pages/EditPost/EditPost";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import Announcement from "../pages/Dashboard/Admin/MakeAnnouncement";
import PostDetails from "../pages/AllPost/PostDetails";
import AdminReportedComments from "../pages/Dashboard/Admin/AdminReportedComments";
import CommentReportPage from "../pages/AllPost/CommentReportPage";
import PaymentPage from "../pages/Membership/PaymentPage";
import MembershipPage from "../pages/Membership/MembershipPage"
import MembershipDashboard from "../pages/Membership/MembershipDashboard";
import Support from "../pages/Support/Support";
import AboutUs from "../pages/AboutUs/AboutUs";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomeLayout />,
      },
      {
        path: "all-post",
        element: <AllPost />,
      },
      {
        path: "forbidden",
        element: <Forbidden />,
      },
      {
        path: "post-details/:id",
        element: <PostDetails />,
      },
      {
        path: "comments/:postId",
        element: <CommentReportPage></CommentReportPage>,
      },
      {
        path: "edit-post/:id",
        element: <EditPost />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "join-us",
        element: <JoinUs />,
      },
      // {
      //   path: "/*",
      //   element: <ErrorPage />,
      // },
      {
        path: "membership",
        element: (
          <PrivateRoutes>
            <MembershipPage></MembershipPage>
          </PrivateRoutes>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoutes>
            <PaymentPage />
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
      {
        path: "/*",
        element: <ErrorPage />,
      },
    ],
  },
  // User Dashboard Routes Protected by PrivateRoutes
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
      {
        path: "dashboard-home",
        element: <DashboardHome />,
      },
      {
        path: "profile",
        element: <MyProfile />,
      },
      {
        path: "payment-membership",
        element: <MembershipDashboard></MembershipDashboard>,
      },
      {
        path: "add-post",
        element: <AddPost />,
      },
      {
        path: "my-posts",
        element: <MyPost />,
      },
      {
        path: "announcement/:id",
        element: <MyPost />,
      },

      {
        path: "admin-dashboard",
        element: <AdminRoute>
          <AdminDashboard />
        </AdminRoute>,
      },
      {
        path: "admin-profile",
        element: <AdminRoute>
          <AdminProfile />
        </AdminRoute>,
      },
      {
        path: "announcement",
        element: <AdminRoute>
          <Announcement />
        </AdminRoute>,
      },
      {
        path: "manage-users",
        element: <AdminRoute>
          <ManageUsers />
        </AdminRoute>,
      },
      {
        path: "admin-report",
        element: <AdminReportedComments></AdminReportedComments>
      }

    ],
  },

]);
