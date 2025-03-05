import React, { useState, useRef } from 'react';
import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import { Editor } from '@tinymce/tinymce-react';
import { useParams, useNavigate } from "react-router-dom";

const AddServiceArea = () => {
    const [images, setImages] = useState([]);
    const [image, setImage] = useState([]);
    const navigate = useNavigate();

    const [keywords, setKeywords] = useState([]);
    const [keywordInput, setKeywordInput] = useState("");
    const editorRef = useRef(null);
    const editorRef2 = useRef(null);
    const handleImageChanges = (e) => {
        const files = e.target.files;
        setImages([...images, ...files]);
    };

    
    const handleImageChange = (e) => {
        const files = e.target.files;
        setImage(files);
    };

    const handleAddKeyword = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (keywordInput && !keywords.includes(keywordInput)) {
                setKeywords([...keywords, keywordInput]);
                setKeywordInput("");
            }
        }
    };

    const handleKeywordChange = (e) => {
        setKeywordInput(e.target.value);
    };

    const handleRemoveKeyword = (index) => {
        const newKeywords = [...keywords];
        newKeywords.splice(index, 1);
        setKeywords(newKeywords);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('area', e.target.areaName.value);
        formData.append('title', e.target.title.value);
        formData.append('sutitle', e.target.sutitle.value);

        formData.append('meta_name', e.target.metaName.value);
        formData.append('meta_description', e.target.metaDescription.value);
        formData.append('address', e.target.mapLocation.value);

        


        formData.append('meta_keywords', keywords.join(', '));
        formData.append('description', editorRef.current.getContent());
        formData.append('description2', editorRef2.current.getContent());
        formData.append('image', image[0]); // Assuming the first image is the primary image

        // Append additional images
        for (let i = 1; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {

            const response = await fetch(`${process.env.REACT_APP_API_URL}service-areas/`, {
                method: 'POST',  // Specify the HTTP method
                body: formData,  // Attach formData correctly
            });
        
            const responseData = await response.json(); // Convert response to JSON
            console.log('Response:', responseData);
            navigate(`/servicearea`);
        } catch (error) {
            console.error('Error:', error);
            
        }
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-center font-weight-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg hover:scale-105 transform transition-all duration-300">
                        Add Service Area
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                              <Col md={6}>
                            <FormGroup>
                                <Label for="areaName">Area Name</Label>
                                <Input id="areaName" name="areaName" placeholder="Enter Area Name" type="text" />
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="areaName">Title</Label>
                                <Input id="title" name="title" placeholder="Enter Title" type="text" />
                            </FormGroup>
                            </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                            <FormGroup>
                                <Label for="areaName">Sub Title</Label>
                                <Input id="sutitle" name="sutitle" placeholder="Enter Detail" type="text" />
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="metaName">Meta Name</Label>
                                <Input id="metaName" name="metaName" placeholder="Enter Meta Name" type="text" />
                            </FormGroup>
                            </Col></Row>
                            <Row>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="metaDescription">Meta Description</Label>
                                <Input id="metaDescription" name="metaDescription" placeholder="Enter Meta Description" type="text" />
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="mapLocation">Map Location</Label>
                                <Input id="mapLocation" name="mapLocation" placeholder="Enter Map Location" type="text" />
                            </FormGroup>
                            </Col></Row>
                            <FormGroup>
                                <Label for="keywords">Keywords</Label>
                                <Input
                                    id="keywords"
                                    name="keywords"
                                    placeholder="Enter Keywords and press enter"
                                    type="text"
                                    value={keywordInput}
                                    onChange={handleKeywordChange}
                                    onKeyDown={handleAddKeyword}
                                />
                                <div className="mt-3">
                                    <ul className="flex flex-wrap gap-2">
                                        {keywords.map((keyword, index) => (
                                            <li key={index} className="flex items-center bg-blue-100 text-sm px-3 py-1 rounded-full transition-all hover:bg-blue-200">
                                                <span className="text-blue-700">{keyword}</span>
                                                <button type="button" className="ml-2 text-red-600 hover:text-red-800 transition-colors" onClick={() => handleRemoveKeyword(index)}>
                                                    &times;
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleFile">Upload banner image</Label>
                                <Input id="exampleFile" name="file" type="file" onChange={handleImageChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="imageUpload">Upload Slider Images</Label>
                                <Input id="imageUpload" name="imageUpload" type="file" multiple onChange={handleImageChanges} />
                                {images.length > 0 && (
                                    <div className="mt-2">
                                        <p>Uploaded Slider Images:</p>
                                        <ul>
                                            {Array.from(images).map((file, index) => (
                                                <li key={index}>{file.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label for="textEditor">Content</Label>
                                <Editor
                                    id="textEditor"
                                    onInit={(evt, editor) => (editorRef.current = editor)}
                                    initialValue="<p>Write your content here</p>"
                                    init={{
                                        height: 300,
                                        menubar: true,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount',
                                        ],
                                        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className="mt-3">
                                <Label for="textEditor2">Content 2</Label>
                                <Editor
                                    id="textEditor2"
                                    onInit={(evt, editor) => (editorRef2.current = editor)}
                                    initialValue="<p>Write your content here</p>"
                                    init={{
                                        height: 300,
                                        menubar: true,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount',
                                        ],
                                        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                    }}
                                />
                            </FormGroup>
                        
                            <Button color="primary" type="submit" className="w-full max-w-full mt-3 block" style={{ width: '100%' }}>
                                Submit
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default AddServiceArea;