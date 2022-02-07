function TopNav({
  is_staff = false,
  is_main = true,
  openNavigator,
  is_logged_in = true,
}) {
  const handleGotoMainPage = () => {
    if (!is_staff) {
      console.log('I am Not Staff!');
    }
  };

  const handleOpenNavigator = () => {
    console.log('This is mainPage');
  };

  const handleOpenDropbox = () => {
    !is_logged_in
      ? console.log('Not Logged-In')
      : console.log('This is Logged-In');
  };

  return (
    <>
      <div className="bg-gray-200 py-2 px-10">
        <ul className="flex justify-between">
          {is_main ? (
            <li className="mr-3">
              <svg
                className="w-10 h-10 py-2 cursor-pointer"
                onClick={handleOpenNavigator}
              >
                <path
                  fill="currentColor"
                  d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
                />
              </svg>
            </li>
          ) : (
            <div className="w-10 h-10 py-2" />
          )}
          <li className="mr-3">
            <div
              className="inline-block text-blue-500 text-bold py-2 cursor-pointer"
              onClick={handleGotoMainPage}
            >
              EUCLID SOFT
            </div>
          </li>
          <li className="mr-3">
            <svg
              className="w-10 h-10 py-2 cursor-pointer"
              onClick={handleOpenDropbox}
            >
              <path
                fill="currentColor"
                d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
              />
            </svg>
          </li>
        </ul>
      </div>
    </>
  );
}

export default TopNav;
