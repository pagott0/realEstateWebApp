import React from 'react';
import { Button, Card } from 'react-bootstrap';
import '../index.css'; // Importe estilos personalizados, se necessário

function BoughtPage() {
  return (
    <div className="bought-page-container">
      <div className="bought-card-wrapper">
        <Card className="bought-card">
          <Card.Body>
            <h1 className="mb-4">Obrigado por comprar conosco!</h1>
            <p>Seu pedido foi confirmado e está em processamento. Para dúvidas, entre em contato conosco.</p>
            <Button href="/" variant="primary">Voltar para a página inicial</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default BoughtPage;
