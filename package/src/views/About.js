import React, { useState, useEffect, useRef } from 'react';
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

const About = () => {
    const { id } = useParams(); // Get the ID from URL params
    const navigate = useNavigate();
    const [serviceAreaData, setServiceAreaData] = useState({});
  const editorRef = useRef(null);
    const [image, setImage] = useState([]);

    const [keywords, setKeywords] = useState([]);
    const [keywordInput, setKeywordInput] = useState("");
console.log("hi",serviceAreaData)
    // Fetch the service area data for the update
    useEffect(() => {
        const fetchServiceArea = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}About/`);
                const data = await response.json();
                setServiceAreaData(data[0]);
                setKeywords(data[0].meta_keywords ? data[0].meta_keywords.split(', ') : []);
            } catch (error) {
                console.error('Error fetching service area:', error);
            }
        };

        fetchServiceArea();
    }, [id]);


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
        formData.append('meta_name', e.target.metaName.value);
        formData.append('meta_description', e.target.metaDescription.value);
        formData.append('title', e.target.title.value);
        formData.append('sutitle', e.target.sutitle.value);
        formData.append('meta_keywords', keywords.join(','));
        formData.append('content', editorRef.current.getContent());

        if (serviceAreaData?.image==='' || image?.length>0) {
            formData.append('image', image[0]); 
        }
       

     
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}About/`, {
                method: 'POST',  // Use PUT method to update
                body: formData,  // Attach formData
            });

            const responseData = await response.json();
            console.log('Response:', responseData);
            navigate(`/About`); // Redirect to the updated service area page
        } catch (error) {
            console.error('Error updating service area:', error);
        }
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-center font-weight-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg hover:scale-105 transform transition-all duration-300">
                        Add or Update About
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit} encType="multipart/form-data">
                          
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input id="title" name="title" placeholder="Enter Title" type="text" defaultValue={serviceAreaData?.title} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="sutitle">Sub Title</Label>
                                <Input id="sutitle" name="sutitle" placeholder="Enter Detail" type="text" defaultValue={serviceAreaData?.sutitle} />
                            </FormGroup>
                               <FormGroup>
                                                            <Label for="textEditor">Content</Label>
                                                        
                                                            <Editor
                                                                id="textEditor"
                                                                              apiKey="23hvnba4wo9apkjvd90fhqlsvh3t6uhisgf5s08c8b2ssptw" // Optional: Get an API key from TinyMCE

                                                                onInit={(evt, editor) => (editorRef.current = editor)}
                                                                initialValue={serviceAreaData?.content}
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
                            <FormGroup>
                                <Label for="metaName">Meta Name</Label>
                                <Input id="metaName" name="metaName" placeholder="Enter Meta Name" type="text" defaultValue={serviceAreaData?.meta_name} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="metaDescription">Meta Description</Label>
                                <Input id="metaDescription" name="metaDescription" placeholder="Enter Meta Description" type="text" defaultValue={serviceAreaData?.meta_description} />
                            </FormGroup>
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
                                        {keywords?.map((keyword, index) => (
                                            <li key={index} className="flex items-center bg-blue-100 text-sm px-3 py-1 rounded-full transition-all hover:bg-blue-200">
                                                <span className="text-blue-700">{keyword}</span>
                                                <button type="button" className="ml-2 text-red-600 hover:text-red-800 transition-colors" onClick={() => handleRemoveKeyword(index)}>&times;</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleFile">Upload image</Label>
                                <Input id="exampleFile" name="file" type="file" onChange={handleImageChange} />
                            </FormGroup>
                        
                            {serviceAreaData &&serviceAreaData?.image?
                                    <img
                                    src={serviceAreaData.image}
                                    />
                                    :''
                                }
                        
                            <Button color="primary" type="submit" className="w-full max-w-full mt-3 block" style={{ width: '100%' }}>
                                Update
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default About;