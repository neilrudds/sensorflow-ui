import { createContext } from "react";

// set defaults
const WorkspaceContext = createContext({
    id: null, // Current workspace Id
    name: null, // Current workspace name
    currWsData: null, // Current workspace object, includes dashboard names etc
    allWsData: null, // All user accessable workspaces object
    setWorkspace: () => {} // set workspace function
});

export default WorkspaceContext;