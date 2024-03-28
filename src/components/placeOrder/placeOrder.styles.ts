import { useMemo } from "react";

export const useStyles = () => {
  return useMemo(() => {
    return {
      menuWrapper: { maxWidth: "400px", margin: "0 auto" },
      contentWrapper: { textAlign: "center", marginBottom: "20px" },
      formWrapper: {
        textAlign: "center",
        border: "1px solid black",
        padding: "20px",
        borderRadius: "10px",
      },
      placeBtn: { display: "block", margin: "0 auto" },
      errorWrapper: { color: "red", marginTop: "5px" },
      label: { display: "block", marginBottom: "15px" },
      select: { marginLeft: "10px" },
    } as const;
  }, []);
};
