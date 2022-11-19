import './App.css';
import MyDropzone from "./components/MyDropzone";
import {v4 as uuidv4} from 'uuid';
import {
    Button, CircularProgress, makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import React, {useEffect, useState} from 'react'
import ResultTable from "./components/ResultTable";


function App() {
    const [id, setId] = useState(uuidv4())
    const [filesUploaded, setFilesUploaded] = useState(0);
    const [result, setResult] = useState([]);
    const [query, setQuery] = useState(false);

    useEffect(() => {
        const calculate = async () => {
            if (!query) {
                return
            }
            console.log("Calculate " + id);
            await fetch('http://localhost:8000/api/max-loss?id=' + id, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                        console.log('Success:', data);
                        setResult(data);
                    }
                )
                .catch((error) => {
                        console.error('Error:', error);
                    }
                );
        }
        calculate();
    }, [query]);
    return (<div className="App">
        <header className="App-header">
            {result.length === 0 ? (
                <div>
                    <div style={{margin: 15}}>
                        Upload your files here
                    </div>
                    <div>
                        <MyDropzone id={id}
                                    filesUploaded={filesUploaded}
                                    setFilesUploaded={setFilesUploaded}/>
                    </div>
                    <div>
                        <Button variant="contained" onClick={() => {
                            setQuery(true);
                        }}>Calculate</Button>
                    </div>
                    {query === true ? <CircularProgress style={{margin: 20}}/> :
                        <CircularProgress style={{opacity: 0, margin: 20}}/>}
                </div>
            ) : (
                <div>
                    <div/>
                    <ResultTable result={result}/>
                    <Button variant="contained" onClick={() => {
                        setId(uuidv4());
                        setResult([]);
                        setQuery(false);
                    }}>Clear</Button>
                </div>

            )}
        </header>
    </div>);
}

export default App;



