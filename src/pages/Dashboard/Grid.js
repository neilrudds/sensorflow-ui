import React, { useState, useEffect, useMemo } from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";
import { apiDashboard } from "../../utils/apiManager/apiDashboard";
import Widget from './Widget';

const originalItems = ["Widget A", "Widget B", "Widget C", "Widget D"];

const initialLayouts = {
    lg: [
        { i: 'Widget A', x: 0, y: 0, w: 1, h: 2 },
        { i: 'Widget B', x: 1, y: 0, w: 3, h: 2 },
        { i: 'Widget C', x: 4, y: 0, w: 1, h: 2 },
        { i: 'Widget D', x: 0, y: 2, w: 2, h: 2 },
    ]
};

const Grid = (props) => {
    const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);
    const { dashboardId } = props;
    const { getDashboard, updateDashboard } = apiDashboard();
    const [items, setItems] = useState(originalItems);
    const [layouts, setLayouts] = useState(initialLayouts);

    useEffect(() => {
        getDashboard(dashboardId)
            .then((res) => {
                if (res.gridLayout != null) {
                    console.log("layout exists in db!");
                    setLayouts(JSON.parse(res.gridLayout));
                } else {
                    console.log("layout empty");
                    setLayouts(initialLayouts);
                }
            })
    }, [props]);

    const onLayoutChange = (_, allLayouts) => {
        if (JSON.stringify(layouts) !== JSON.stringify(allLayouts)) {
            setLayouts(allLayouts);
            const params = { gridLayout: JSON.stringify(allLayouts) };
            console.log("Layouts to save: " + params);
            updateDashboard(dashboardId, params)
                .then((res) => {
                    console.log("Layouts saved: " + JSON.stringify(res));
                });
        }
    };
    const onLayoutSave = () => {
        saveToLS('layouts-' + dashboardId, layouts);
    };
    const onRemoveItem = (itemId) => {
        setItems(items.filter((i) => i !== itemId));
    };
    const onAddItem = (itemId) => {
        setItems([...items, itemId]);
    };

    return (
        <>
            <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-dark-purple text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => onAddItem(1)}
            >
                Add item
            </button>
            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                onLayoutChange={onLayoutChange}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={60}
            >
                {items.map((key) => (
                    <div
                        key={key}
                        className="widget"
                    //data-grid={{ w: 3, h: 2, x: 0, y: Infinity }}
                    >
                        <Widget
                            id={key}
                            onRemoveItem={onRemoveItem}
                        />
                    </div>
                ))}
            </ResponsiveGridLayout>
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