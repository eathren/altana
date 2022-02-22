import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

interface Props {
  id: String;
}

const GraphView = (props: Props) => {
  const [company, setCompany] = useState<any>();
  const [tradingPartners, setTradingPartners] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getCompany();
    getTradingPartners();
    console.log(company);
    console.log(tradingPartners);
  }, []);

  const getCompany = async () => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("x-api-key", `${process.env.REACT_APP_ALTANA_KEY}`);
    await fetch(`https://api.altana.ai/atlas/v1/company/id/${props.id}`, {
      method: "GET",
      headers: requestHeaders,
    })
      .then((response) => response.json())
      .then((json) => setCompany(json))
      .then(() => setIsLoading(false));
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
      .then((response) => response.json())
      .then((json) => setTradingPartners(json))
      .then(() => setIsLoading(false));
    console.log(tradingPartners);
  };
  if (!isLoading) {
    return <div>{company.company_name}</div>;
  } else {
    return <>Loading...</>;
  }
};

export default GraphView;
