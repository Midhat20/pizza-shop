import { useMemo } from "react";

export const useStyles = () => {
  return useMemo(() => {
    return {
      tableContainer: {
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "20px",
      },
      table: {
        border: "1px solid black",
        padding: "8px",
        textAlign: "center",
      },
      totalDeliveredOrder: {
        marginTop: "10px",
        width: "100%",
        border: "1px solid red",
      },
      contentWrapper: {
        display: "flex",
        justifyContent: "center",
      },
    } as const;
  }, []);
};
