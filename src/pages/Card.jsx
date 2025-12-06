import { useParams } from 'react-router-dom';
import { Container, Button, Row, Col, Image } from 'react-bootstrap';
import { products } from '../data/products';

export default function Card(){
  const {id} = useParams();
  const p = products.find(x=>x.id===Number(id));
  if(!p) return <Container>Не знайдено</Container>;

  return (
    <Container className="py-5">
      <Row>
        <Col md={6}><Image src={`/img/${p.img}`} fluid rounded /></Col>
        <Col md={6}>
          <h1>{p.title}</h1>
          <p className="fs-4 text-primary fw-bold">{p.price}</p>
          <p>Категорія: {p.category}</p>
          <Button variant="olimp" size="lg">Замовити</Button>
        </Col>
      </Row>
    </Container>
  );
}