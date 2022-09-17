import { useEffect, useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Helmet } from "react-helmet";


const Page404 = () => {

  return (
    <>
    <Helmet>
      <meta 
      name="description"
      content="Page not found"
      />
      <title>Page not found</title>
    </Helmet>
      <ErrorMessage style={{ display: "flex", justifyContent: "center" }} />
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Page doesn't exist
      </h1>
      <h4
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        To go back to main page press{" "}
        <button
          className="button button__main button__long"
          style={{ margin: "0 0 0 10px" }}
        >
          <div className="inner">Back to main page</div>
        </button>
      </h4>
    </>
  );
};

export default Page404;
