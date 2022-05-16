import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import LoginOuthGoogle from "./LoginOuthGoogle"
import { useForm } from "react-hook-form"
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    FormGroup,
    Row,
    Col,
    Input,
    Form,
    Button,
    Label,
    CustomInput
  } from 'reactstrap'
  
  import GlobalVariable from "../../../../path/global"
      const baseApiUrl = GlobalVariable.BASE_API_URL
  

const Login = () => {
    const { register, handleSubmit, errors} = useForm()

    const inputFeildStyle = {
        width: "100%",
        padding: "12px 20px",
        margin: "8px 0",
        display: "inline-block",
        border: "1px solid #ccc",
        boxSizing: "border-box"
      }

    const [Email, setemail] = useState()
    const [pwd, setpassword] = useState()
    const [message, setMessage] = useState("")
    const history = useHistory()

const submitHandler = (e) => {
    const object = {email:Email, password:pwd}
    const authAxios = axios.create({
        baseURL: baseApiUrl
    })


    //axios.defaults.headers.common['Authentication'] = `Bearer ${useJwt.getToken()}`
    authAxios.post('users/login', object).then(response => {
        const status = response.status
        setMessage("successfull")
        history.push("/apps/ecommerce/checkout")
    }).catch((err) => {
        console.log(err)
    })
       
}

    useEffect(() => {
        setMessage("")
    }, [Email]) 

    const mystyle = {  
        color: "red",
        fontSize: "15px"
       }
    
    return (

        <Card>
            <CardHeader>
                <CardTitle tag='h3'>Login</CardTitle>
            </CardHeader>

        {message === "successfull" ? (
            <b style={{ color: "green"}}> &nbsp;&nbsp; User Loggedin Successfully</b>
        ) : (
            <div></div>
        
        )}   

        <CardBody>
            <Form onSubmit={handleSubmit(submitHandler)}>
                <Row>
                    <Col sm='12'>
                        <FormGroup>
                            <Label>Email<span style={mystyle}>*</span></Label>
                            <input style = {inputFeildStyle} name = "email" type='text' id='emailVertical' placeholder='email@example.com' onChange = {e => setemail(e.target.value)} ref = {register({required:"Email is required", pattern: { value: /^\S+@\S+$/i, message: "This is not a valid email"}})}/> 
                            <span style={{ color: "red"}}>{errors.email?.message}</span>                           
                        </FormGroup>
                    </Col>
                    <Col sm='12'>
                        <FormGroup>
                            <Label>Password<span style={mystyle}>*</span></Label>
                            <input type='password'  style = {inputFeildStyle} name = "password" id='passwordVertical'  placeholder='Enter password' onChange = {e => setpassword(e.target.value)} ref = {register({required:"password is required"})}/>
                            <span style={{ color: "red"}}>{errors.password?.message}</span> 
                        </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup className='flex'>
                    <Button.Ripple className='mr-1' color='primary' type='submit'>
                    Login
                  </Button.Ripple>

                  <Button.Ripple tag={Link} to='/apps/ecommerce/Register' className='mr-1' color='success' type='submit'>
                    Register 
                  </Button.Ripple><br/><br/>
                  <span>Sign in with google</span>
                  <LoginOuthGoogle/>
                    </FormGroup>
                    </Col>
                </Row>
            </Form>
        </CardBody>

        </Card>
    )
       
}
export default Login