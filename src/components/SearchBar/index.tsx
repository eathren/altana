import React, { useEffect, useState } from "react";

// mui
import {
  AppBar,
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
import { Company } from "../../models/index";

interface Props {}

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
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Paper
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
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  searchCompanies();
                  e.preventDefault();
                }
              }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={searchCompanies}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <SearchField companies={companies} isLoading={isLoading} />
      </Container>
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
  if (!isLoading && companies.length > 0) {
    return (
      <>
        {companies.map((company: Company) => (
          <div key={company.altana_canon_id}>
            <Link
              to={`/company/${company.altana_canon_id}`}
              style={{ textDecoration: "none", cursor: "pointer" }}
              state={`${company.altana_canon_id}`}
            >
              <Typography variant="body1" color="black">
                {company.company_name}
              </Typography>
            </Link>
          </div>
        ))}
      </>
    );
  } else if (!isLoading && companies.length === 0) {
    return (
      <>
        <Typography variant="h5">
          No data returned for that search. Please try again
        </Typography>
      </>
    );
  } else {
    return <></>;
  }
};

export default SearchBar;
