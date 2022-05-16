import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import LoginOuthGoogle from "./LoginOuthGoogle"
import { Lock, Mail } from 'react-feather'
import { useDispatch} from 'react-redux'
import {handleLogin} from '../../../../redux/actions/auth/index'
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
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    CustomInput
  } from 'reactstrap'
  
  import GlobalVariable from "../../../../path/global"
      const baseApiUrl = GlobalVariable.BASE_API_URL
  

const Login = () => {

    const [Email, setemail] = useState()
    const [pwd, setpassword] = useState()
    const [message, setMessage] = useState("")
    const history = useHistory()
    const [userData, setUserData] = useState()
    const dispatch = useDispatch()
    
const submitHandler = (e) => {
    e.preventDefault()
    const object = {email:Email, password:pwd}
    const authAxios = axios.create({
        baseURL: baseApiUrl
    })


    //axios.defaults.headers.common['Authentication'] = `Bearer ${useJwt.getToken()}`
    authAxios.post('users/login', object).then(response => {
        console.log(response.data)
        setUserData(response.data)
        setMessage("successfull")
        history.push("/apps/ecommerce/checkout")
    }).catch((err) => {
        console.log(err)
    })
       
}

useEffect(() => {
    dispatch(handleLogin(userData)) 
    }, [submitHandler])

    useEffect(() => {
        setMessage("")
    }, [Email]) 

    
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
            <Form onSubmit={submitHandler}>
                <Row>
                    <Col sm='12'>
                        <FormGroup>
                            <Label>Email</Label>
                            <InputGroup className='input-group-merge' tag={FormGroup}>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <Mail size={15} />
                  </InputGroupText>
                </InputGroupAddon>
                            <Input type='text' id='emailVertical' required placeholder='email@example.com' onChange = {e => setemail(e.target.value)}/>  
                            </InputGroup>                          
                        </FormGroup>
                    </Col>
                    <Col sm='12'>
                        <FormGroup>
                            <Label>password</Label>
                            <InputGroup className='input-group-merge' tag={FormGroup}>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <Lock size={15} />
                  </InputGroupText>
                </InputGroupAddon>
                            <Input type='password' id='passwordVertical' required placeholder='Enter password' onChange = {e => setpassword(e.target.value)}/>
                            </InputGroup> 
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
                  <span></span>
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