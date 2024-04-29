import {ImageResponse} from "next/og";

export const size = {
    width:64,
    height: 64,
};

export const contentType = "image/png";

export default function icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 60,
                    background: "black",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    borderRadius: "5px",
                    fontWeight:"bolder",
                    padding:"1px"
                }}
            >
                W
            </div>
        ),size
    );
};