import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// mui
import {
  AppBar,
  Box,
  Container,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
// icons
import SearchIcon from "@mui/icons-material/Search";

import { Link } from "react-router-dom";
import { Company, CompanyContext } from "../../models/index";

import * as d3 from "d3";
import { Graph } from "react-d3-graph";

interface Props {
  id: String;
}

const myConfig = {
  nodeHighlightBehavior: true,
  height: 1000,
  width: 1000,
  node: {
    color: "lightgreen",
    size: 120,
    highlightStrokeColor: "blue",
  },
  link: {
    highlightColor: "lightblue",
  },
};

const GraphView = (props: Props) => {
  const [company, setCompany] = useState<any>({});
  const [tradingPartners, setTradingPartners] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const d3Container = useRef(null);
  const [graphData, setGraphData] = useState<any>({ nodes: [], links: [] });
  const navigate = useNavigate();
  useEffect(() => {
    getCompany();
    getTradingPartners();
    console.log("UseEffect triggered");
  }, [props.id]);

  const getCompany = async () => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("x-api-key", `${process.env.REACT_APP_ALTANA_KEY}`);
    fetch(`https://api.altana.ai/atlas/v1/company/id/${props.id}`, {
      method: "GET",
      headers: requestHeaders,
    })
      .then((response) => response.json())
      .then((json) => setCompany(json));
  };

  const getTradingPartners = async () => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("x-api-key", `${process.env.REACT_APP_ALTANA_KEY}`);
    fetch(
      `https://api.altana.ai/atlas/v1/company/id/${props.id}/trading-partners`,
      {
        method: "GET",
        headers: requestHeaders,
      }
    )
      .then((response) => response.json())
      .then((json) => setTradingPartners(json))
      .then(() => assembleGraphData())
      .then(() => setIsLoading(false));
  };

  const data = {
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
    links: [
      { source: "Harry", target: "Sally" },
      { source: "Harry", target: "Alice" },
    ],
  };

  const assembleGraphData = async () => {
    try {
      const data = tradingPartners;
      const len = data.num_results;
      let nodes = [{ id: props.id }];
      let links = [];
      for (let i = 0; i < len; i++) {
        let id = tradingPartners.companies[i].altana_canon_id;
        let name = tradingPartners.companies[i].company_name;
        nodes.push({ id: id });
        links.push({ source: props.id, target: id });
      }
      let output = { nodes: nodes, links: links };
      console.log("ouput", output);
      setGraphData(output);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickNode = function (nodeId: any) {
    navigate(`/company/${nodeId}`);
  };

  const onClickLink = function (source: any, target: any) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  if (!isLoading) {
    return (
      <div>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {company.company_name}
        </Typography>
        <Container maxWidth="lg">
          <Graph
            id="graph-id" // id is mandatory
            data={graphData}
            config={myConfig}
            onClickNode={onClickNode}
            onClickLink={onClickLink}
          />
        </Container>
      </div>
    );
  } else {
    return <>Loading...</>;
  }
};

export default GraphView;
