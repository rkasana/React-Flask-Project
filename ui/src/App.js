import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            isLoading:false,
            formData:{
                sepalLength: 4,
                sepalWidth: 2,
                petalLength: 1,
                petalWidth: 0
        },
    result:""
    };
   }

   handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
        formData
    });
   }

   handlePredictClick=(event)=>{
        const formData = this.state.formData;
        this.setState({isLoading: true});
        fetch('http://127.0.0.1:5000/prediction/',
         {
          method:'POST',
          headers:{
             'Accept':'application/json',
             'Content-Type':'application/json'
             },

          body: JSON.stringify(formData)
        })
          .then(response=>response.json())
          .then(response=>{
               this.setState({
                    result:response.result,
                    isLoading:false
               });
          });
   }

   handleCancelClick = (event) => {
        this.setState({result:""});
   }

   render(){

        const isLoading = this.state.isLoading;
        const formData = this.state.formData;
        const result = this.state.result;

        var sepalLengths = []
        for (var i = 4; i<=7; i=+(i+0.1).toFixed(1)){
            sepalLengths.push(<option key = {i} value={i}>{i}</option>);
        }

        var sepalWidths = []
        for (var j = 4; j<=7; j=+(j+0.1).toFixed(1)){
            sepalWidths.push(<option key = {j} value={j}>
                                {j}
                                </option>);
        }

        var petalLengths = []
        for (var k = 1; k <= 6; k = +(k + 0.1).toFixed(1)){
            petalLengths.push(<option key = {k} value = {k}>{k}</option>);
        }
        var petalWidths = []
        for (var l= 0.1; l <= 3; l = +(l + 0.1).toFixed(1)) {
            petalWidths.push(<option key = {l} value = {l}>{l}</option>);
        }

        return(
            <Container>
                <div>
                    <h1 className="title"> Iris Plant Classifier </h1>
                </div>
                <div className="content">
                    <Form>
                        <Form.Row>
                            <Form.Group as ={Col}>
                                <Form.Label>Sepal Length </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formData.sepalLength}
                                    name="sepalLength"
                                    onChange={this.handleChange}>
                                    {sepalLengths}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as ={Col}>
                                <Form.Label> Sepal Width</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formData.sepalWidth}
                                    name="sepalWidth"
                                    onChange={this.handleChange}>
                                    {sepalWidths}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Petal Length</Form.Label>
                                <Form.Control
                                    as ="select"
                                    value={formData.petalLength}
                                    name="petalLength"
                                    onChange={this.handleChange}>
                                    {petalLengths}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Petal Width</Form.Label>
                                <Form.Control
                                    as ="select"
                                    value={formData.petalWidth}
                                    name="petalWidth"
                                    onChange={this.handleChange}>
                                    {petalWidths}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Row>
                            <Col>
                            <Button
                                block variant= "success"
                                disabled={isLoading}
                                onClick={!isLoading? this.handlePredictClick:null}>
                                {isLoading?'Making Prediction': 'Predict'}

                            </Button>
                            </Col>
                            <Col>
                            <Button 
                                block variant = "danger"
                                disabled = {isLoading}
                                onClick = {this.handleCancelClick}>
                                    Reset Prediction
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    {result===""?null:
                        (<Row>
                            <Col className='result-container'>
                                <h5 id='result'>{result}</h5>
                            </Col>
                        </Row>   )
                    
                    }
                </div>

            </Container>
        );
   }



}

export default App;
