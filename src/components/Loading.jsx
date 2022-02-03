import spinner from "../images/spiner.gif";
const Loading = () => {
  return (
    <div className="flex justify-center mt-[70px]">
      <img className="w-[8%]" src={spinner} alt="Loading" />
    </div>
  );
};

export default Loading;
