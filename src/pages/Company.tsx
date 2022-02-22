// routing
import { useParams } from "react-router-dom";

// models
import { Company } from "../models";

// custom components
import GraphView from "../components/GraphView";

const CompanyPage = () => {
  let params = useParams();
  const { id } = params;
  return (
    <div>
      <GraphView id={id!} />
    </div>
  );
};

export default CompanyPage;
