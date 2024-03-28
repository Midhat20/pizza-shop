import { useMemo } from "react";

export const useStyles = () => {
  return useMemo(() => {
    return {
      container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      },
      wrapper: { display: "flex", justifyContent: "center" },
      orderCard: {
        border: "1px solid black",
        padding: "10px",
        margin: "12px",
        borderRadius: "10px",
        backgroundColor: "white",
        textAlign: "center",
      },
      alertBg: {
        backgroundColor: "red",
      },
      stageCard: {
        border: "1px solid black",
        minWidth: 220,
      },
    } as const;
  }, []);
};
