import styled from 'styled-components';

const MyButton = styled.a`
  position: relative;
  display: inline-block;
  margin-top: 1em;
  cursor: pointer;
  vertical-align: middle;
  text-decoration: none;
  line-height: 1.6em;
  font-size: 1.2em;
  color: #382b22;
  padding: 1.25em 2em;
  background-color: #fae243;
  border: 2px solid #f09a00;
  border-radius: 0.75em;
  user-select: none;
  transition: transform 0.15s ease-out;
  transform-style: preserve-3d;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    right: 0;
    background: #f09a00;
    border-radius: inherit;
    box-shadow: 0 0 0 2px #fa9f1a;
    transform: translate3d(0, 0.75em, -1em);
    transition: transform 0.15s ease-out;
  }
  &:hover {
    background: #faf000;
    transform: translateY(0.25em);
  }
`;

export default function OrangeButton({ text, clickEvent }) {
  return <MyButton onClick={clickEvent}>{text}</MyButton>;
}
