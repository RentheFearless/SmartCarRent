import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({id,title,price,img}){
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={`/img/${img}`} style={{height:'200px',objectFit:'cover'}} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6">{title}</Card.Title>
        <Card.Text className="mt-auto fw-bold text-primary">{price}</Card.Text>
        <Button as={Link} to={`/card/${id}`} variant="olimp" size="sm">Детально</Button>
      </Card.Body>
    </Card>
  );
}