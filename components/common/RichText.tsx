// 데이터 문자열의 **강조** 구간을 #000 색상으로 렌더링한다
const RichText = ({ text }: { text: string }) => {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-[#000]">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
};

export default RichText;
