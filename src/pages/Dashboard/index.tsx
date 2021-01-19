import React, { useEffect, useState } from 'react';
import { FiPlus, FiMinus, FiChevronRight, FiEdit } from 'react-icons/fi';
import formatsCurrencyValue from '../../utils/formatsCurrencyValue';
// import { isAfter, isBefore, isEqual } from 'date-fns';
import api from '../../services/api';
import ModalAddProduct from '../../components/ModalAddProduct';
import { useToast } from '../../hooks/toast';

import {
  Container,
  LogoText,
  Header,
  Footer,
  Content,
  Section,
  MainContent,
  Table,
  H2,
  Button,
  Separador,
  ContainerCard,
  Card,
} from './styles';
import ModalEditProduct from '../../components/ModalEditProduct';

interface IProduct {
  id?: string;
  name: string;
  current_quantity: number;
  minimum_quantity: number;
  cost: number;
  resale_price: number;
  created_at?: Date | undefined;
}

interface IProductResponse {
  id: string;
  name: string;
  current_quantity: number;
  minimum_quantity: number;
  cost: number;
  resale_price: number;
  created_at: Date;
}

interface IBalanceAPI {
  balance: { totalProducts: number; grossProfit: number };
}

interface IBalance {
  totalProducts: number;
  grossProfit: number;
}

const Dashboard: React.FC = () => {
  const { addToast } = useToast();
  const [products, setProducts] = useState<IProductResponse[]>([]);
  const [balance, setBalance] = useState<IBalance>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<IProduct>(
    {} as IProduct,
  );
  //

  useEffect(() => {
    const loadData = async () => {
      const { data } = await api.get<IProductResponse[]>('/products');
      const productsOrderByDate = (
        a: IProductResponse,
        b: IProductResponse,
      ) => {
        return new Date(a.created_at) < new Date(b.created_at) ? -1 : 1;
      };

      setProducts(data.sort(productsOrderByDate));

      const {
        data: { balance: balanceAPI },
      } = await api.get<IBalanceAPI>('/products/balance');

      setBalance(balanceAPI);
    };
    loadData();
  }, []);

  async function refreshBalance(): Promise<void> {
    const {
      data: { balance: balanceAPI },
    } = await api.get<IBalanceAPI>('/products/balance');

    setBalance(balanceAPI);
  }

  async function handleAddProduct(product: IProduct): Promise<void> {
    try {
      const response = await api.post('/products', {
        ...product,
      });

      setProducts([...products, response.data]);
      addToast({
        type: 'success',
        title: 'Cadastro realizado com sucesso',
        description: `${product.name} adicionado com sucesso`,
      });

      refreshBalance();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteProduct(id: string): Promise<void> {
    try {
      await api.delete(`/products/${id}`);
      const filteredProducts = products.filter(product => product.id !== id);

      setProducts(filteredProducts);
      refreshBalance();
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Produto deletado.',
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro',
        description: error.response.data.error,
      });
    }
  }

  async function handleUpdateProduct(product: IProduct): Promise<void> {
    await api
      .put<IProductResponse>(`products/${editingProduct.id}`, {
        ...product,
      })
      .then(response => {
        setProducts(
          products.map(oldProduct =>
            oldProduct.id === editingProduct.id
              ? { ...response.data }
              : oldProduct,
          ),
        );
        refreshBalance();
        addToast({
          type: 'success',
          title: 'Atualizado!',
          description: `${product.name} atualizado com sucesso`,
        });
      })
      .catch(error => {
        addToast({
          type: 'error',
          title: 'Erro',
          description: error.response.data.error,
        });
        // console.log(error.response.data);
      });
  }

  const handlePlusQuantity = async (product: IProduct) => {
    try {
      const { data: responseData } = await api.patch<IProductResponse>(
        `products/${product.id}`,
        {
          new_quantity: product.current_quantity + 1,
        },
      );

      const findIndexProduct = products.findIndex(
        prod => prod.id === responseData.id,
      );
      if (findIndexProduct >= 0) {
        const newProducts = products.fill(
          responseData,
          findIndexProduct,
          findIndexProduct + 1,
        );
        setProducts([...newProducts]);
      }
      refreshBalance();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReduceQuantity = async (product: IProduct) => {
    try {
      const { data: responseData } = await api.patch<IProductResponse>(
        `products/${product.id}`,
        {
          new_quantity: product.current_quantity - 1,
        },
      );

      if (product.current_quantity - 1 === 0) {
        addToast({
          type: 'warning',
          title: 'Atenção',
          description: 'Produto sem estoque',
        });
      }

      if (product.current_quantity - 1 === product.minimum_quantity) {
        addToast({
          type: 'warning',
          title: 'Atenção',
          description: 'Seu produto está com a quantidade mínima',
        });
      }

      if (product.current_quantity !== 0) {
        const findIndexProduct = products.findIndex(
          prod => prod.id === responseData.id,
        );
        if (findIndexProduct >= 0) {
          const newProducts = products.fill(
            responseData,
            findIndexProduct,
            findIndexProduct + 1,
          );
          setProducts([...newProducts]);
        }
      }

      refreshBalance();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro',
        description: error.response.data.error,
      });
    }
  };

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(product: IProduct): void {
    console.log('Produto', product);
    setEditingProduct(product);
    toggleEditModal();
  }

  return (
    <Container>
      <ModalEditProduct
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        handleUpdateProduct={handleUpdateProduct}
        editingProduct={editingProduct}
        deleteProduct={handleDeleteProduct}
      />

      <ModalAddProduct
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddProduct={handleAddProduct}
      />

      <Header>
        <LogoText>br.batel$</LogoText>
      </Header>
      <Content>
        <MainContent>
          <Section>
            <Separador>
              <H2>
                <FiChevronRight size={16} />
                Estoque
              </H2>

              <Button
                type="button"
                onClick={() => {
                  toggleModal();
                }}
              >
                <FiPlus />
                <p>Adicionar Produto</p>
              </Button>
            </Separador>

            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Quantidade atual</th>
                  <th>Quantidade mínima</th>
                  {/* <th>Custo</th> */}
                  <th>Preço de revenda</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map(product => (
                    <tr
                      key={product.id}
                      className={`${
                        Number(product.current_quantity) <=
                        Number(product.minimum_quantity)
                          ? 'animation'
                          : null
                      }`}
                    >
                      <td data-label="Nome">{product.name}</td>
                      <td
                        data-label="Quantidade atual"
                        className={`${
                          Number(product.current_quantity) <=
                          Number(product.minimum_quantity)
                            ? 'alert'
                            : null
                        }`}
                      >
                        {product.current_quantity}
                      </td>
                      <td data-label="Quantidade mínima">
                        {product.minimum_quantity}
                      </td>
                      {/* <td>{`R$ ${product.cost}`}</td> */}
                      <td className="money" data-label="Preço de revenda">
                        {formatsCurrencyValue(
                          product.resale_price,
                          'BRL',
                          'pt-BR',
                        )}
                      </td>
                      <td data-label="Ações" className="action-buttons">
                        <button
                          type="button"
                          onClick={() => {
                            handlePlusQuantity(product);
                          }}
                        >
                          <FiPlus />
                        </button>
                        <button
                          type="button"
                          disabled={product.current_quantity === 0}
                          onClick={() => {
                            handleReduceQuantity(product);
                          }}
                        >
                          <FiMinus />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            handleEditFood(product);
                            toggleEditModal();
                          }}
                        >
                          <FiEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Section>
        </MainContent>
        <ContainerCard>
          <Card>
            <h3>Total de Produtos:</h3>
            <p>{balance?.totalProducts}</p>
          </Card>
          <Card
            background={
              balance && balance.grossProfit < 0 ? '#ed254e' : '#007556'
            }
          >
            <h3>Lucro Bruto:</h3>
            <p>
              {balance &&
                formatsCurrencyValue(balance.grossProfit, 'BRL', 'pt-BR')}
            </p>
          </Card>
        </ContainerCard>
        <Footer>
          <p>br.batel$</p>
        </Footer>
      </Content>
    </Container>
  );
};

export default Dashboard;
