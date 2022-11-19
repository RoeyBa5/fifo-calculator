import React, {useCallback} from 'react'
import Dropzone from 'react-dropzone'


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

    return (
        <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles, 1)}>
            {({getRootProps, getInputProps}) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                </section>
            )}
        </Dropzone>
    )
}

export default MyDropzone