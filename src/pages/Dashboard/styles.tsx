import styled from 'styled-components';

const vermelho = 'e84118';

export const Container = styled.div`
  width: 100%;
  margin: auto;
`;

export const Content = styled.div`
  /* width: min(90vw, 800px);
  margin: auto; */
`;

export const Header = styled.header`
  background: #007556;
  padding: 2rem 0 3rem;
  text-align: center;
`;

export const LogoText = styled.h1`
  color: #fff;
  font-weight: 100;
`;

export const H2 = styled.h2`
  /* margin-top: 3.2rem; */
  color: #363f5f;

  font-weight: normal;

  svg {
    margin-bottom: 1px;
  }
`;

export const Button = styled.button`
  width: 12.68rem;
  height: 3rem;

  /* margin-top: 5rem; */
  border-radius: 7px;
  background: #007556;
  color: #fff;
  border: 0;
`;

export const Separador = styled.div`
  /* background: red; */
  display: flex;
  width: 100%;
  flex-direction: flex-end;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 0.4rem;
  margin-top: 3.2rem;

  ${Button} {
    /* margin-top: 3.2rem; */
  }
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 4rem 0 2rem;
  color: #363f5f;

  opacity: 0.6;
`;

export const MainContent = styled.main`
  /* width: min(90vw, 800px); */
  width: 100%;

  display: flex;
  margin: auto;
`;

export const Section = styled.section`
  /* background: white; */
  border-radius: 0.25rem;

  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
`;

export const Table = styled.table`
  width: 100%;

  border-spacing: 0 0.5rem;
  color: #969cb3;

  thead tr:first-child,
  tbody td:first-child {
    border-radius: 0.25rem 0 0 0.25rem;
  }

  thead th {
    background: white;

    padding: 0.5rem 1rem;
    font-weight: normal;

    text-align: center;
  }

  tbody tr {
    opacity: 0.7;
  }

  tbody tr:hover {
    opacity: 1;
  }

  tbody td {
    background: white;

    padding: 1rem 2rem;
    text-align: center;

    > button {
      decoration: none;
      background: transparent;

      margin-left: 4px;
    }
  }
  .money {
    color: #007556;
    font-weight: bold;
  }
`;

export const THead = styled.thead``;
