import React, {useCallback} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

function ResultTable(props) {
    return (
        <TableContainer component={Paper} style={{width: 1000, margin: "30px"}}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Asset Name</TableCell>
                        <TableCell align="right">Asset Symbol</TableCell>
                        <TableCell align="right">Max Loss</TableCell>
                        <TableCell align="right">Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.result.map((row) => (
                        <TableRow key={row.asset_symbol}>
                            <TableCell component="th" scope="row">
                                {row.asset_name}
                            </TableCell>
                            <TableCell align="right">{row.asset_symbol}</TableCell>
                            <TableCell align="right">{row.loss.toFixed(2)}</TableCell>
                            <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ResultTable