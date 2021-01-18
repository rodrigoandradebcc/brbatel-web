import React, { useEffect, useState } from 'react';
import { FiPlus, FiMinus, FiChevronRight } from 'react-icons/fi';
import { isAfter, isBefore, isEqual } from 'date-fns';
import api from '../../services/api';
import ModalAddProduct from '../../components/ModalAddProduct';

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
} from './styles';

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
  id?: string;
  name: string;
  current_quantity: number;
  minimum_quantity: number;
  cost: number;
  resale_price: number;
  created_at: Date;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
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

      // console.log(productsOrderByDate);
    };
    loadData();
  }, []);

  async function handleAddProduct(product: IProduct): Promise<void> {
    try {
      const response = await api.post('/products', {
        ...product,
      });

      setProducts([...products, response.data]);
    } catch (error) {
      console.log(error);
    }
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleReduceQuantity = async (product: IProduct) => {
    const { data: responseData } = await api.patch<IProductResponse>(
      `products/${product.id}`,
      {
        new_quantity: product.current_quantity - 1,
      },
    );

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
  };

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  return (
    <Container>
      <Content>
        <ModalAddProduct
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddProduct={handleAddProduct}
        />
        <Header>
          <LogoText>br.batel$</LogoText>
        </Header>

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
                Adicionar Produto
              </Button>
            </Separador>

            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Quantidade atual</th>
                  <th>Quantidade mínima</th>
                  {/* <th>Custo</th> */}
                  <th>Preço de Venda</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map(product => (
                    <tr>
                      <td>{product.name}</td>
                      <td>{product.current_quantity}</td>
                      <td>{product.minimum_quantity}</td>
                      {/* <td>{`R$ ${product.cost}`}</td> */}
                      <td className="money">{`R$ ${product.resale_price}`}</td>
                      <td>
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
                          onClick={() => {
                            handleReduceQuantity(product);
                          }}
                        >
                          <FiMinus />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Section>
        </MainContent>

        <Footer>
          <p>br.batel$</p>
        </Footer>
      </Content>
    </Container>
  );
};

export default Dashboard;
