import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// mui
import { Container, Typography } from "@mui/material";

// custom components
import Graph from "../Graph";

interface Props {
  // react-router- passes the param in from pages/Company as a prop.
  id: String;
}

// This is the main component for the Company pages. It fetches
// company trading-partners and names, then renders a node-graph structure
// on all the tier one suppliers.
const GraphView = (props: Props) => {
  const [ID, setID] = useState(props.id);
  const [company, setCompany] = useState<any>();
  const [tradingPartners, setTradingPartners] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [graphData, setGraphData] = useState<any>({});
  const navigate = useNavigate();
  // this is a fetch for a company given an ID.
  // at the moment, it only is used for the company name.
  const getCompany = async () => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("x-api-key", `${process.env.REACT_APP_ALTANA_KEY}`);
    await fetch(`https://api.altana.ai/atlas/v1/company/id/${props.id}`, {
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
    await fetch(
      `https://api.altana.ai/atlas/v1/company/id/${props.id}/trading-partners`,
      {
        method: "GET",
        headers: requestHeaders,
      }
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((json) => setTradingPartners(json))
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);

    // fetch for trading partners, fed into Graph component.
    getTradingPartners().catch(console.error);
    getCompany()
      .catch(console.error)
      .then(() => setIsLoading(false));
  }, [props.id]);

  // this is how the user navigates to new pages. Or alternatively, with a refactor,
  // how they would trigger new nodes added to the selected node.
  const onClickNode = function (nodeId: any) {
    console.log(nodeId);
    if (nodeId !== props.id) {
      setID(nodeId);
      navigate(`/company/${nodeId}`);
    }
  };

  // Main render, shows graph and company name
  // This render can take a while. Example: Starbucks. 64 nodes takes a few seconds on
  // a slow connection
  if (!isLoading && tradingPartners && company) {
    {
      console.log(tradingPartners);
    }
    return (
      <div>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {company ? company.company_name : ""}
        </Typography>
        <Container maxWidth="lg">
          <Graph
            companyId={props.id as string}
            tradingPartners={tradingPartners}
            currId={ID}
          />

          {/* {tradingPartners.companies.map((partner: any) => (
            <div key={partner.altana_canon_id}>
              <Typography>{partner.company_name} </Typography>
            </div>
          ))} */}
        </Container>
      </div>
    );
  } else {
    return <>Loading...</>;
  }
};

export default GraphView;
