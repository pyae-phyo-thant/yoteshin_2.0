import spinner from "../images/spiner.gif";
const Loading = ({ width }) => {
  return (
    <div className={`flex justify-center ${width}`}>
      <img src={spinner} alt="Loading" />
    </div>
  );
};

export default Loading;
