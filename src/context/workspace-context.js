import { createContext } from "react";

// set defaults
const WorkspaceContext = createContext({
    id: null,
    name: null,
    currWsData: null,
    allWsData: null,
    setWorkspace: () => {}
});

export default WorkspaceContext;