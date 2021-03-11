import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './Input.scss';

type InputProps = {
  value: string,
  valueUpdated: (input: string) => void
  isValid: boolean,
}

const Input = (props: InputProps) => {

  const [inputValue, setInputValue] = useState(props.value);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.valueUpdated(inputValue)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="justify-content-center" controlId="symbol">
          <Form.Label column sm={1}>Search</Form.Label>
          <Col sm={4}>
            <Form.Control type="text" placeholder="IBM" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
          </Col>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default Input;