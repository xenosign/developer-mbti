// 선택지에 따른 성향 분석하기
// 해당 결과를 저장하고 마지막에 저장 된 결과를 출력해 주기

// 상태: MBTI 결과
// 액션: 선택에 따른 MBTI 결정하기

// 액션 타입(문자열)
const CHECK = 'mbti/CHECK';
const NEXT = 'mbti/NEXT';
const RESET = 'mbti/RESET';
const SHOW = 'mbti/SHOW';

// 액션 생성 함수
// payload -> 문항 index, 선택한 결과 값 choice
export function check({ index, choice }) {
  return {
    type: CHECK,
    payload: { index, choice },
  };
}

export function next() {
  return {
    type: NEXT,
  };
}

// 초기 상태 설정
const initState = {
  mbtiResult: '',
  page: 0, // 0: 인트로 페이지, 1 ~ n: 선택 페이지, n+1: 결과 페이지
  survey: [
    {
      question:
        '퇴근 직전에 동료로부터 개발자 모임에 초대를 받은 나! 퇴근 시간에 나는?',
      answer: [
        {
          text: '그런 모입을 왜 이제서야 알려 준거야! 당장 모임으로 출발한다',
          result: 'E',
        },
        {
          text: '1년 전에 알려줬어도 안갔을 건데 뭔... 더 빠르게 집으로 간다',
          result: 'I',
        },
      ],
    },
    {
      question:
        '새로운 서비스 개발 중에, 동료가 이런 서비스는 새로 나온 신기술이 더 편할거라고 추천을 해줄 때! 나는!?',
      answer: [
        {
          text: '뭔소리여, 그냥 하던 대로 개발하면 되는거지! 기존 생각대로 개발한다',
          result: 'S',
        },
        {
          text: '오호? 그런게 있어? 일단 구글을 찾아본다',
          result: 'N',
        },
      ],
    },
    {
      question:
        '서비스 출시 이틀 전 야근 시간, 갑자기 동료가 어!? 를 외쳤다! 나의 선택은?',
      answer: [
        {
          text: '무슨 버그가 발생한 거지? 아마 DB 관련 버그가 아닐까? 빠르게 동료의 자리로 달려간다',
          result: 'T',
        },
        {
          text: '아... 내일도 야근 각이구나 ㅠㅠ! 일단 동료의 자리로 가 본다',
          result: 'F',
        },
      ],
    },
    {
      question:
        '팀장님이 xx씨 그전에 말한 기능 내일 오후까지 완료 부탁해요라고 말했다! 나의 선택은?',
      answer: [
        {
          text: '일단 빠르게 개발 완료하고, 나머지 시간에 논다',
          result: 'J',
        },
        {
          text: '그거 내일 아침에 와서 개발해도 충분 하겠는데? 일단 논다',
          result: 'P',
        },
      ],
    },
  ],
};

// 리듀서
export default function mbti(state = initState, action) {
  switch (action.type) {
    case CHECK:
      return {
        ...state,
        mbtiResult:
          state.mbtiResult +
          state.survey[action.payload.index].answer[action.payload.choice]
            .result,
      };
    case NEXT:
      return {
        ...state,
        page: state.page + 1,
      };
    case RESET:
      return {
        ...state,
        page: 0,
        mbtiResult: '',
      };
    default:
      return state;
  }
}
