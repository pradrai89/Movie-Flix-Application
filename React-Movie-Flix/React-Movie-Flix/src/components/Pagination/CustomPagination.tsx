import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

interface CustomPaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  numOfPages?: number;
}

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const CustomPagination: React.FC<CustomPaginationProps> = ({
  setPage,
  numOfPages = 10,
}) => {
  // Scroll to top when page changes
  const handlePageChange = (page: string) => {
    setPage(parseInt(page));
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={(e) =>
            handlePageChange((e.target as HTMLElement).textContent || "")
          }
          count={numOfPages}
          color="primary"
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
