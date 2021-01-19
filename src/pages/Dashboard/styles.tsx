import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: auto;
`;

export const Content = styled.div`
  max-width: 1600px;
  margin: 0 auto;
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

  svg {
    display: none;
  }
`;

export const Separador = styled.div`
  /* background: red; */
  display: flex;
  width: 100%;
  flex-direction: flex-end;

  justify-content: space-between;
  /* align-items: center; */

  margin-bottom: 0.4rem;
  margin-top: 3.2rem;

  @media (max-width: 685px) {
    margin-top: 2rem;
    margin-bottom: 1rem;
    ${Button} {
      /* margin-top: 3.2rem; */
      width: 2.25rem;
      height: 2.25rem;
      svg {
        display: flex;
        margin: auto;
      }
      p {
        display: none;
      }
    }
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
  width: 90%;

  display: flex;
  margin: auto;

  @media (max-width: 685px) {
    width: 95%;
  }
`;

export const Section = styled.section`
  /* background: white; */
  border-radius: 0.25rem;

  display: flex;
  flex-direction: column;
  /* width: 80%; */
  width: 100%;
  margin: auto;

  /* @media (max-width: 640px) {
    display: ;
  } */
`;

export const Table = styled.table`
  width: 100%;

  border-spacing: 0 0.5rem;
  color: #969cb3;

  thead tr:first-child,
  tbody td:first-child {
    border-radius: 0.25rem 0 0 0.25rem;
  }
  .action-buttons {
    width: 8rem;
    padding: 0;
  }

  thead th {
    background: white;

    /* background: #007556; */

    padding: 0.2rem 0.2rem;
    font-weight: normal;

    text-align: center;
  }

  tbody tr {
    opacity: 0.6;
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

    ::before {
      color: #969cb3;
    }
  }

  .alert {
    color: #cc3333;
    font-weight: bold;

    ::before {
      color: #969cb3;
    }
  }

  .animation {
    animation: nono 200ms linear, fade paused;
    animation-iteration-count: 2;

    @keyframes nono {
      0%,
      100% {
        transform: translateX(0);
      }
      35% {
        transform: translateX(-5%);
      }
      70% {
        transform: translateX(5%);
      }
    }
  }

  @media (max-width: 685px) {
    thead {
      display: none;
    }

    .action-buttons {
      width: 100%;
      padding: 1rem 2rem;
    }

    &,
    tbody,
    tr,
    td {
      display: block;
      width: 100%;
    }

    tbody tr {
      margin-bottom: 15px;
    }

    tbody td {
      padding-left: 50%;
      text-align: right;
      position: relative;
    }

    & td::before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      width: 50%;
      padding-left: 15px;
      font-size: 15px;
      font-weight: bold;
      text-align: left;
    }
  }
`;

interface ICardProps {
  background?: string;
}

export const Card = styled.div<ICardProps>`
  background: ${props => (props.background ? props.background : 'white')};
  color: ${props => (props.background ? 'white' : '#444')};

  padding: 1.5rem 2rem;
  border-radius: 0.25rem;
  margin-bottom: 2rem;

  & + & {
    margin-left: 1rem;
  }

  h3 {
    font-weight: normal;
    font-size: 1rem;
  }

  p {
    font-size: 2rem;
    line-height: 3rem;

    margin-top: 1rem;
  }

  @media (max-width: 685px) {
    flex: 1;
  }
`;

export const ContainerCard = styled.div`
  width: 90%;

  display: flex;
  margin: 0 auto;
  justify-content: flex-start;
  margin-top: 1rem;

  @media (max-width: 685px) {
    width: 95%;
  }

  @media (max-width: 400px) {
    flex-direction: column;

    ${Card} {
      margin-left: 0;
    }
  }
`;
