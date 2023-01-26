import { useState } from "react";
import { onTrackerAtom, onDiaryAtom } from "../atom";
import { DateBox, SectionSide, SideBox } from "../screens/Line";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

export const MainBox = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  outline: none;
  padding: 0 10px;
  color: ${(props) => props.theme.secondColor};
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const Option = styled.option`
  border: none;
  outline: none;
  font-size: 20px;
`;

interface SectionLineProps {
  tracker: boolean;
}

const SectionLine = styled.div<SectionLineProps>`
  width: 100%;
  grid-gap: 2px;
  display: grid;
  grid-template-columns: ${(props) =>
    props.tracker ? `40px 1fr 120px` : `40px 1fr 40px`};
  margin-bottom: 5px;
  height: 40px;
  :last-child {
    margin: 0px;
  }
`;

function DateLine(date: number) {
  const onDiary = useRecoilValue(onDiaryAtom);

  const onTracker = useRecoilValue(onTrackerAtom);
  const [done, setDone] = useState("");
  const doneToggle = () => {
    done == "🖤" ? setDone("·") : setDone("🖤");
  };
  const [onLock, setLock] = useState(false);
  const onClick = () => {
    setLock((cur) => !cur);
  };

  const [mainContent, mainChange] = useState("");
  const setMain = (e: React.FormEvent<HTMLInputElement>) => {
    mainChange(e.currentTarget.value);
  };

  return (
    <SectionLine key={date} tracker={onTracker ? true : false}>
      <DateBox>{date}</DateBox>

      {onDiary ? (
        <MainBox
          type="text"
          onChange={setMain}
          placeholder="오늘의 한 줄 일기를 써보세요. (최대 56자)"
          value={mainContent ? mainContent : ""}
          disabled={onLock}
          maxLength={56}
        />
      ) : (
        <MainBox as="div">{mainContent}</MainBox>
      )}

      <SectionSide tracker={onTracker ? true : false}>
        {onTracker ? (
          <SideBox as="select">
            <Option value="none"></Option>
            <Option value="happy">🥰</Option>
            <Option value="good">🙂</Option>
            <Option value="not bad">😐</Option>
            <Option value="sad">☹️</Option>
            <Option value="very sad">😭</Option>
            <Option value="upset">🤯</Option>
            <Option value="angry">🤬</Option>
            <Option value="embarrassed">😰</Option>
            <Option value="sick">🤒</Option>
          </SideBox>
        ) : null}
        {onTracker ? (
          <SideBox
            as="input"
            disabled={onLock}
            type="button"
            onClick={doneToggle}
            value={done}
          />
        ) : null}

        <SideBox as="button" onClick={onClick}>
          {onLock ? (
            <i className="fas fa-lock"></i>
          ) : (
            <i className="fas fa-lock-open"></i>
          )}
        </SideBox>
      </SectionSide>
    </SectionLine>
  );
}
export default DateLine;
