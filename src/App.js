import MainContent from './components/ui/MainContent';
import Root from './components/ui/Root';
import WorkspaceContent from './components/ui/WorkSpace';
import Index from './components/ui/Index';
import ErrorContent from './components/ui/ErrorPage';
import { createBrowserRouter, RouterProvider, Navigate, useMatches } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;