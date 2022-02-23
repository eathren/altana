import { useState, useEffect, useRef, useCallback } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { useNavigate } from "react-router-dom";

// This func handles the Cytospace graph/canvas part of the demo.
const Graph = (props) => {
  const [elements, setElements] = useState([]);
  const [layout, setLayout] = useState({ name: "circle" });

  const cyRef = useRef();
  let navigate = useNavigate();
  useEffect(() => {
    setNodes();
    updateLayout();
    if (cyRef.current) {
      cyRef.current.removeAllListeners();
      cyRef.current = null;
    }
  }, []);

  // this is to tell what node is clicked in the Cytospace canvas.
  const cyCallback = useCallback((cy) => {
    // this is called each render of the component, don't add more listeners
    if (cyRef.current) return;

    cyRef.current = cy;
    cy.on("tap", "node", function (evt) {
      let node = evt.target;
      navigate(`/company/${node.id()}`);
    });
  });

  const updateLayout = () => {
    setLayout({ name: "concentric" });
  }; // move logic to cy.on if demo persists.

  // this iterates through all the trading-partners, then adds them to
  // an array for cytospace to use.
  const setNodes = () => {
    let currElements = [];

    for (let i = 0; i < props.tradingPartners.num_results; i++) {
      try {
        let x = 100 + i * 3;
        let y = 100 + i * 3;

        let currId = props.tradingPartners.companies[i].altana_canon_id;
        let currName = props.tradingPartners.companies[i].company_name;
        currElements.push({
          data: {
            id: currId,
            label: currName,
            position: { x: x, y: y },
          },
        });
        currElements.push({
          data: {
            source: props.companyId,
            target: currId,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
    currElements.push({
      data: { id: props.companyId, label: "" },
    });
    setElements(currElements);
  };

  return (
    <CytoscapeComponent
      elements={elements}
      layout={layout}
      style={{ width: "1200px", height: "800px" }}
      cy={cyCallback}
    />
  );
};

export default Graph;
