import React, { useState, useEffect } from "react";

export default function MyTable({}) {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(false);

  const fetchData = async () => {
    setIsloading(true);
    try {
      const jsonData = await fetch("/api/getLatestTransaction", {
        method: "POST",
      }).then((res) => res.json());

      setData(jsonData);
      console.log(jsonData);
    } catch (e) {
      console.log(e);
    }
    setIsloading(false);
  };

  //* WARN: Might require changes
  useEffect(() => {
    fetchData();
  }, []);

  //! TODO: Create a table which will display the data of the variable `data`
  return (
    <>
      <h1>Latest Transactions</h1>
    </>
  );
}
