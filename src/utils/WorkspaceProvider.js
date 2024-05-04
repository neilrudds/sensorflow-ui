import { useState } from "react";
import WorkspaceContext from "../context/workspace-context";

// The workspace provider will wrap all child compoents providing the workspace-context values for access.
export default function WorkspaceProvider({ children }){
    const [workspace, setWorkspace] = useState({id: null, name: "Click to create"});
    const value = { workspace, setWorkspace };

    return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}