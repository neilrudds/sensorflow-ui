import React, { useState, useEffect, useMemo } from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";
import { apiDashboard } from "../../utils/apiManager/apiDashboard";
import Widget from "./Widget";

const widgetDefaults = [
    { component: "value", minW: 2, minH: 2 },
    { component: "chart", minW: 3, minH: 3 }
];

const Grid = (props) => {
    const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);
    const { getDashboard, updateDashboard } = apiDashboard();
    const [items, setItems] = useState([]);
    const [layouts, setLayouts] = useState([]);
    const [currGridPos, setCurrGridPos] = useState({ col: 0, row: 0,  height: 0 });

    useEffect(() => {
        getDashboard(props.dashboardId)
            .then((res) => {
                if (res.gridWidgets != null) {
                    console.log("Widgets exist in db!");
                    setItems(JSON.parse(res.gridWidgets));
                    if (res.gridLayout != null){
                        console.log("Layout exists in db!");
                        setLayouts(JSON.parse(res.gridLayout));
                    }
                } else {
                    setItems([]);
                    setLayouts([]);
                }
            })
    }, [props]);

    const onLayoutChange = (_, allLayouts) => {
        setLayouts(allLayouts);
        const params = { gridWidgets: JSON.stringify(items), gridLayout: JSON.stringify(allLayouts) };
        updateDashboard(props.dashboardId, params)
            .then((res) => {
                console.log("Widgets and layouts saved: " + JSON.stringify(res));
            });
    };

    const onLayoutSave = () => {
        saveToLS('layouts-' + props.dashboardId, layouts);
    };

    const onRemoveItem = (itemId) => {
        setItems(items.filter((i) => i !== itemId));
    };

    const getWidgetCordinates = (wd) => {
        const { col, row, height } = currGridPos;

        let x = (col + wd.minW > 12 ? 0 : col % 12);
        let y = row;

        if (x === 0) {
            y += wd.minH;
            setCurrGridPos({...currGridPos, height: wd.minH});
        } else {
            if (wd.minH > height) {
                y += (wd.minH - height);
                setCurrGridPos({...currGridPos, height: wd.minH});
            }
        }
        setCurrGridPos({...currGridPos, col: x + wd.minW, row: y});

        return { x, y };
    }

    const onAddWidget = (type) => {
        const wd = widgetDefaults.filter(c => c.component === type)[0];
        const newWidget = {
            _uid: `widget${items.length + 1}`,
            component: type,
            title: `Widget${items.length + 1} title`,
            headline: `Widget${items.length + 1} headline`
        };

        const { x, y } = getWidgetCordinates(wd);
        const newLayout = {
            i: `widget${items.length + 1}`,
            x: x, // depeding on breakpoints
            y: y,
            w: wd.minW,
            h: wd.minH,
            minW: wd.minW,
            minH: wd.minH
        };

        console.log("adding widget: " + JSON.stringify(newWidget));
        setItems([...items, newWidget]);
        setLayouts({
            lg: [...(layouts.lg || []),
                newLayout
            ]
        })
    };

    return (
        <>
            <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-dark-purple text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => onAddWidget("chart")}
            >
                Add chart
            </button>
            <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-dark-purple text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => onAddWidget("value")}
            >
                Add value
            </button>
            { items.length > 0 ?
            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={60}
                onLayoutChange={onLayoutChange}
            >
                {items.map((w) => (
                    <div
                        key={w._uid}
                        className="widget"
                        /*data-grid={w.layout}*/
                    >
                        <Widget
                            widget={w}
                            onRemoveItem={onRemoveItem}
                        />
                    </div>
                ))}
            </ResponsiveGridLayout>
            : <div><p>Dashboard empty, please add a widget to begin.</p></div>}
        </>
    );
}

export default Grid;

function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
        } catch (e) { }
    }
    return ls[key];
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(
            "rgl-8",
            JSON.stringify({
                [key]: value
            })
        );
    }
}