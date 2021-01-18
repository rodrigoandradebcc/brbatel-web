import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { FiCheckSquare } from 'react-icons/fi';
import Modal from '../Modal';
import { Form, Label } from './styles';
import Input from '../Input';

interface IProduct {
  name: string;
  current_quantity: number;
  minimum_quantity: number;
  cost: number;
  resale_price: number;
}

interface ICreateProductData {
  name: string;
  current_quantity: number;
  minimum_quantity: number;
  cost: number;
  resale_price: number;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddProduct: (Product: Omit<IProduct, 'id'>) => void;
}

const ModalAddProduct: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddProduct,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateProductData) => {
      handleAddProduct(data);

      setIsOpen();
    },
    [handleAddProduct, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Produto</h1>

        <div>
          <Label>NOME DO PRODUTO</Label>
          <Input name="name" placeholder="Ex: Monitor 29''" />
        </div>

        <div className="two-inputs">
          <div>
            <Label>QUANTIDADE ATUAL</Label>
            <Input name="current_quantity" placeholder="Ex: 100" />
          </div>
          <div>
            <Label>QUANTIDADE MÍNIMA</Label>
            <Input name="minimum_quantity" placeholder="Ex: 10" />
          </div>
        </div>

        <div className="two-inputs">
          <div>
            <Label>CUSTO</Label>
            <Input name="cost" placeholder="Ex: 19.90" />
          </div>
          <div>
            <Label>PREÇO DE REVENDA</Label>
            <Input name="resale_price" placeholder="Ex: 25.90" />
          </div>
        </div>

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

interface IProduct {
  name: string;
  current_quantity: number;
  minimum_quantity: number;
  cost: number;
  resale_price: number;
}

export default ModalAddProduct;
