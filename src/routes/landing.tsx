import React, {useEffect, useState} from 'react'
import { User } from './type'
import { getUsers } from '../api'
import {Container, Row, Col, Table, Form} from "react-bootstrap"

const Landing = () => {
  const [users, setUsers] = useState<User[]>()
  const fetchUsers = async () => {
    const res = await getUsers()
    setUsers(res)
  }
  const [newUser, setNewUser] = useState<User>({      
    id: 0,
    name: '',
    username: '',
    email: '',
    address: {
      street:'',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },      },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhase: '',
      bs: '',
    }});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    console.log(name, value)
    setNewUser((prevUser: any) => ({...prevUser, [name]: value,}))
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    setUsers((prevUsers: any) => [...prevUsers, newUser])
    setNewUser({
      id: 0,
      name: '',
      username: '',
      email: '',
      address: {
        street:'',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        },      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhase: '',
        bs: '',
      }
    })
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Container>
      <Row>
        <Col>
          <h1>Users</h1>
        </Col>
      </Row>
      <Row>
        <Col>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
                <td>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Col>
      </Row>
      <Row>
      <Col>
        <h2>Add User</h2>
      </Col>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='name'>
          <Form.Label>
            Name
          </Form.Label>
          <Form.Control 
            type='text'
            name='name'
            value={newUser?.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>
            Email
          </Form.Label>
          <Form.Control 
            type='text'
            name='email'
            value={newUser?.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>
            City
          </Form.Label>
          <Form.Control 
            type='text'
            name='address.city'
            value={newUser?.address.city}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='company'>
          <Form.Label>
            Company
          </Form.Label>
          <Form.Control 
            type='text'
            name='company.name'
            value={newUser?.company.name}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </Row>
    </Container>
  )
}

export default Landing 