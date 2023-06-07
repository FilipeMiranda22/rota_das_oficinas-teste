import React from "react";
import Modal from 'react-bootstrap/Modal';
import { CloseButton } from "react-bootstrap";
import styles from "./styles/ModalDetalhes.module.css";

const ModalDetalhes = ({ clients, handleClose, showModal }) => {

  const getProductDividers = (productName) => {
    return Object.keys(clients).filter((clientName) => {
      const client = clients[clientName];
      return (
        client.products.some(
          (product) =>
            product.name === productName &&
            product.divided
        )
      );
    });
  };


  const getProductDetail = (product, clientName) => {
    const productName = product.name;
    const client = clients[clientName];
    let dividingClients = 0;

    let detail = `${productName}`;

    const productDivided = client.products.find((product) => product.name === productName);

    if (productDivided && productDivided.divided) {
      dividingClients = getProductDividers(productName, clientName);
    }
  
    if (dividingClients.length > 0) {
      const dividedWith = dividingClients.filter(name => name !== clientName);
      console.log(dividedWith);
      if (dividedWith.length > 0) {
        const dividedWithName = dividedWith.map(name => name).join(", ");
        detail += ` (Dividiu com: ${dividedWithName})`;
      }
    }
    return detail;
  };
  
  
  return (
    <>
      <Modal className={styles["father-modal"]} show={showModal} onHide={handleClose} centered={true}>
        <>
          <Modal.Header className={styles["header-modal"]} >
            <CloseButton variant="white" onClick={handleClose} />
            <Modal.Title>DETALHES DA CONTA</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles["body-modal"]}>
            {Object.keys(clients).map((clientName) => (
              <div key={clientName}>
                <p>
                  <strong>{clientName} consumiu:</strong> {clients[clientName].products.map((product) => getProductDetail(product, clientName)).join(", ")}
                </p>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer className={styles["footer-modal"]}>
          </Modal.Footer>
        </>
      </Modal>
    </>
  );
};

export default ModalDetalhes;
