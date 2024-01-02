import React from "react";

export const Welcome = () => {
  return (
    <div
      className="text-3xl mt-16  h-[calc(100%-64px)] flex m-auto"
      style={{
        backgroundColor: "#E4DCCF",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        fontWeight:'bold'
      }}
    >
      No Chat's Opened Yet!
    </div>
  );
};
