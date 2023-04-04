import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PinkButton from './PinkButton';
import { reset } from '../store/modules/mbti';

const SERVER = '3.34.177.57:3001';
const HTTPS = 'https://d2marv4bloqnfv.cloudfront.net';
const HTTP = 'http://mbti.tetz.org/';
// I DID IT!!

const Header = styled.p`
  font-size: 3em;
`;

const Explaination = styled.p`
  font-size: 1.5em;
  color: #777;
`;

const Result = styled.p`
  font-size: 3em;
  color: dodgerblue;
`;

const Additional = styled.p`
  font-size: 2em;
  color: orange;
`;

const AdditionalImg = styled.img`
  width: 500px;
  transform: translateX(-35px);
`;

export default function Show() {
  const result = useSelector((state) => state.mbti.mbtiResult);
  const explanation = useSelector((state) => state.mbti.explanation[result]);
  const dispatch = useDispatch();

  const incCount = async () => {
    const resInc = await fetch(`${HTTP}/data/inccount`, {
      method: 'POST',
    });
    if (resInc.status === 200) {
      console.log(await resInc.json());
    } else {
      throw new Error('통신 이상!!');
    }
  };

  const mongoIncCount = async () => {
    const resMongoInc = await fetch(`${HTTP}/mongo/inccount`, {
      method: 'POST',
    });
    if (resMongoInc.status === 200) {
      console.log(await resMongoInc.json());
    } else {
      throw new Error('통신 이상');
    }
  };

  return (
    <>
      <Header>당신의 개발자 MBTI 결과는?</Header>
      <Explaination>{explanation.text}</Explaination>
      <Result>{result}</Result>
      <Additional>이건 재미로 읽어 보세요!</Additional>
      <AdditionalImg src={explanation.img} alt="팩폭" />
      <PinkButton
        text="다시 검사하기"
        clickEvent={() => {
          //incCount();
          mongoIncCount();
          dispatch(reset());
        }}
      />
    </>
  );
}
