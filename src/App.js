import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import GlobalStyle from './components/GlobalStyle';
import OrangeButton from './components/OrangeButton';
import { next } from './store/modules/mbti';

const Main = styled.main`
  width: 100%;
  max-width: 360px;
  margin: auto;
  text-align: center;
`;

const MainImg = styled.img`
  width: inherit;
`;

const Header = styled.p`
  font-size: 3em;
`;

const SubHeader = styled.p`
  font-size: 1.5em;
  color: #777;
`;

function App() {
  const page = useSelector((state) => state.mbti.page);
  const dispatch = useDispatch();

  return (
    <>
      <GlobalStyle />
      {page === 0 && (
        <Main>
          <Header>개발자 MBTI 조사</Header>
          <MainImg src="/images/main.jpg" alt="메인 이미지" />
          <SubHeader>
            개발자가 흔히 접하는 상황에 따라서 MBTI 를 알아 봅시다!
          </SubHeader>
          <OrangeButton
            text="테스트 시작"
            clickEvent={() => dispatch(next())}
          />
        </Main>
      )}
      <div></div>
    </>
  );
}

export default App;
