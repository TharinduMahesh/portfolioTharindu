
import React from 'react';
import { Html, Head, Preview, Body, Container, Heading, Text, Hr } from '@react-email/components';

type ContactFormEmailProps = {
  email: string;
  message: string;
};

const ContactFormEmail = ({ email, message }: ContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Message from your Portfolio Contact Form</Preview>
      <Body style={{ backgroundColor: '#f6f6f6', fontFamily: 'sans-serif' }}>
        <Container style={{ margin: '0 auto', padding: '20px', backgroundColor: '#ffffff', border: '1px solid #dddddd' }}>
          <Heading style={{ fontSize: '24px', color: '#333333' }}>
            You received a new message!
          </Heading>
          <Text style={{ fontSize: '16px', color: '#555555' }}>
            Here are the details:
          </Text>
          <Hr style={{ borderColor: '#cccccc' }} />
          <Text style={{ fontSize: '16px', color: '#555555' }}>
            <strong>From:</strong> {email}
          </Text>
          <Text style={{ fontSize: '16px', color: '#555555' }}>
            <strong>Message:</strong>
          </Text>
          <Text style={{ fontSize: '16px', color: '#555555', whiteSpace: 'pre-wrap' }}>
            {message}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactFormEmail;