import MainContent from './components/ui/MainContent';
import Root from './components/ui/Root';
import WorkspaceContent from './components/ui/WorkSpace';
import ErrorContent from './components/ui/ErrorPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorContent />,
    children: [
      {
        path: "/",
        element: <MainContent />
      },
      {
        path: "workspace/:workspaceId",
        element: <WorkspaceContent />
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