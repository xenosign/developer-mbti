import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import OrangeButton from './OrangeButton';
import { next, init } from '../store/modules/mbti';
import { useEffect, useState } from 'react';

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

export default function Start() {
  const [initData, setInitData] = useState({
    survey: [],
    explaination: {},
  });

  const dispatch = useDispatch();

  const makeData = (survey, explaination) => {
    for (let i = 0; i < survey.length; i = i + 2) {
      initData.survey.push({
        question: survey[i].question_text,
        answer: [
          {
            text: survey[i].answer_text,
            result: survey[i].result,
          },
          {
            text: survey[i + 1].answer_text,
            result: survey[i + 1].result,
          },
        ],
      });
    }

    for (let i = 0; i < explaination.length; i++) {
      initData.explaination[explaination[i].mbti_type] = {
        explaination: explaination[i].explaination,
        img: explaination[i].img_src,
      };
    }
  };

  useEffect(() => {
    async function fetchData() {
      const resSurvey = await fetch('http://localhost:4000/data/survey');
      if (resSurvey.status === 200) {
        const surveyData = await resSurvey.json();

        const resExplaination = await fetch(
          'http://localhost:4000/data/explaination'
        );
        if (resExplaination.status === 200) {
          const explainationData = await resExplaination.json();
          console.log(explainationData);
          makeData(surveyData, explainationData);
          dispatch(init(initData));
        } else {
          throw new Error('통신 이상');
        }
      } else {
        throw new Error('통신 이상');
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header>개발자 MBTI 조사</Header>
      <MainImg src="/images/main.jpg" alt="메인 이미지" />
      <SubHeader>
        개발자가 흔히 접하는 상황에 따라서 MBTI 를 알아 봅시다!
      </SubHeader>
      <OrangeButton text="테스트 시작" clickEvent={() => dispatch(next())} />
    </>
  );
}
