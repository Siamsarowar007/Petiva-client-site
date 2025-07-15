import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import HomeLayout from "../pages/Home/HomeLayout";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import JoinUs from "../pages/JoinUs/JoinUs";
import Membership from "../pages/Membership/Membership";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import PrivateRoutes from "../routes/PrivateRoutes";
import AddPost from "../pages/Dashboard/UserDashboard/AddPost";
import MyProfile from "../pages/Dashboard/UserDashboard/MyProfile";
import MyPost from "../pages/Dashboard/UserDashboard/MyPost";
// import CommentsPage from "../pages/Dashboard/UserDashboard/CommentsPage";
import AllPost from "../pages/AllPost/AllPost";
import EditPost from "../pages/EditPost/EditPost";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
// import Report from "../pages/Dashboard/Admin/Report";
import Announcement from "../pages/Dashboard/Admin/MakeAnnouncement";
import PostDetails from "../pages/AllPost/PostDetails";
// import CommentManage from "../pages/Dashboard/Admin/CommentManage";
import AdminReportedComments from "../pages/Dashboard/Admin/AdminReportedComments";
import CommentReportPage from "../pages/AllPost/CommentReportPage";


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
        path: "admin-profile",
        element: <AdminProfile />,
      },
       {
        path: "announcement",
        element: <Announcement />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      // {
      //   path: "comment-manage",
      //   element: <CommentManage></CommentManage>,
      // },
      {
        path:"admin-report",
        element:<AdminReportedComments></AdminReportedComments>
      }
     
    ],
  },
  // Admin Dashboard Routes Protected by AdminRoute
  // {
  //   path: "/admin-dashboard",
  //   element: (
  //     <AdminRoute>
  //       <AdminDashboardLayout />
  //     </AdminRoute>
  //   ),
  //   children: [
  //     {
  //       index: true,
  //       element: <AdminDashboardHome />,
  //     },
  //     {
  //       path: "admin-manageUsers",
  //       element: <ManageUsers />,
  //     },
  //   ],
  // },
]);
