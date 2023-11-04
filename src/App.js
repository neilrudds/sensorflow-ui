import Root from './components/ui/Root';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import WorkspaceContent from './components/ui/WorkspaceContent';
import Index from './components/ui/Index';
import ErrorContent from './components/ui/ErrorPage';
import WorkspaceProvider from './utils/WorkspaceProvider';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import RequireAuth from './utils/RequireAuth';
import AuthProvider from './utils/AuthProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
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
            element: <Navigate to="devices" replace />
          },
          {
            path: "devices",
            element: <WorkspaceContent />,
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
            element: null
          }
        ]
      }
    ]
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  }
]);

const App = () => {

  return (
    <AuthProvider>
      <WorkspaceProvider>
        <RouterProvider router={router} />
      </WorkspaceProvider>
    </AuthProvider>
  );
}

export default App;