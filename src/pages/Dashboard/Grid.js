import React, { useState, useEffect, useMemo } from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";
import { apiDashboard } from "../../utils/apiManager/apiDashboard";
import Widget from "./Widget";
import AddWidgetModal from '../../components/modal/AddWidgetModal';
import mqtt from 'mqtt';
import { config } from '../../utils/Constants';

const MQTT_URL = config.url.MQTT_WS_URL;

const widgetDefaults = [
    { component: "value", minW: 2, minH: 3 },
    { component: "chart", minW: 3, minH: 3 }
];

const Grid = (props) => {
    const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);
    const { getDashboard, updateDashboard } = apiDashboard();
    const [widgets, setWidgets] = useState([]);
    const [layouts, setLayouts] = useState([]);
    const [currGridPos, setCurrGridPos] = useState({ col: 0, row: 0, height: 0 });
    const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState(false);
    const [payload, setPayload] = useState({});

    const initialConnectionOptions = {
        url: MQTT_URL,
        config: {
            clientId: 'emqx_react_' + Math.random().toString(16).substring(2, 8),
            username: '',
            password: '',
            port: 8000,
            clean: true,
            reconnectPeriod: 1000, // ms
            connectTimeout: 30 * 1000, // ms
        }
    }

    // MQTT
    const mqttConnect = (host, mqttOption) => {
        setConnectStatus('Connecting');
        setClient(mqtt.connect(host, mqttOption));
    };

    useEffect(() => {
        mqttConnect(initialConnectionOptions.url, initialConnectionOptions.config);
    }, []);

    useEffect(() => {
        if (client) {
            console.log(client);
            client.on('connect', () => {
                setConnectStatus('Connected');
            });
            client.on('error', (err) => {
                console.error('Connection error: ', err);
                client.end();
            });
            client.on('reconnect', () => {
                setConnectStatus('Reconnecting');
            });
            client.on('message', (topic, message) => {
                const payload = { topic, message: message.toString() }
                setPayload(payload)
                console.log(`received message: ${message} from topic: ${topic}`)
              });
        }
    }, [client]);

    /*useEffect(() => {
        return () => {
            console.log("Disconnecting MQTT broker...")
            if (client) {
                client.end(() => {
                    setConnectStatus('Disconnected');
                });
            }
        }
    }, [])*/

    const mqttDisconnect = () => {
        if (client) {
          try {
            client.end(false, () => {
              setConnectStatus('Connect')
              console.log('disconnected successfully')
            })
          } catch (error) {
            console.log('disconnect error:', error)
          }
        }
      }

    useEffect(() => {
        getDashboard(props.dashboardId)
            .then((res) => {
                if (res.gridWidgets != null) {
                    console.log("Widgets exist in db!");
                    setWidgets(JSON.parse(res.gridWidgets));
                    if (res.gridLayout != null) {
                        console.log("Layout exists in db!");
                        setLayouts(JSON.parse(res.gridLayout));
                    }
                } else {
                    setWidgets([]);
                    setLayouts([]);
                }
            })
    }, [props]);

    const onLayoutChange = (_, allLayouts) => {
        setLayouts(allLayouts);
        const params = { gridWidgets: JSON.stringify(widgets), gridLayout: JSON.stringify(allLayouts) };
        updateDashboard(props.dashboardId, params)
            .then((res) => {
                console.log("Widgets and layouts saved: " + JSON.stringify(res));
            });
    };

    const onRemoveItem = (_uid) => {
        console.log("Removing widget: " + _uid);
        setWidgets(widgets.filter(widgets => widgets._uid !== _uid));
    };

    const getWidgetCoordinates = (wd) => {
        const { col, row, height } = currGridPos;

        let x = (col + wd.minW > 12 ? 0 : col % 12);
        let y = row;

        if (x === 0) {
            y += wd.minH;
            setCurrGridPos({ ...currGridPos, height: wd.minH });
        } else {
            if (wd.minH > height) {
                y += (wd.minH - height);
                setCurrGridPos({ ...currGridPos, height: wd.minH });
            }
        }
        setCurrGridPos({ ...currGridPos, col: x + wd.minW, row: y });

        return { x, y };
    }

    const onAddWidget = (widget) => {
        // Get the type boundaries
        const wd = widgetDefaults.filter(c => c.component === widget.component)[0];

        const { x, y } = getWidgetCoordinates(wd);
        const newLayout = {
            i: widget._uid,
            x: x, // depeding on breakpoints
            y: y,
            w: wd.minW,
            h: wd.minH,
            minW: wd.minW,
            minH: wd.minH
        };

        console.log("Adding widget: " + JSON.stringify(widget));
        setWidgets([...widgets, widget]);
        setLayouts({
            lg: [...(layouts.lg || []),
                newLayout
            ]
        })
    };

    return (
        <>
            <p>{connectStatus ? "Live data" : "Unable to connect to server"}</p>
            <span className="relative flex h-2 w-2">
                <span className={`${connectStatus ? ("animate-ping bg-sky-400") : ("bg-orange-400")} absolute inline-flex h-full w-full rounded-full opacity-75`}></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <AddWidgetModal addWidget={onAddWidget} />
            {widgets.length > 0 ?
                <ResponsiveGridLayout
                    className="layout"
                    layouts={layouts}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    rowHeight={60}
                    onLayoutChange={onLayoutChange}
                    draggableCancel=".cancelDraggable"
                >
                    {widgets.map((w) => (
                        <div
                            key={w._uid}
                            className="widget"
                        >
                            <Widget
                                widget={w}
                                wsClient={client}
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