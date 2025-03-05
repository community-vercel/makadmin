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

const AddSetting= () => {
    const { id } = useParams(); // Get the ID from URL params
    const navigate = useNavigate();
    const [serviceAreaData, setServiceAreaData] = useState({});

    const [image, setImage] = useState([]);

    const [keywords, setKeywords] = useState([]);
    const [keywordInput, setKeywordInput] = useState("");
        const editorRef = useRef(null);
        const editorRef2 = useRef(null);
        const editorRef3 = useRef(null);
console.log("hi",serviceAreaData)
    // Fetch the service area data for the update
    useEffect(() => {
        const fetchServiceArea = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}setting/`);
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
        setImage(files[0]);
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
        formData.append('phone', e.target.phone.value);
        formData.append('email', e.target.email.value);
        formData.append('addresstitle', e.target.atitle.value);
        formData.append('city', e.target.city.value);
        formData.append('house', e.target.house.value);
        formData.append('street', e.target.street.value);
        formData.append('address', e.target.address.value);
        formData.append('instagram', e.target.instagram.value);
        formData.append('facedbook', e.target.facebook.value); 
         formData.append('linkedin', e.target.linkedin.value); 
          formData.append('xurl', e.target.xurl.value);
        formData.append('copyrights', e.target.copyright.value);
        formData.append('sutitle', e.target.sutitle.value);
        formData.append('meta_keywords', keywords.join(','));
        formData.append('content', editorRef.current.getContent());
        formData.append('content2', editorRef2.current.getContent());
        formData.append('content3', editorRef3.current.getContent());

     
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}setting/`, {
                method: 'POST',  // Use PUT method to update
                body: formData,  // Attach formData
            });

            const responseData = await response.json();
            console.log('Response:', responseData);
            navigate(`/`); // Redirect to the updated service area page
        } catch (error) {
            console.error('Error updating service area:', error);
        }
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-center font-weight-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg hover:scale-105 transform transition-all duration-300">
                        Add or Update Settings
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit} encType="multipart/form-data">
                          

<Row>
  <Col md={6}>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input id="title" name="title" placeholder="Enter Title" type="text" defaultValue={serviceAreaData?.title} />
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="sutitle">Sub Title</Label>
      <Input id="sutitle" name="sutitle" placeholder="Enter Detail" type="text" defaultValue={serviceAreaData?.sutitle} />
    </FormGroup>
  </Col>
</Row>
<Row>
  <Col md={6}>
    <FormGroup>
      <Label for="title">Address Title</Label>
      <Input id="atitle" name="atitle" placeholder="Enter Title" type="text" defaultValue={serviceAreaData?.addresstitle} />
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="sutitle">City</Label>
      <Input id="city" name="city" placeholder="Enter City" type="text" defaultValue={serviceAreaData?.city} />
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="sutitle">House</Label>
      <Input id="house" name="house" placeholder="Enter House" type="text" defaultValue={serviceAreaData?.house} />
    </FormGroup>
  </Col>
</Row><Row>
  <Col md={6}>
    <FormGroup>
      <Label for="title">Street</Label>
      <Input id="street" name="street" placeholder="Enter Street" type="text" defaultValue={serviceAreaData?.street} />
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="sutitle">Address</Label>
      <Input id="address" name="address" placeholder="Enter Address" type="text" defaultValue={serviceAreaData?.address} />
    </FormGroup>
  </Col>
</Row><Row>
  <Col md={6}>
    <FormGroup>
      <Label for="title">X URL</Label>
      <Input id="xurl" name="xurl" placeholder="Enter X URL" type="text" defaultValue={serviceAreaData?.xurl} />
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="sutitle">Facebook</Label>
      <Input id="facebook" name="facebook" placeholder="Enter Facebook URL" type="text" defaultValue={serviceAreaData?.facedbook} />
    </FormGroup>
  </Col>
</Row>
<Row>
  <Col md={6}>
    <FormGroup>
      <Label for="phone">Instagram</Label>
      <Input id="instagram" name="instagram" placeholder="Enter Instagram URL" type="text" defaultValue={serviceAreaData?.instagram} />
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="email">Linekdin</Label>
      <Input id="linkedin" name="linkedin" placeholder="Enter Linkedin URL" type="text" defaultValue={serviceAreaData?.linkedin} />
    </FormGroup>
  </Col>
</Row>
<Row>
  
  <Col md={6}>

    <FormGroup>

      <Label for="email">Email</Label>
      <Input id="email" name="email" placeholder="Enter Email" type="email" defaultValue={serviceAreaData?.email} />
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="phone">Phone</Label>
      <Input id="phone" name="phone" placeholder="Enter Phone " type="text" defaultValue={serviceAreaData?.phone} />
    </FormGroup>
  </Col>
</Row>

<Row>
  <Col md={6}>
    <FormGroup>
      <Label for="metaName">Home Page Meta Name</Label>
      <Input id="metaName" name="metaName" placeholder="Enter Meta Name" type="text" defaultValue={serviceAreaData?.meta_name} />
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="metaDescription">Home Page Meta Description</Label>
      <Input id="metaDescription" name="metaDescription" placeholder="Enter Meta Description" type="text" defaultValue={serviceAreaData?.meta_description} />
    </FormGroup>
  </Col>
</Row>
                            <FormGroup>
                                <Label for="keywords"> Home Page Keywords</Label>
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
                                                <button type="button" className="ml-2 text-red-600 hover:text-red-800 transition-colors" onClick={() => handleRemoveKeyword(index)}>&times;</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FormGroup>
                              <FormGroup>
                                                        <Label for="textEditor">Director Message</Label>
                                                        <Editor
                                                            id="textEditor"
                                                            apiKey="23hvnba4wo9apkjvd90fhqlsvh3t6uhisgf5s08c8b2ssptw" // Optional: Get an API key from TinyMCE

                                                            onInit={(evt, editor) => (editorRef.current = editor)}
                                                            initialValue={serviceAreaData?.content?serviceAreaData?.content:'ax'}
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
                                                        <Label for="textEditor2">Sia Aprroved Content</Label>
                                                        <Editor
                                                            id="textEditor2"
                                                            apiKey="23hvnba4wo9apkjvd90fhqlsvh3t6uhisgf5s08c8b2ssptw" // Optional: Get an API key from TinyMCE

                                                            onInit={(evt, editor) => (editorRef2.current = editor)}
                                                            initialValue={serviceAreaData?.content2?serviceAreaData?.content2:'ax'}
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
                                                        <Label for="textEditor3">Footer Content</Label>
                                                        <Editor 
                                                            id="textEditor3"
                                                            apiKey="23hvnba4wo9apkjvd90fhqlsvh3t6uhisgf5s08c8b2ssptw" // Optional: Get an API key from TinyMCE

                                                            onInit={(evt, editor) => (editorRef3.current = editor)}
                                                            initialValue={serviceAreaData?.content3?serviceAreaData?.content3:'ax'}
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
                                                        <Label for="name">Copyright & Other Info</Label>
                                                        <Input id="copyright" name="copyright" placeholder="Enter Name" type="text" defaultValue={serviceAreaData.copyrights} />
                                                    </FormGroup>
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

export default AddSetting;