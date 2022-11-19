import React, {useCallback, useMemo} from 'react'
import {useDropzone} from 'react-dropzone'

const AWS = require('aws-sdk');
const config = {
    "accessKeyId": "AKIAR4OF7R4FG7DHQPH5",
    "secretAccessKey": "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",
    "region": "eu-west-1",
}

const s3 = new AWS.S3(config);

function MyDropzone(props) {
    const onDrop = useCallback((acceptedFiles, id) => {
        let fileIndex = 0
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                console.log(binaryStr)
                const params = {
                    Bucket: 'fifo-calculator',
                    Key: props.id + '/' + fileIndex + '.csv',
                    Body: binaryStr,
                };
                s3.upload(params, (err, data) => {
                    if (err) {
                        throw err
                    }
                    console.log(`File uploaded successfully.
                              ${data.Location}`);
                });
                fileIndex++;
            }
            reader.readAsArrayBuffer(file)
        })
        props.setFilesUploaded(props.filesUploaded + acceptedFiles.length)
    }, [])
    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const focusedStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00663c'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({onDrop}, {accept: 'text/csv'})
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return (
        <section className="container">
            <div {...getRootProps({style})}>
                <input {...getInputProps()}  />
                {!isDragAccept ? <p>Drag 'n' drop some files here</p> : <p>Drop</p>}
            </div>
            {acceptedFiles.length > 0 ? <p>{acceptedFiles.length} files</p> : <p style={{opacity: 0}}>files</p>}
        </section>
    )
}

export default MyDropzone