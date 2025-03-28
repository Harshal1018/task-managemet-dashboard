
import { Navigate } from "react-router-dom";

// Redirect to the Auth page
const Index = () => {
  return <Navigate to="/auth" replace />;
};

export default Index;
