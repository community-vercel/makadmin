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
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';

const AddWhyUs = () => {
    const [id,setId]  =useState(); // Get the ID from URL params
    const navigate = useNavigate();
    const [whyUsData, setWhyUsData] = useState({});
    const [image, setImage] = useState(null);
    const [benefits, setBenefits] = useState([{ title: '', description: '', icon: '' }]);
    const editorRef = useRef(null);
       const [serviceAreaData, setServiceAreaData] = useState({});
console.log("why us ",whyUsData)
    useEffect(() => {
        const fetchWhyUsData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}whyus/`);
                const data = await response.json();
                setWhyUsData(data[0]);
                setId(data[0].id)
                setBenefits(data[0].benefits || [{ title: '', description: '', icon: '' }]);
            } catch (error) {
                console.error('Error fetching why us data:', error);
            }
        };

  fetchWhyUsData(); // Fetch data if an ID exists (for editing)

    }, []);


    const handleBenefitChange = (e, index, field) => {
        const newBenefits = [...benefits];
        newBenefits[index][field] = e.target.value;
        setBenefits(newBenefits);
    };

    const handleAddBenefit = () => {
        setBenefits([...benefits, { title: '', description: '', icon: '' }]);
    };

    const handleRemoveBenefit = (index) => {
        const newBenefits = [...benefits];
        newBenefits.splice(index, 1);
        setBenefits(newBenefits);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
            title: e.target.title.value,
            content: editorRef.current.getContent(),
            benefits: benefits
        };
    
        try {
            const response = await fetch(id ? `${process.env.REACT_APP_API_URL}whyus/${id}/` : `${process.env.REACT_APP_API_URL}whyus/`, {
                method: id ? 'PUT' : 'POST',  // PUT for updating, POST for creating
                headers: {
                    'Content-Type': 'application/json'  // Specify JSON content type
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            navigate('/whyus'); // Redirect to the "Why Us" page
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-center font-weight-bold">
                        {id ? "Update Why Us" : "Add Why Us"}
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit} encType="multipart/form-data">
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input id="title" name="title" placeholder="Enter Title" type="text" defaultValue={whyUsData?.title} />
                            </FormGroup>
                       <FormGroup>
                                                      <Label for="textEditor">Content</Label>
                                                      <Editor
                                                          id="textEditor"
                                                          onInit={(evt, editor) => (editorRef.current = editor)}
                                                          initialValue={whyUsData.content?whyUsData.content:'aa'}
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
                                <Label>Benefits</Label>
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="mb-3">
                                        <Row>
                                            <Col md={4}>
                                                <Input
                                                    type="text"
                                                    placeholder="Benefit Title"
                                                    value={benefit?.title}
                                                    onChange={(e) => handleBenefitChange(e, index, 'title')}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <Input
                                                    type="text"
                                                    placeholder="Benefit Description"
                                                    value={benefit?.description}
                                                    onChange={(e) => handleBenefitChange(e, index, 'description')}
                                                />
                                            </Col>
                                            <Col md={2}>
                                                <Input
                                                    type="text"
                                                    placeholder="Icon Class (e.g., bi-check-circle)"
                                                    value={benefit?.icon}
                                                    onChange={(e) => handleBenefitChange(e, index, 'icon')}
                                                />
                                            </Col>
                                            <Col md={2} className="d-flex align-items-center justify-content-center">
                                                <Button color="danger" onClick={() => handleRemoveBenefit(index)}>-</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                                <Button color="primary" onClick={handleAddBenefit}>Add Benefit</Button>
                            </FormGroup>

                           

                            <Button color="primary" type="submit" className="w-full max-w-full mt-3 block" style={{ width: '100%' }}>
                                {id ? "Update" : "Add"}
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default AddWhyUs;