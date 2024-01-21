import React, { useState } from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

const originalItems = ["a", "b", "c", "d"];

const initialLayouts = {
    lg: [
        { i: 'a', x: 0, y: 0, w: 1, h: 2 },
        { i: 'b', x: 1, y: 0, w: 3, h: 2 },
        { i: 'c', x: 4, y: 0, w: 1, h: 2 },
        { i: 'd', x: 0, y: 2, w: 2, h: 2 },
    ],
};

export const Grid = () => {
    const [items, setItems] = useState(originalItems);
    const [layouts, setLayouts] = useState(
        getFromLS('layouts') || initialLayouts
    );
    const onLayoutChange = (_, allLayouts) => {
        setLayouts(allLayouts);
    };
    const onLayoutSave = () => {
        saveToLS("layouts", layouts);
    };
    const onRemoveItem = (itemId) => {
        setItems(items.filter((i) => i !== itemId));
    };
    const onAddItem = (itemId) => {
        setItems([...items, itemId]);
    };
    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={initialLayouts}
            onLayoutChange={onLayoutChange}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={60}
        >
            {items.map((key) => (
                <div
                    key={key}
                    className="widget"
                    data-grid={{ w: 3, h: 2, x: 0, y: Infinity }}
                >
                    <Widget
                        id={key}
                        onRemoveItem={onRemoveItem}
                        backgroundColor="#867ae9"
                    />
                </div>
            ))}
        </ResponsiveGridLayout>
    );
}

export default Grid;

function Widget({ id, backgroundColor }) {
    return (
        <div style={{ width: '100%', height: '100%', backgroundColor }}>{id}</div>
    );
}

function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
      } catch (e) {}
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