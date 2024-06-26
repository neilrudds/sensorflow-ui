import Root from './components/ui/Root';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import WorkspaceContent from './components/ui/WorkspaceContent';
import Dashboard from './pages/Dashboard/index'
import Index from './components/ui/Index';
import ErrorContent from './components/ui/ErrorPage';
import WorkspaceProvider from './utils/WorkspaceProvider';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import RequireAuth from './utils/RequireAuth';
import AuthProvider from './utils/AuthProvider';
import { StrictMode } from 'react';
import Devices from './pages/Devices';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      /* By encapsulating the Root component in the RequireAuth component
       we can ensure that a user is authenticated against the system first.
       Note; Being authenticated does not mean that they are authorised to
       access a resource.
      */
      <RequireAuth>
        <Root />
      </RequireAuth>
    ),
    handle: {
      crumb: ()=> "Home"
    },
    errorElement: <ErrorContent />,
    children: [
      {
        index: true,
        element: <Index />,
        handle: {
          crumb: ()=> "Workspace"
        },
      },
      {
        path: "/:workspaceId",
        handle: {
          crumb: ()=> "Workspace"
        },
        children: [
          {
            index: true,
            element: <WorkspaceContent />
          },
          {
            path: "devices",
            element: <Devices />,
            handle: {
              crumb: ()=> "Devices"
            },
            children: [
              {
                path: "grid",
                element: null
              }
            ]
          },
          {
            path: "dashboard/:dashboardId",
            element: <Dashboard />,
              handle: {
              crumb: ()=> "Dashboard"
            }
          }
        ]
      }
    ]
  },
  {
    // Publically accessable componenent required for signup
    path: "/signup",
    element: <SignupPage />
  },
  {
    // Publically accessable componenent required for authentication
    path: "/login",
    element: <LoginPage />
  }
]);

const App = () => {

  // Encapsulating the RouterProvider in the AuthProvider ensures that,
  // user AuthContext can be accessed by any child component.
  // Encapsulating the RouterProvider in the WorkspaceProvider ensures that,
  // the WorkspaceContext can be accessed by any child component.
  return (
    <StrictMode>
      <AuthProvider>
        <WorkspaceProvider>
          <RouterProvider router={router} />
        </WorkspaceProvider>
      </AuthProvider>
    </StrictMode>
  );
}

export default App;