import React, { useState } from "react";
import { NumericFormat } from 'react-number-format';
import ModalDetalhes from "./ModalDetalhes"

function DivisorContaRestaurante() {
    
    const [clients, setClients] = useState({});
    const [products, setProducts] = useState([]);
    const [clientName, setClientName] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productDivided, setProductDivided] = useState(false);
    const [clientPayTax, setClientPayTax] = useState({});
    const [showModal, setShowModal] = useState(false);
  
    const handleShowModal = () => {
      setShowModal(true);
    };
  
    const addClient = () => {
      if (clientName.trim() !== '') {
        setClients((prevClients) => ({
          ...prevClients,
          [clientName]: {
            totalAmount: 0,
            products: [],
          },
        }));
        setClientName('');
      } else {
        window.alert('O nome do cliente não pode estar vazio.');
      }
    };
  
    const addProduct = () => {
      const parsedPrice = parseFloat(productPrice);
      if (productName.trim() !== '' && !isNaN(parsedPrice) && parsedPrice > 0) {
        setProducts((prevProducts) => [
          ...prevProducts,
          { name: productName, price: parsedPrice },
        ]);
        setProductName('');
        setProductPrice('');
      } else {
        window.alert(
          'O nome do produto não pode estar vazio e o preço deve ser maior que zero.'
        );
      }
    };
  
    const associateProductToClient = () => {
        const product = products.find((p) => p.name === productName);
        if (product && clientName.trim() !== '' && productQuantity >= 0) {
          const client = clients[clientName];
          if (client) {
            const updatedProducts = [...client.products];
      
            if (productDivided) {
              const dividingClients = Object.keys(clientPayTax).filter(
                (clientName) => clientPayTax[clientName]
              );
      
              const dividedPrice =
                dividingClients.length > 0
                  ? product.price / dividingClients.length
                  : product.price * productQuantity;
      
              for (let i = 0; i < productQuantity; i++) {
                const dividedProduct = { ...product, price: dividedPrice, divided: true };
                updatedProducts.push(dividedProduct);
              }
            } else {
              for (let i = 0; i < productQuantity; i++) {
                updatedProducts.push(product);
              }
            }
      
            setClients((prevClients) => ({
              ...prevClients,
              [clientName]: {
                ...prevClients[clientName],
                products: updatedProducts,
                totalAmount:
                  prevClients[clientName].totalAmount +
                  product.price * productQuantity,
              },
            }));
      
            setClientPayTax((prevClientPayTax) => ({
              ...prevClientPayTax,
              [clientName]: productDivided ? clientPayTax[clientName] : false,
            }));
          } else {
            window.alert('Cliente inválido.');
          }
        } else {
          window.alert('O nome do produto e do cliente não podem estar vazios.');
        }
      
        setProductName('');
        setClientName('');
        setProductQuantity('');
        setProductPrice('');
        setProductDivided(false);
      };
      
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
      
      const calculateBill = () => {
        const updatedClients = {};
      
        Object.keys(clients).forEach((clientName) => {
          const client = clients[clientName];
          let totalToPay = 0;
      
          client.products.forEach((product) => {
            const { name, price, divided } = product;
      
            if (divided) {
                
              const numClientsDividing = getProductDividers(name).length;
              console.log(getProductDividers(name).length);
              const productPricePerClient = price / numClientsDividing;
              totalToPay += productPricePerClient;
            } else {
              const productPricePerClient = price;
              totalToPay += productPricePerClient;
            }
          });
      
          if (clientPayTax[clientName]) {
            const tax = totalToPay * 0.1;
            totalToPay += tax;
          }
      
          updatedClients[clientName] = {
            ...client,
            totalToPay: totalToPay.toFixed(2),
          };
        });
      
        setClients(updatedClients);
      };
      
  
    const handleSubmit = (e) => {
      e.preventDefault();
      calculateBill();
    };
  
    return (
        <div className="d-flex justify-content-center mt-4">
            <div className="card shadow mx-5" style={{ width: '30rem', height: "32rem"}}>
                <div className="card-body mt-1 mx-2">
                    <h5 className="card-title text-center">Calculadora Restaurante 
                        <i className="bi bi-file-earmark-plus mx-2"
                            style={{cursor: "pointer"}} 
                            title="Nova Conta"
                            onClick={(e) => {
                            setClients({});
                            setProducts([]);  
                            }}>
                        </i>
                    </h5>     
                    <form className="d-flex flex-column" onSubmit={handleSubmit}>
                        <div className="form-group text-start py-1">
                            <label htmlFor="clientName">Nome do Cliente:</label>
                            <div className="row align-items-center">
                                <div className="col">
                                <input
                                    className="form-control"
                                    type="text"
                                    id="clientName"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                />
                                </div>
                                <div className="col-auto">
                                <button className="btn btn-primary" onClick={addClient}>
                                  <i class="bi bi-plus"></i> CLIENTE
                                </button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productName">Nome do Produto:</label>
                            <input
                                className="form-control vh-50"                            
                                type="text"
                                id="productName"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                            <label htmlFor="productPrice">Preço do Produto:</label>
                            <NumericFormat
                              className="form-control"
                              id="productPrice"
                              thousandSeparator={'.'}
                              decimalSeparator={','}
                              decimalScale={2}
                              fixedDecimalScale={true}
                              prefix={'R$ '}
                              onKeyDown={(e) => {
                                  if (e.key === '-') {
                                      e.preventDefault();
                                  }}}
                              min="0"
                              placeholder="R$ 0,00"            
                              onValueChange={(values) => {
                                  const { floatValue } = values;
                                  setProductPrice(floatValue);
                              }}
                          />
                            <button className="btn btn-primary mt-3 w-100"type="button" onClick={addProduct}>
                              <i class="bi bi-plus"></i> Produto
                            </button>
                        </div>
                        <div className="form-group text-start py-2">
                          <div className="row">
                            <div className="col text-center">
                              <label className="form-label text-uppercase">Associe o cliente ao produto consumido.</label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <select id="associateProduct" className="form-select" 
                                    value={productName} 
                                    onChange={(e) => {
                                        const selectedProductName = e.target.value;
                                        const selectedProduct = products.find((product) => product.name === selectedProductName);
                                        if (selectedProduct) {
                                          setProductName(selectedProductName);
                                          setProductPrice(selectedProduct.price.toString());
                                        }
                                      }}>
                                <option value="">Produto</option>
                                {products.map((product) => (
                                  <option key={product.name} value={product.name}>
                                    {product.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col">
                              <select id="associateClient" className="form-select" value={clientName} onChange={(e) => setClientName(e.target.value)}>
                                <option value="">Cliente</option>
                                {Object.keys(clients).map((clientName) => (
                                  <option key={clientName} value={clientName}>
                                    {clientName}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col">
                            <select
                                id="productDivided"
                                className="form-select"
                                value={productDivided}
                                onChange={(e) => setProductDivided(e.target.value === "true")}
                                >
                                <option disabled value="">
                                    Dividir?
                                </option>
                                <option value={false}>Não</option>
                                <option value={true}>Sim</option>
                                </select>
                            </div>
                            <div className="col">
                                <input
                                className="form-control"
                                type="number"
                                placeholder="Quant."
                                id="productQuantity"
                                value={productQuantity}
                                min={0}
                                onChange={(e) => setProductQuantity(e.target.value)}
                                />
                            </div>
                          </div>
                        <div className="row mt-3">
                          <div className="col">
                            <button type="button" className="btn btn-primary w-100" onClick={associateProductToClient}>
                              <i class="bi bi-link-45deg"></i> Associar Produto ao Cliente
                            </button>
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-success mt-3" type="submit"><i class="bi bi-calculator-fill"></i> Calcular</button>
                    </form>
                </div> 
            </div>
            <div className="card shadow mx-5" style={{ width: '25rem'}}>
                <div className="card-body d-flex flex-column mt-2 mx-2">
                    <h2 className="card-title text-center">Resultado da Conta</h2>
                    <div className="d-flex justify-content-center my-4 overflow-auto">
                    <ul className="list-group list-group-flush w-100">
                        {Object.keys(clients).map((clientName) => (
                        <li className="list-group-item d-flex justify-content-center" key={clientName}>
                            <div className="flex-grow-1">{`${clientName} : R$ ${clients[clientName].totalToPay}`}</div>
                            <div className="form-check pl-5">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`payTax-${clientName}`}
                                checked={clientPayTax[clientName]}
                                onChange={(e) =>
                                setClientPayTax((prevClientPayTax) => ({
                                    ...prevClientPayTax,
                                    [clientName]: e.target.checked,
                                }))
                                }
                            />
                            <label className="form-check-label" htmlFor={`payTax-${clientName}`}>
                                Taxa
                            </label>
                            </div>
                        </li>
                        ))}
                    </ul>
                    </div>
                    <button className="btn btn-primary mt-auto w-100" type="button" onClick={handleShowModal}>
                      <i class="bi bi-pencil-square"></i> DETALHES
                    </button>
                </div>
            </div>
            {showModal && (
                <ModalDetalhes
                    clients={clients}
                    produtos={products}
                    handleClose={() => setShowModal(false)}
                    showModal={showModal}
                />
            )}
        </div>
    );
}

export default DivisorContaRestaurante;
