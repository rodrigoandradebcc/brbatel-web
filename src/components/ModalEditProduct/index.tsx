import React, { useCallback, useRef } from 'react';

import { FiCheckSquare, FiTrash2 } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form, Label, GroupButtons, TwoInputs } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface IProduct {
  id: string;
  name: string;
  current_quantity: number;
  minimum_quantity: number;
  cost: number;
  resale_price: number;
}

interface IProductEdit {
  id?: string;
  name: string;
  current_quantity: number;
  minimum_quantity: number;
  cost: number;
  resale_price: number;
}

interface IEditProductDataToDash {
  id: string;
  name: string;
  current_quantity: number;
  minimum_quantity: number;
  cost: number;
  resale_price: number;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateProduct: (Product: IProduct) => void;
  editingProduct: IProductEdit;
  deleteProduct(id: string): void;
}

const ModalEditProduct: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingProduct,
  handleUpdateProduct,
  deleteProduct,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditProductDataToDash) => {
      console.log('data:', data);
      handleUpdateProduct(data);
      setIsOpen();
    },
    [handleUpdateProduct, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingProduct}>
        <h1>Editar Produto</h1>

        {console.log('MODAL PRODUTO', editingProduct)}

        <div>
          <Label>NOME DO PRODUTO</Label>
          <Input name="name" placeholder="Ex: Monitor 29''" />
        </div>

        <TwoInputs className="two-inputs">
          <div>
            <Label>QUANTIDADE ATUAL</Label>
            <Input name="current_quantity" placeholder="Ex: 100" />
          </div>
          <div>
            <Label>QUANTIDADE MÍNIMA</Label>
            <Input name="minimum_quantity" placeholder="Ex: 10" />
          </div>
        </TwoInputs>

        <TwoInputs className="two-inputs">
          <div>
            <Label>CUSTO</Label>
            <Input
              name="cost"
              type="number"
              step="0.01"
              placeholder="Ex: 19.90"
            />
          </div>
          <div>
            <Label>PREÇO DE REVENDA</Label>
            <Input
              name="resale_price"
              type="number"
              step="0.01"
              placeholder="Ex: 25.90"
            />
          </div>
        </TwoInputs>

        <GroupButtons>
          <button
            type="button"
            className="trash"
            onClick={() => {
              if (editingProduct.id) {
                deleteProduct(editingProduct.id);
                setIsOpen();
              }
            }}
          >
            <FiTrash2 size={20} />
            {/* <div className="icon">
              <FiCheckSquare size={24} />
            </div> */}
          </button>

          <button type="submit">
            <p className="text">Editar Produto</p>
            {/* <div className="icon">
              <FiCheckSquare size={24} />
            </div> */}
          </button>
        </GroupButtons>
      </Form>
    </Modal>
  );
};

export default ModalEditProduct;
