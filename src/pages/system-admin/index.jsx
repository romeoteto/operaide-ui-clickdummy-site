import { useParams } from "wouter";

import AllUsers from "./allUsers";
import Organizations from "./organizations";

export default function PageSystemAdmin() {
  const params = useParams();
  const { page } = params;

  const returnPage = () => {
    switch (page) {
      case "organizations":
        return <Organizations />;

      case "all-users":
        return <AllUsers />;

      default:
        return <p>Nothing found.</p>;
    }
  };

  return (
    <div>
      <div className="content">{returnPage()}</div>
    </div>
  );
}
