 import { useMatches } from "react-router-dom";
 
 const SubHeader = (props) => {
    const { title } = props;

    let matches = useMatches();
    let crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.crumb(match.data));

    console.log({ matches });
    console.log("Layout", { crumbs });

    return (
        <>
        <div className="font-semibold text-xl">{title}</div>
        <div className="flex justify-between ...">
            <ol className="flex items-center space-x-1 mb-4">
                {crumbs.map((crumb, index) => (
                    <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-500 hover:text-gray-700">
                            <li key={index}>{crumb + (index < crumbs.length - 1 ? " > " : "")}</li>
                        </div>
                    </div>
                ))}
            </ol>
            <div>Toggle Switch</div>
        </div>
        <p><br/><br/></p>
        </>
    );
}

export default SubHeader;