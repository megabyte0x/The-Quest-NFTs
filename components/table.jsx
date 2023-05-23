import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function MyTable({}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const fetchData = async () => {
    setIsloading(true);
    try {
      const jsonData = await fetch("/api/getLatestTransaction", {
        method: "POST",
      }).then((res) => res.json());

      setData(jsonData.transactions);
      console.log(jsonData.transactions);
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
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            width: "50%",
            margin: "auto",
          }}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">To</TableCell>
                <TableCell align="center">Token ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{transaction.to}</TableCell>
                  <TableCell align="center">{transaction.tokenId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}