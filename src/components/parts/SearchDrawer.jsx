import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import search from 'components/parts/image/search.png';

function SearchDrawer() {
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // const list = (anchor) => (
  //   <Box
  //     sx={{ width: 'auto' }}
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //     <List>
  //       <ListItem>
  //         <ListItemIcon className="h-[80px]">
  //           <input
  //             className="w-[1500px] inline-block border-b-2 border-gray-300 bg-white px-5
  //         pr-8 text-sm focus:outline-none"
  //             type="search"
  //             name="search"
  //             placeholder="검색어 입력"
  //             autoComplete="off"
  //           />
  //         </ListItemIcon>
  //         <ListItemText />
  //       </ListItem>
  //     </List>
  //     <Divider />
  //   </Box>
  // );

  return (
    <div>
      {['top'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)} className="cursor-pointer">
            <img
              src={search}
              alt="검색"
              className="h-9 w-9 transition duration-500 ease-in-out hover:scale-125"
            />
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="h-[130px]">
              <input
                className="w-[1480px] h-[40px] inline-block border-b-2 border-gray-300 bg-white 
                relative left-6 top-14 focus:outline-none text-lg"
                type="search"
                name="search"
                placeholder="검색어를 입력해주세요 ex) 도서명/저자명/게임명"
                autoComplete="off"
              />
              <button
                type="submit"
                className="relative right-10 top-[65px]  hover:text-blue-500
                transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-90"
              >
                <svg
                  style={{ width: 35 + 'px', height: 35 + 'px' }}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                  />
                </svg>
              </button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default SearchDrawer;
