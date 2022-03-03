import click from 'components/parts/image/click.png';

function Button() {
  return (
    <img
      src={click}
      alt="클릭버튼"
      className="w-14 h-14 cursor-pointer mr-20 fixed top-3/4
      transition duration-500 ease-in-out hover:-translate-y-2 hover:scale-110"
    />
  );
}

export default Button;
