import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import OrangeButton from './OrangeButton';
import { next, init } from '../store/modules/mbti';
import { useEffect, useState } from 'react';

const SERVER = 'http://3.34.177.57:80';
const HTTPS = 'https://d2marv4bloqnfv.cloudfront.net';
const HTTP = 'http://mbti.tetz.org/';

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
  const [counts, setCounts] = useState(0);

  const dispatch = useDispatch();

  function makeData(survey, explanation) {
    const initData = { survey: [], explanation: {} };
    if (initData.survey.length === 0) {
      for (let i = 0; i < survey.length; i = i + 2) {
        initData.survey.push({
          question: survey[i].QUESTION_TEXT,
          answer: [
            {
              text: survey[i].ANSWER_TEXT,
              result: survey[i].RESULT,
            },
            {
              text: survey[i + 1].ANSWER_TEXT,
              result: survey[i + 1].RESULT,
            },
          ],
        });
      }

      for (let i = 0; i < explanation.length; i++) {
        initData.explanation[explanation[i].MBTI_TYPE] = {
          explanation: explanation[i].EXPLAINATION,
          img: explanation[i].IMG_SRC,
        };
      }
    }
    return initData;
  }

  async function sqlFetchData() {
    const resCount = await fetch(`${SERVER}/data/count`);
    if (resCount.status === 200) {
      const num = await resCount.json();
      if (num[0].counts !== 0) setCounts(num[0].counts);
    } else {
      throw new Error('통신 이상');
    }

    const resSurvey = await fetch(`${SERVER}/data/survey`);
    if (resSurvey.status === 200) {
      const surveyData = await resSurvey.json();
      console.log(surveyData);
      const resExplaination = await fetch(`${SERVER}/data/explaination`);
      if (resExplaination.status === 200) {
        const explainationData = await resExplaination.json();
        const data = makeData(surveyData, explainationData);
        dispatch(init(data));
      } else {
        throw new Error('통신 이상');
      }
    } else {
      throw new Error('통신 이상');
    }
  }

  async function mongoFetchData() {
    const resMongoCount = await fetch(`${SERVER}/mongo/count`);
    if (resMongoCount.status === 200) {
      const num = await resMongoCount.json();
      console.log(num);
      if (num[0].counts !== 0) setCounts((cur) => num[0].counts);
    } else {
      throw new Error('통신 이상');
    }
    const resMongoData = await fetch(`${SERVER}/mongo/getdata`);
    if (resMongoData.status === 200) {
      const data = await resMongoData.json();
      if (data[0].survey.length !== 0) {
        dispatch(init(data[0]));
      }
    } else {
      throw new Error('통신 이상');
    }
  }

  useEffect(() => {
    // sqlFetchData();
    mongoFetchData();
  }, []);

  return (
    <>
      <Header>개발자 MBTI 조사</Header>
      <MainImg src="/images/main.jpg" alt="메인 이미지" />
      <SubHeader>
        개발자가 흔히 접하는 상황에 따라서 MBTI 를 알아 봅시다! 지금까지{'\n\n'}
        {counts} 명이 참여해 주셨습니다!
      </SubHeader>

      <OrangeButton text="테스트 시작" clickEvent={() => dispatch(next())} />
    </>
  );
}
