import React, { useEffect, useState } from "react";

// mui
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
// icons
import SearchIcon from "@mui/icons-material/Search";

interface Props {}

type Company = {
  altana_canon_id?: string;
  company_context: CompanyContext;
  company_name: string;
  data_sources: string[];
  restrictions: string[];
  risks: string[];
};

type CompanyContext = {
  buyers?: any[];
  countries_of_destination?: string[];
  countries_of_operation?: string[];
  countries_of_origin?: string[];
  hs_traded?: string[];
  industries?: string[];
  number_records?: Number;
  products_received?: string[];
  products_sent?: string[];
  suppliers?: string[];
  trading_partners?: string[];
};

const SearchBar = (props: Props) => {
  const [companyName, setCompanyName] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {}, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  const searchCompanies = async () => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("x-api-key", `${process.env.REACT_APP_ALTANA_KEY}`);
    console.log("here");
    await fetch(
      `https://api.altana.ai/atlas/v1/company/search/${companyName}`,
      {
        method: "GET",
        headers: requestHeaders,
      }
    )
      .then((response) => response.json())
      .then((json) => setCompanies(json.companies))
      .then(() => setIsLoading(false));
    console.log(companies);
  }; // right now the API casts too wide a net. Find the obj name that matches exactly?
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/* <Typography variant="h5"> Altana</Typography> */}
          <Paper
            // component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 400,
              margin: "auto",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Companies"
              inputProps={{ "aria-label": "search google maps" }}
              value={companyName}
              onChange={handleChange}
              onSubmit={searchCompanies}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              //   type="submit"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={searchCompanies}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Toolbar>
      </AppBar>
      <SearchField companies={companies} isLoading={isLoading} />
    </div>
  );
};

type SearchProps = {
  companies: Company[];
  isLoading: boolean;
};

const SearchField = (props: SearchProps) => {
  const companies: Company[] = props.companies;
  const isLoading: boolean = props.isLoading;
  console.log("HERE", companies, isLoading);
  if (!isLoading) {
    return (
      <>
        {companies.map((company: Company) => (
          <>
            {company.company_name}
            <br />
          </>
        ))}
      </>
    );
  } else {
    return <> Data needed</>;
  }
};

export default SearchBar;
