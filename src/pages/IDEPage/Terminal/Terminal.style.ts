import styled from 'styled-components';

export const TerminalWrapper = styled.div`
  display: flex;
  height: 350px;
  flex-direction: column;
  border-top: 1px solid black;
  background-color: #000;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

export const TerminalTop = styled.div`
  width: 100%;
  height: 52px;
  border-bottom: 1px solid black;
  background-color: #2f3336;
`;

export const TerminalContent = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
