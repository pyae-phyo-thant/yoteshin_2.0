import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";

const AdsDynamic = () => {
  const params = useParams();

  useEffect(() => {
    console.log(params);
  }, []);
  return <Layout>hello dynamic</Layout>;
};

export default AdsDynamic;
