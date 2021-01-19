import styled from 'styled-components';

import { Form as Unform } from '@unform/web';

export const Label = styled.label`
  color: #04bf58;
  /* padding-left: 0.12rem; */
  /* font-family: Roboto; */

  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 5rem;
`;

export const Form = styled(Unform)`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  @media (max-width: 800px) {
    padding: 6px;
  }

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
    font-family: 'Poppins', sans-serif;
  }

  > div + div {
    padding-top: 1.25rem;
  }
`;

export const GroupButtons = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 48px;

  .trash {
    background: #ed254e;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button {
    /* margin-top: 48px; */
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #04bf58;
    color: #fff;
    display: flex;
    flex-direction: row;
    padding: 16px 24px;
  }
`;

export const TwoInputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  > div {
    width: 100%;
  }

  > div + div {
    margin-left: 20px;
  }

  @media (max-width: 800px) {
    flex-direction: column;

    > div + div {
      margin-left: 0;
      padding-top: 1.25rem;
    }
  }
`;
