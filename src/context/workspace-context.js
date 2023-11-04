import { createContext } from "react";

// set defaults
const WorkspaceContext = createContext({
    id: null,
    name: null,
    setWorkspace: () => {}
});

export default WorkspaceContext;