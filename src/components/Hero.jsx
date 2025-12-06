import { Container, Button } from 'react-bootstrap'

export default function Hero() {
  return (
    <section
      className="hero text-white text-center d-flex align-items-center justify-content-center"
      style={{
        background: 'url(/img/hero-car.jpg) center/cover',
        minHeight: '500px',
      }}
    >
      <Container>
        <div className="bg-dark bg-opacity-50 p-4 rounded">
          <h1>Оренда авто у Львові</h1>
          <p className="fs-5">Без водія. Без застави. З доставкою за 60 хв.</p>
          <Button variant="olimp" size="lg" href="/park">
            Переглянути автопарк
          </Button>
        </div>
      </Container>
    </section>
  )
}